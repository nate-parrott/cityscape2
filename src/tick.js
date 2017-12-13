import Network from './network.js';
import { tweet } from './twitter.js';
import Constants, { ticksPerYear } from './constants.js';
let {realSecondsPerSimulatedHour, restDepletionPerHour, funDepletionPerHour, morningHours } = Constants;
import { pick1 } from './utils.js';
import Person from './person.js';
import { tickToTime } from './time.js';

// COMMON DATA TYPES:
function EdgePosition(edgeId, distance) {
  // distance: 0..1 -- how far along the edge we are (0 means we're at one end, 1 means we're at the other)
  return {edgeId, distance};
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
	// HELPERS:
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
	isMorning() {
		let {hour} = tickToTime(this.simulation.tick);
		return hour >= morningHours[0] && hour < morningHours[1];
	}
}

export let tick = function(city, time) {
  return new City(city).tick(time);
}
