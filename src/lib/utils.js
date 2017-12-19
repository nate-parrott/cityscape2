
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
	let totalDist = dist(fromCoord, toCoord);
	if (totalDist === 0) return toCoord;
  let lerpAmount = distance / totalDist;
  return lerpCoords(fromCoord, toCoord, lerpAmount);
}

let distanceRatio = (fromCoord, toCoord, coord) => {
  // we assume `coord` is on the line segment between fromCoord and toCoord
  return dist(fromCoord, coord) / dist(fromCoord, toCoord);
}

let addCoords = (a, b) => {
  return {x: a.x + b.x, y: a.y + b.y};
}

let subCoords = (a, b) => {
  return {x: a.x - b.x, y: a.y - b.y};
}

let coordTimesScalar = (a, k) => {
  return {x: a.x * k, y: a.y * k};
}

let dot = (a, b) => {
  return a.x * b.x + a.y * b.y;
}

// float minimum_distance(vec2 v, vec2 w, vec2 p) {
//   // Return minimum distance between line segment vw and point p
//   const float l2 = length_squared(v, w);  // i.e. |w-v|^2 -  avoid a sqrt
//   if (l2 == 0.0) return distance(p, v);   // v == w case
//   // Consider the line extending the segment, parameterized as v + t (w - v).
//   // We find projection of point p onto the line.
//   // It falls where t = [(p-v) . (w-v)] / |w-v|^2
//   // We clamp t from [0,1] to handle points outside the segment vw.
//   const float t = max(0, min(1, dot(p - v, w - v) / l2));
//   const vec2 projection = v + t * (w - v);  // Projection falls on the segment
//   return distance(p, projection);
// }

let closestPointToLineSegment = (v, w, p) => {
  let l2 = Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2);
  if (l2 == 0) return v;
  
  let t = dot(subCoords(p, v), subCoords(w, v)) / l2;
  t = Math.max(0, Math.min(1, t)); // clip between 0..1
  return addCoords(v, coordTimesScalar(subCoords(w, v), t));
}

const perpendicular = (v1, v2, m) => {
  const deltaVector = {
      x: v1.x - v2.x,
      y: v1.y - v2.y,
  }
  
  const magnitude = Math.sqrt(deltaVector.x * deltaVector.x + deltaVector.y * deltaVector.y) / m;
  
  return {
    x: deltaVector.y / magnitude,
    y: -deltaVector.x / magnitude,
  }
}

let pick1 = (list) => list[(Math.random() * list.length) | 0];

module.exports = {astar, dist, lerp, lerpCoords, moveInDirection, distanceRatio, closestPointToLineSegment, pick1, perpendicular};
