import { astar, dist } from './utils';

export default class Network {
  constructor(net) {
    this.edges = net.edges;
    this.nodes = net.nodes;
    this.edgeIdsByNodeId = {};
    for (let edgeId of Object.keys(this.edges)) {
      let nodeIds = [this.edges[edgeId].startId, this.edges[edgeId].endId];
      for (let nodeId of nodeIds) {
        if (!this.edgeIdsByNodeId[nodeId]) this.edgeIdsByNodeId[nodeId] = [];
        this.edgeIdsByNodeId[nodeId].push(edgeId);
      }
    }
  }
  calcRoute(startCoord, startEdgeId, endCoord, endEdgeId) {
    // returns a list of node ids
    let startEdge = this.edges[startEdgeId];
    let startPositions = [ startEdge.startId, startEdge.endId ].map((nodeId) => {
      return {nodeId, cost: dist(this.nodes[nodeId].coordinate, startCoord)};
    });
    let completionCostFunction = (nodeId) => {
      let edges = this.edgeIdsByNodeId[nodeId];
      for (let edgeId of edges) {
        if (edgeId === endEdgeId) {
          return dist(endCoord, this.nodes[nodeId].coordinate);
        }
      }
      return null;
    }
    let heuristicFunc = (nodeId) => {
      return dist(this.nodes[nodeId].coordinate, endCoord);
    }
    let edgeFunc = (nodeId) => {
      return this.edgeIdsByNodeId[nodeId].map((edgeId) => {
        let edge = this.edges[edgeId];
        let otherNodeId = edge.startId === nodeId ? edge.endId : edge.startId;
        let edgeCost = dist(this.nodes[nodeId].coordinate, this.nodes[otherNodeId].coordinate);
        return {edgeId, nodeId: otherNodeId, edgeCost}
      })
    }
    let route = astar(startPositions, completionCostFunction, heuristicFunc, edgeFunc);
    if (route) {
      return route.nodeIds;
    } else {
      return null;
    }
  }
}
