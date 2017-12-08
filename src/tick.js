import Network from './network.js';
import { tweet } from './twitter.js';
import Constants from './constants.js';

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
  }
  tick(time) {
		time *= Constants.simSpeedup;
    this.tickAgents(time);
    this.simulation.tick += time;
    return this.json;
  }
  tickAgents(time) {
    // tick people:
    for (let id of Object.keys(this.agents.people)) {
      (new Person(id, this)).tick(time);
    }
  }
}

class Person { // person objects should modify their internal json
  constructor(id, city) {
		this.id = id;
    this.json = city.agents.people[id];
    this.city = city;
  }
  tick(time) {
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
}

export let tick = function(city, time) {
  return new City(city).tick(time);
}
