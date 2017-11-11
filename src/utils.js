
function PriorityQueue() {
  this.q = [];
  this._reSort = () => {
    this.q.sort((a, b) => a.cost - b.cost);
  }
  this.add = (value, cost) => {
    // TODO: actually make this efficient
    if (this.q.length > 1000) {
      console.error("queue too large");
      quit();
    }
    this.q.push({value, cost});
    this._reSort();
  }
  this.pop = () => {
    if (this.q.length > 0) {
      let val = this.q[0].value;
      this.q.splice(0, 1);
      return val;
    } else {
      return null;
    }
  }
  this.isEmpty = () => this.q.length === 0;
}

/*
startPositions:
  (takes multiple b/c when we're in the middle of an edge, we can start at either end of the edge)
  [ { nodeId: <node id>,  cost: 0}, ... ]
completionCostFunc:
  a function that takes a node id, and, if it's a valid node, returns the final associated cost
  (nodeId) -> double | null
heuristicFunc:
  takes node id, returns validity
  (nodeId) -> double
edgeFunc:
  takes a node id, returns all edges
  (nodeId) -> [ {edgeId: <edge id>, nodeId: <node id>, edgeCost: double}, ... ]

returns: {nodeIds, edgeIds, cost}
*/
// let astar = function(startPositions, completionCostFunc, heuristicFunc, edgeFunc) {
//   let q = new PriorityQueue(); // values: {nodeIds, cost, edgeIds}
//   let seenNodeIds = {};
//   for (let {nodeId, edgeId, cost} of startPositions) {
//     seenNodeIds[nodeId] = 1;
//     q.add({ nodeIds: [nodeId], edgeIds: [], cost: cost }, cost + heuristicFunc(nodeId));
//   }
//   while (!q.isEmpty()) {
//     let {nodeIds, edgeIds, cost} = q.pop();
//     let curNode = nodeIds[nodeIds.length - 1];
//     let completionCost = completionCostFunc(curNode);
//     if (completionCost !== null) {
//       // we found the path!
//       return {nodeIds, edgeIds, cost: cost + completionCost};
//     }
//     seenNodeIds[curNode] = 1;
//     for (let {edgeId, nodeId, edgeCost} of edgeFunc(curNode)) {
//       let newVal = { nodeIds: nodeIds.concat([nodeId]), edgeIds: edgeIds.concat([edgeId]), cost: cost + edgeCost };
//       q.add(newVal);
//     }
//   }
//   return null; // no path found
// }

let astar = function(startNodeId, endNodeId, edgeFunc, heuristicFunc) {
  // edgeFunc: (nodeId) -> [{edgeId, nodeId, edgeCost}]
  // heuristicFunc: (nodeId) -> underestimated cost
  // returns {path, cost}, where path is a list of [{edgeId, nodeId}] pairs.
  let q = new PriorityQueue();
  q.add({path: [], cost: 0, curNodeId: startNodeId});
  let seenNodeIds = {};
  seenNodeIds[startNodeId] = 1;
  while (!q.isEmpty()) {
    let {path, cost, curNodeId} = q.pop();
    if (curNodeId === endNodeId) {
      // found it:
      return {path, cost};
    }
    seenNodeIds[curNodeId] = 1;
    for (let {edgeId, nodeId, edgeCost} of edgeFunc(curNodeId)) {
      let newPath = [...path, {edgeId, nodeId}];
      let newCost = cost + edgeCost;
      if (!seenNodeIds[nodeId]) {
        // add this to the queue:
        let heuristicCost = heuristicFunc(nodeId);
        q.add({path: newPath, curNodeId: nodeId, cost: newCost + heuristicCost});
      }
    }
  }
  return null; // no path found
}

let dist = (coord1, coord2) => {
  return Math.sqrt(Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2));
}

let lerp = (a, b, t) => a * (1-t) + b * t;
let lerpCoords = (a, b, t) => {
  return {x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t)};
}

let moveInDirection = (fromCoord, toCoord, distance) => {
  let lerpAmount = distance / dist(fromCoord, toCoord);
  return lerpCoords(fromCoord, toCoord, lerpAmount);
}

let distanceRatio = (fromCoord, toCoord, coord) => {
  // we assume `coord` is on the line segment between fromCoord and toCoord
  return dist(fromCoord, coord) / dist(fromCoord, toCoord);
}

module.exports = {astar, dist, lerp, moveInDirection, distanceRatio};
