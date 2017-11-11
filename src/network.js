import { astar, dist, lerp, moveInDirection, distanceRatio, closestPointToLineSegment } from './utils';

export default class Network {
  constructor(net) {
    this.edges = net.edges;
    this.nodes = net.nodes;
    this.edgeIdsFromNodeId = {};
    for (let edgeId of Object.keys(this.edges)) {
      let edge = this.edges[edgeId];
      if (!this.edgeIdsFromNodeId[edge.startId]) this.edgeIdsFromNodeId[edge.startId] = [];
      this.edgeIdsFromNodeId[edge.startId].push(edgeId);
    }
  }
  calcRoute(startCoord, startEdgeId, endCoord, endEdgeId) {
    // returns a list of edge ids, including the start and end:
    if (startEdgeId === endEdgeId) {
      let edgeStart = this.nodes[this.edges[startEdgeId].startId].coordinate;
      let edgeEnd = this.nodes[this.edges[startEdgeId].endId].coordinate;
      
      let startDist = distanceRatio(edgeStart, edgeEnd, startCoord);
      let endDist = distanceRatio(edgeStart, edgeEnd, endCoord);
      if (startDist < endDist) {
        // edges are one-way, but we're going the right way:
        return [startEdgeId];
      }
      // otherwise, we'll need to route from the end of our current edge, back around to the start node of this edge ('going around the block again')
    }
    let edgeFunc = (nodeId) => {
      return (this.edgeIdsFromNodeId[nodeId] || []).map((edgeId) => {
        let edge = this.edges[edgeId];
        return {edgeId, nodeId: edge.endId, edgeCost: dist(this.nodes[edge.startId].coordinate, this.nodes[edge.endId].coordinate)};
      });
    }
    let heuristicFunc = (nodeId) => {
      return dist(this.nodes[nodeId].coordinate, endCoord);
    }
    let startNodeId = this.edges[startEdgeId].endId;
    let endNodeId = this.edges[endEdgeId].startId;
    let route = astar(startNodeId, endNodeId, edgeFunc, heuristicFunc);
    if (route) {
      let innerEdges = route.path.map((p) => p.edgeId);
      return [startEdgeId, ...innerEdges, endEdgeId];
    } else {
      return null;
    }
  }
  moveToward(startEdgeId, startCoord, destEdgeId, destCoord, budget) {
    // returns {newPosition, remainingBudget, atDestination}
    startCoord = this.nearestCoordinate(startCoord, startEdgeId);
    destCoord = this.nearestCoordinate(destCoord, destEdgeId);
    
    let routeEdges = this.calcRoute(startCoord, startEdgeId, destCoord, destEdgeId);
    
    let coord = startCoord;
    let edgeId = startEdgeId;
        
    let atDest = () => edgeId === destEdgeId && dist(coord, destCoord) < 0.001;
    
    if (!routeEdges) {
      console.log("no route");
    }
    if (!routeEdges || atDest()) {
      return {newPosition: pos, remainingBudget: budget, atDestination: atDest()};
    }
    
    for (let i=0; i < routeEdges.length; i++) {
      edgeId = routeEdges[i];
      
      let maxTravelDist;
      let endOfEdgeCoord = this.nodes[this.edges[edgeId].endId].coordinate;
      if (i === routeEdges.length - 1) {
        maxTravelDist = dist(coord, destCoord);
      } else {
        maxTravelDist = dist(coord, endOfEdgeCoord);
      }
      let travelDist = Math.min(maxTravelDist, budget);
      coord = moveInDirection(coord, endOfEdgeCoord, travelDist);
      budget -= travelDist;
      if (budget <= 0) break;
    }
    let edge = this.edges[edgeId];
    let distBetween = distanceRatio(this.nodes[edge.startId].coordinate, this.nodes[edge.endId].coordinate, coord);
    return {newPosition: {edgeId, distance: distBetween}, atDestination: atDest()};
  }
  coord(edgeId, distance) {
    let fromNode = this.nodes[this.edges[edgeId].startId];
    let toNode = this.nodes[this.edges[edgeId].endId];
    return {x: lerp(fromNode.coordinate.x, toNode.coordinate.x, distance), y: lerp(fromNode.coordinate.y, toNode.coordinate.y, distance)};
  }
  edgeIdConnectingNodeIds(nodeId, nodeId2) {
    for (let edgeId of this.edgeIdsByNodeId[nodeId]) {
      if (edgeId.startId === nodeId2 || edgeId.endId === nodeId2) {
        return edgeId;
      }
    }
    return null;
  }
  nearestCoordinate(toCoord, onEdgeId) {
    let {startId, endId} = this.edges[onEdgeId];
    let v1 = this.nodes[startId].coordinate;
    let v2 = this.nodes[endId].coordinate;
    return closestPointToLineSegment(v1, v2, toCoord);
  }
}
