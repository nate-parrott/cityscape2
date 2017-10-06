
// COMMON DATA TYPES:
function EdgePosition(edgeId, distance) {
  // distance: 0..1 -- how far along the edge we are (0 means we're at one end, 1 means we're at the other)
  return {edgeId, distance};
}

let route = function(map, fromEdgePosition, toEdgePosition) {
  // let's do some hecking A*
}

let tick = function(city) {
  let { map, agents, simulation } = city;
  return {
    map: map,
    agents: agents,
    simulation: {
      tick: simulation.tick + 1
    }
  };
}

module.exports = tick;
