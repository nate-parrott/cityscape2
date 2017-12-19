import { tick } from '../simulation/tick.js';
import Network from '../simulation/network';
import { testNetwork, simpleNetwork, littleLoopNetwork } from './testNetwork';
import { defaultCity } from './city.js';

export function testRouting() {
  // test routing:
  let startCoord = {x: 31, y: 2};
  let startEdge = 'e0';
  let endCoord = {x: 442, y: 485};
  let endEdge = 'e3';
  let n = new Network(testNetwork);
  console.log(n.calcRoute(startCoord, startEdge, endCoord, endEdge));
}

export function testMotion() {
  let n = new Network(littleLoopNetwork);
  let pos = {edgeId: 'e0', distance: 0.5};
  let dest = {edgeId: 'e0', coordinate: {x: 1, y: 0}};
  for (let tick=0; tick < 10; tick++) {
    let {newPosition, remainingBudget, atDestination} = n.moveToward(pos, dest, 1);
    pos = newPosition;
    console.log(pos);
    if (atDestination) console.log('At destination!');
  }
}

export function testTicking() {
  let c = defaultCity;
  while (c.simulation.tick < 10) {
    console.log("TICK: ", c.simulation.tick);
    c = tick(c);
    console.log(c);
    console.log("Person: ", c.agents.people.p000);
  }
}

// let city = JSON.parse(fs.readFileSync('city2.json'));
// console.log(tick(city))
