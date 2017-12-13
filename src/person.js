import Constants, { ticksPerYear } from './constants.js';
let {realSecondsPerSimulatedHour, restDepletionPerHour, funDepletionPerHour, restThresholdToSleepOnStreet, restThresholdToSleepAtHome, maxHousingCostAsFractionOfIncome, maxSleepTime, wakeupHour, hoursPerDay, walkingSpeedUnitsPerHour, sleepMaxDuration, workDuration} = Constants;
import { tweet } from './twitter.js';
import { pick1 } from './utils.js';
import { timeFromTick } from './time.js';

export default class Person { // person objects should modify their internal json
  constructor(id, city) {
		this.id = id;
    this.json = city.agents.people[id];
    this.city = city;
  }
  tick(time) {
		// time is measured in seconds (scaled by simulation time)
		this.tickLifeChoices();
		this.decaySatisfaction(time);
		
    let budget = time;
    let tries = 0;
    while (budget > 0 && tries < 10) {
      tries++;
      let action = this.getNextAction();
			if (!action) break;
      let {remainingBudget, isFinished} = this.doAction(action, budget);
      budget = remainingBudget;
      if (isFinished) {
        this.json.actions = this.json.actions.slice(1);
				this.tweet("Completed action: " + action.actionId);
      }
    }
  }
	// ACTIONS
	getNextAction() {
		if (this.json.actions.length === 0) {
			this.json.actions = this.decideNextActions();
		}
		if (this.json.actions) {
			return this.json.actions[0];
		}
		return null;
	}
	decideNextActions() {
		// it's the big deal!
		let job = this.getJob();
		if (this.city.isMorning() && job) {
			// go to work:
			return [{actionId: 'travel', buildingId: this.json.workplaceId}, {actionId: 'work', hoursRemaining: workDuration, job: job}];
		} else if (this.json.satisfaction.rest < restThresholdToSleepAtHome && this.json.homeId) {
			// go home and sleep
			if (this.json.currentBuildingId === this.json.homeId) {
				return [{actionId: 'sleep', atHome: true, hoursRemaining: sleepMaxDuration, wakeupHour}];
			} else {
				return [{actionId: 'travel', buildingId: this.json.homeId}];
			}
			return [{actionId}]
		} else if (this.json.satisfaction.rest < restThresholdToSleepOnStreet) {
			// sleep right here
			return [{actionId: 'sleep', atHome: false, hoursRemaining: sleepMaxDuration, wakeupHour}];
		} else if (this.json.homeId && this.json.currentBuildingId !== this.json.homeId) {
			// go home
			return [{actionId: 'travel', buildingId: this.json.homeId}];
		} else {
			// do nothing:
			return [];
		}
	}
  doAction(action, budget, personJson) {
    // returns {remainingBudget, isFinished}
    if (action.actionId === 'travel') {
			this.json.currentBuildingId = null;
      // moveToward(startEdgeId, startCoord, destEdgeId, destCoord, budget)
			let kTimeToDistance = walkingSpeedUnitsPerHour / realSecondsPerSimulatedHour;
			let walkingBudget = budget * kTimeToDistance;
      let dest = this.city.map.buildings[action.buildingId];
      let fromCoord = this.city.network.coord(this.json.position.edgeId, this.json.position.distance);
      let {newPosition, remainingBudget, atDestination} = this.city.network.moveToward(this.json.position.edgeId, fromCoord, dest.edgeId, dest.coordinate, walkingBudget);
			remainingBudget /= kTimeToDistance;
      this.json.position = newPosition;
			if (atDestination) {
				this.json.currentBuildingId = action.buildingId;
			}
      return {remainingBudget, isFinished: atDestination};
    } else if (action.actionId === 'work') {
			let timeRemaining = action.hoursRemaining * realSecondsPerSimulatedHour;
			let workTime = Math.min(budget, timeRemaining);
			let workForHours = workTime / realSecondsPerSimulatedHour;
			action.hoursRemaining -= workForHours;
			this.json.wealth += workForHours * action.job.salary / workDuration;
			return {remainingBudget: budget - workTime, isFinished: action.hoursRemaining <= 0};
    } else {
			throw `Unknown action type: ${action.actionId}`;
    }
  }
	// STATS
	decaySatisfaction(time) {
		let sat = this.json.satisfaction;
		let hours = time / realSecondsPerSimulatedHour;
		sat.rest = Math.max(0, sat.rest - hours * restDepletionPerHour);
		sat.fun = Math.max(0, sat.fun - hours * funDepletionPerHour);
	}
	// LIFE CHOICES
	tickLifeChoices() {
		let prevAgeYears = Math.floor((this.city.simulation.prevTick - this.json.birthTick) / ticksPerYear)
		let newAgeYears = Math.floor((this.city.simulation.tick - this.json.birthTick) / ticksPerYear);
		if (newAgeYears > prevAgeYears && newAgeYears % 5 === 0) {
			this.findJob();
			this.findHome();
		}
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
				// join new job:
				job.personId = this.id;
				this.json.workplaceId = workplaceId;
				this.json.jobId = jobId;
			}
		} else {
			this.tweet("I could not find a job!");
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
		let affordableHomes = allHomes.filter(({home}) => (home.rent <= income * maxHousingCostAsFractionOfIncome));
		
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
	// FEEDBACK
	tweet(text) {
		tweet(this.id, this.city.simulation.tick, text);
	}
	// SANTA'S LITTLE HELPER FUNCTIONS 🎅
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
		let job = this.getJob();
		return job ? job.salary : 0;
	}
	getJob() {
		return this.json.jobId ? this.city.map.buildings[this.json.workplaceId].jobs[this.json.jobId] : null;
	}
}
