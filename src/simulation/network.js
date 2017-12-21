import { astar, dist, lerp, moveInDirection, distanceRatio, closestPointToLineSegment } from '../lib/utils';
import Constants from './constants.js';
const { walkingSpeedUnitsPerHour, trainSpeedUnitsPerHour } = Constants;
let maxTransitSpeed = trainSpeedUnitsPerHour;

export default class Network {
  constructor(net, trains) {
    this.edges = net.edges;
    this.nodes = net.nodes;
		this.trains = trains;
		this.makeEdgesForTrains();
    this.edgeIdsFromNodeId = {};
    for (let edgeId in this.edges) {
      let edge = this.edges[edgeId];
			if (edge.typeId !== 'train') { // people can't be routed on train edges
	      if (!this.edgeIdsFromNodeId[edge.startId]) this.edgeIdsFromNodeId[edge.startId] = [];
	      this.edgeIdsFromNodeId[edge.startId].push(edgeId);
			}
    }
  }
	makeEdgesForTrains() {
		let id = 0;
		for (let trainId in this.trains) {
			let train = this.trains[trainId];
			let schedule = train.schedule;
			for (let startIdx=0; startIdx < schedule.length; startIdx++) {
				if (schedule[startIdx].type === 'stop') {
					let hours = 0;
					for (let offset=1; offset < schedule.length; offset++) {
						let endIdx = (startIdx + offset) % schedule.length;
						if (schedule[endIdx].type === 'stop') {
							// create an edge:
							let edgeId = 'train_edge_' + (id++);
							let startId = schedule[startIdx].nodeId;
							let endId = schedule[endIdx].nodeId;
							this.edges[edgeId] = {typeId: 'trainTrip', trainId, startId, endId, hours};
						} else if (schedule[endIdx].type === 'go') {
							hours += this.edgeLength(schedule[endIdx].edgeId) / trainSpeedUnitsPerHour;
						}
					}
				}
			}
		}
	}
	edgeIdForGettingOffTrain(nodeId) {
		return this.edgeIdsFromNodeId[nodeId].filter((id) => this.edges[id].type !== 'train')[0];
	}
	edgeLength(edgeId) {
		let {startId, endId} = this.edges[edgeId];
		if(!this.nodes[startId]) {
		  console.error("node not found", startId)
		}
		if(!this.nodes[endId]) {
		  console.error("node not found", endId)
		}
		let startPos = this.nodes[startId].coordinate;
		let endPos = this.nodes[endId].coordinate;
		return dist(startPos, endPos);
	}
	costForEdge(edgeId) {
		let edge = this.edges[edgeId];
		if (edge.hours) {
			return edge.hours;
		}
		let cost = this.edgeLength(edgeId) / walkingSpeedUnitsPerHour;
		return cost;
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
        return {edgeId, nodeId: edge.endId, edgeCost: this.costForEdge(edgeId)};
      });
    }
    let heuristicFunc = (nodeId) => {
      return dist(this.nodes[nodeId].coordinate, endCoord) / maxTransitSpeed * 0.99;
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
    // returns {newPosition, remainingBudget, atDestination, onTrainId, exitTrainAtNodeId}
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
	    let edge = this.edges[edgeId];
	    let distBetween = distanceRatio(this.nodes[edge.startId].coordinate, this.nodes[edge.endId].coordinate, coord);
      return {newPosition: {edgeId, distance: distBetween}, remainingBudget: budget, atDestination: atDest()};
    }
    
    for (let i=0; i < routeEdges.length; i++) {
      edgeId = routeEdges[i];
			let edge = this.edges[edgeId];
			if (edge.typeId === 'trainTrip') {
				// we'll need to wait for, or get on, the train:
				let trainId = edge.trainId;
				let stopsDuringPrevTick = this.trains[trainId].stopsDuringPrevTick || [];
				let canBoard = stopsDuringPrevTick.indexOf(edge.startId) !== -1;
				if (canBoard) {
					return {newPosition: {edgeId, distance: 0}, remainingBudget: 0, atDestination: false, onTrainId: edge.trainId, exitTrainAtNodeId: edge.endId};
				} else {
					return {newPosition: {edgeId, distance: 0}, remainingBudget: 0, atDestination: false};
				}
			}
      
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
