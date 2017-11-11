import Network from './network.js';

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
  tick() {
    // each tick gives a time budget of 1 unit
    this.tickAgents();
    this.simulation.tick++;
    return this.json;
  }
  tickAgents() {
    // tick people:
    for (let id of Object.keys(this.agents.people)) {
      (new Person(this.agents.people[id], this)).tick();
    }
  }
}

class Person { // person objects should modify their internal json
  constructor(json, city) {
    this.json = json;
    this.city = city;
  }
  tick() {
    let budget = 1;
    let tries = 0;
    while (budget > 0 && this.json.actions.length > 0 && tries < 10) {
      tries++;
      let action = this.json.actions[0];
      let {remainingBudget, isFinished} = this.doAction(action, budget);
      budget = remainingBudget;
      if (isFinished) {
        console.log("Completed action: ", action);
        this.json.actions = this.json.actions.slice(1);
      }
    }
  }
  doAction(action, budget, personJson) {
    // returns {remainingBudget, isFinished}
    if (action.actionId === 'travel') {
      let dest = this.city.map.buildings[action.buildingId];
      let {newPosition, remainingBudget, atDestination} = this.city.network.moveToward(this.json.position, dest, budget);
      this.json.position = newPosition;
      return {remainingBudget, isFinished: atDestination};
    } else {
      console.warn('Unknown action type: ' + action.actionId);
      return {remainingBudget: budget, finished: false};
    }
  }
}

export let tick = function(city) {
  return new City(city).tick();
}

