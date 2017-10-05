
function PriorityQueue() {
  this.q = [];
  this._reSort = () => {
    this.q.sort((a, b) => a.cost - b.cost);
  }
  this.add = (value, cost) => {
    // TODO: actually make this efficient
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
  [ { id: <node id>,  cost: 0}, ... ]
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
let astar = function(startPositions, completionCostFunc, heuristicFunc, edgeFunc) {
  let q = new PriorityQueue(); // values: {nodeIds, cost, edgeIds}
  let seenNodeIds = {};
  for (let {nodeId, cost} of startPositions) {
    seenNodeIds[nodeId] = 1;
    q.add({ nodeIds: [nodeId], edgeIds: [], cost: cost }, cost + heuristicFunc(nodeId));
  }
  while (!q.isEmpty()) {
    let {nodeIds, edgeIds, cost} = q.pop();
    let curNode = nodeIds[nodeIds.length - 1];
    let completionCost = completionCostFunc(curNode);
    if (completionCost !== null) {
      // we found the path!
      return {nodeIds, edgeIds, cost + completionCost};
    }
    for (let {edgeId, nodeId, edgeCost} of edgeFunc(curNode)) {
      let newVal = { nodeIds: nodeIds.concat([nodeId]), edgeIds: edgeIds.concat([edgeId]), cost: cost + edgeCost };
      q.add({ nodeIds })
    }
  }
  return null; // no path found
}

module.exports = {astar};
