import Network from './network.js';
import { tweet } from './twitter.js';
import Constants, { ticksPerYear } from './constants.js';
import { pick1 } from './utils.js';

// COMMON DATA TYPES:
function EdgePosition(edgeId, distance) {
  // distance: 0..1 -- how far along the edge we are (0 means we're at one end, 1 means we're at the other)
  return {edgeId, distance};
}

let route = function(map, fromEdgePosition, toEdgePosition) {
  // let's do some hecking A*
}

let deepcopy = (json) => {
  // TODO: get a more efficient implementation of this
  return JSON.parse(JSON.stringify(json));
}

class City { // cities should be used for ONE tick only, and then discarded
  constructor(json) {
    json = deepcopy(json);
    this.json = json;
    this.map = json.map;
    this.agents = json.agents;
    this.simulation = json.simulation;
    this.network = new Network(this.map.network);
		this.jobs = {};
  }
  tick(time) {
		time *= Constants.simSpeedup;
    this.tickAgents(time);
		this.simulation.prevTick = this.simulation.tick;
    this.simulation.tick += time;
    return this.json;
  }
  tickAgents(time) {
    // tick people:
    for (let id of Object.keys(this.agents.people)) {
      (new Person(id, this)).tick(time);
    }
  }
	iterateBuildingsWithType(typeId, callback) {
		for (let id of Object.keys(this.map.buildings)) {
			let building = this.map.buildings[id];
			if (building.typeId === typeId) {
				callback(id, building);
			}
		}
	}
	iterateJobs(callback) {
		this.iterateBuildingsWithType('work', (workplaceId, workplace) => {
			for (let jobId of Object.keys(workplace.jobs)) {
				let job = workplace.jobs[jobId];
				callback(workplaceId, workplace, jobId, job);
			}
		});
	}
	iterateHomes(callback) {
		this.iterateBuildingsWithType('home', callback);
	}
}

class Person { // person objects should modify their internal json
  constructor(id, city) {
		this.id = id;
    this.json = city.agents.people[id];
    this.city = city;
  }
  tick(time) {
		this.tickLifeChoices();
    let budget = time;
    let tries = 0;
    while (budget > 0 && this.json.actions.length > 0 && tries < 10) {
      tries++;
      let action = this.json.actions[0];
      let {remainingBudget, isFinished} = this.doAction(action, budget);
      budget = remainingBudget;
      if (isFinished) {
        this.json.actions = this.json.actions.slice(1);
				this.tweet("Completed action: " + action.actionId);
      }
    }
  }
	tickLifeChoices() {
		let prevAgeYears = Math.floor((this.city.simulation.prevTick - this.json.birthTick) / ticksPerYear)
		let newAgeYears = Math.floor((this.city.simulation.tick - this.json.birthTick) / ticksPerYear);
		if (newAgeYears > prevAgeYears && newAgeYears % 5 === 0) {
			this.findJob();
			this.findHome();
		}
	}
  doAction(action, budget, personJson) {
    // returns {remainingBudget, isFinished}
    if (action.actionId === 'travel') {
      // moveToward(startEdgeId, startCoord, destEdgeId, destCoord, budget)
      let dest = this.city.map.buildings[action.buildingId];
      let fromCoord = this.city.network.coord(this.json.position.edgeId, this.json.position.distance);
      let {newPosition, remainingBudget, atDestination} = this.city.network.moveToward(this.json.position.edgeId, fromCoord, dest.edgeId, dest.coordinate, budget);
      this.json.position = newPosition;
      return {remainingBudget, isFinished: atDestination};
    } else {
      console.warn('Unknown action type: ' + action.actionId);
      return {remainingBudget: budget, finished: false};
    }
  }
	tweet(text) {
		tweet(this.id, this.city.simulation.tick, text);
	}
	findJob() {
		this.tweet("Looking for a new job...");
		let qualifiedJobs = [];
		this.city.iterateJobs((workplaceId, workplace, jobId, job) => {
			if ((job.personId === null || job.personId === this.id) && this.qualifiedForJob(job)) {
				qualifiedJobs.push({workplaceId, workplace, jobId, job});
			}
		});
		qualifiedJobs.sort((a, b) => a.salary - b.salary);
		if (qualifiedJobs.length > 0) {
			let {workplaceId, workplace, jobId, job} = qualifiedJobs[qualifiedJobs.length - 1];
			if (job.personId === this.id) {
				this.tweet("Nvm, I'm remaining at my current job!");
			} else {
				this.tweet("Excited to say I've found a job as a " + job.title + " at " + workplace.name);
				// leave old job:
				if (this.json.workplaceId && this.json.jobId) {
					let oldWorkplace = this.city.map.buildings[this.json.workplaceId];
					let oldJob = oldWorkplace.jobs[this.json.jobId];
					this.tweet("Sad to be leaving " + oldWorkplace.name + "! great working with yall.");
					oldJob.personId = null;
				}
				this.json.workplaceId = workplaceId;
				this.json.jobId = jobId;
			}
		} else {
			this.tweet("I could not find a job!");
		}
	}
	qualifiedForJob(job) {
		let mySkills = this.json.skills;
		for (let skill of Object.keys(job.skills)) {
			if (mySkills[skill] < job.skills[skill]) {
				return false;
			}
		}
		return true;
	}
	income() {
		if (this.json.jobId) {
			return this.city.map.buildings[this.json.workplaceId].jobs[this.json.jobId].salary;
		} else {
			return 0;
		}
	}
 	findHome() {
		// leave the current home:
		if (this.json.homeId) {
			let occupantsList = this.city.map.buildings[this.json.homeId].occupants;
			occupantsList.splice(occupantsList.indexOf(this.id), 1);
			this.json.homeId = null;
		}
		
		this.tweet("Time to find a home!");
		let allHomes = [];
		this.city.iterateHomes((homeId, home) => {
			if (home.occupants.length < home.occupancy) {
				allHomes.push({homeId, home});
			}
		});
		allHomes.sort((a, b) => a.rent - b.rent);
		let income = this.income();
		let affordableHomes = allHomes.filter(({home}) => (home.rent <= income * 0.5));
		
		let newHome = null;
		if (affordableHomes.length) {
			newHome = pick1(affordableHomes);
		} else if (allHomes.length) {
			this.tweet("Can't find a home I can afford! Not sure how I'm gonna pay rent...");
			newHome = allHomes[0];
		}
		if (newHome) {
			let {home, homeId} = newHome;
			home.occupants.push(this.id);
			this.json.homeId = homeId;
			this.tweet("Excited to be moving to " + home.name + "! but how am i supposed to pack my whole life into a box!!?!?");
			if (Math.random() < 0.5) this.tweet("i hate moving :(");
		} else {
			this.tweet("Couldn't find a home... ugh...");
		}
	}
}

export let tick = function(city, time) {
  return new City(city).tick(time);
}
