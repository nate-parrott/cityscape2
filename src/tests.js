let tick = require('./tick');
import Network from './network';
import { testNetwork } from './testNetwork';

export function testRouting() {
  // test routing:
  let startCoord = {x: 31, y: 2};
  let startEdge = 'e0';
  let endCoord = {x: 442, y: 485};
  let endEdge = 'e3';
  let n = new Network(testNetwork);
  console.log(n.calcRoute(startCoord, startEdge, endCoord, endEdge));
}

// let city = JSON.parse(fs.readFileSync('city2.json'));
// console.log(tick(city))
