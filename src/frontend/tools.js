import * as THREE from 'three';
import { snapToGrid, closestPointToLineSegment } from '../lib/utils.js'

const Tool = class {
    constructor(cityscape, options) {
        this.cityscape = cityscape;
        this.scene = this.cityscape.scene;
        this.options = options;
        
        this.rayCaster = new THREE.Raycaster();
        this.rayCaster.linePrecision = .1;
        this.pointerVector = new THREE.Vector3();
    }
    
    setPointerVector(evt) {
        const rect = this.scene.renderer.domElement.getBoundingClientRect();
        this.pointerVector.x = (( evt.clientX - rect.left ) / rect.width ) * 2 - 1;
        this.pointerVector.y = -(( evt.clientY - rect.top ) / rect.height ) * 2 + 1;
    }
    
    onClick(evt) {
    }
}

const CreateEdgeTool = class extends Tool {
    constructor(cityscape, options) {
        super(cityscape, options);
    }
    
    onClick(evt) {
        this.setPointerVector(evt);
        this.rayCaster.setFromCamera(this.pointerVector, this.scene.camera);
        const nodeIntersects = this.rayCaster.intersectObjects(this.scene.simStateSubgroups.networkNodeGroup.children);
        
        if (nodeIntersects.length > 0) {
            if(this.activeNodeMesh) {
                const nodeB = nodeIntersects[0].object;
                const newEdgeIdA = this.cityscape.createEdge(this.options.typeId, this.activeNodeMesh.name, nodeB.name);
                const newEdgeIdB = this.cityscape.createEdge(this.options.typeId, nodeB.name, this.activeNodeMesh.name);
                this.activeNodeMesh = undefined;
            } else {
                this.activeNodeMesh = nodeIntersects[0].object; 
            }
        } else if(this.activeNodeMesh) {
            const groundIntersects = this.rayCaster.ray.intersectPlane(this.scene.groundPlane);
            if (groundIntersects) {
                const newNodeId = this.cityscape.createNode(snapToGrid(groundIntersects));
                const newEdgeIdA = this.cityscape.createEdge(this.options.typeId, this.activeNodeMesh.name, newNodeId);
                const newEdgeIdB = this.cityscape.createEdge(this.options.typeId, newNodeId, this.activeNodeMesh.name);
                this.activeNodeMesh = undefined;
            }
        }
    }
}

const CreateBuildingTool = class extends Tool {
    constructor(cityscape, options) {
        super(cityscape, options);
    }
    
    onClick(evt) {
        this.setPointerVector(evt);
        this.rayCaster.setFromCamera(this.pointerVector, this.scene.camera);
        const edgeIntersects = this.rayCaster.intersectObjects(this.scene.simStateSubgroups.networkEdgeGroup.children);
        
        if (edgeIntersects.length > 0) {
            this.activeEdge = edgeIntersects[0].object;
        } else if(this.activeEdge) {
            const groundIntersects = this.rayCaster.ray.intersectPlane(this.scene.groundPlane);
            if (groundIntersects) {
                const simState = this.cityscape.state.currentSimState;
                const edge = simState.map.network.edges[this.activeEdge.name];
                const startNode = simState.map.network.nodes[edge.startId];
                const endNode = simState.map.network.nodes[edge.endId];
                const buildingPosition = snapToGrid(groundIntersects);
                const edgeCoordinate = closestPointToLineSegment(startNode.coordinate, endNode.coordinate, buildingPosition);
                const toEdgeVector = new THREE.Vector2(buildingPosition.x - edgeCoordinate.x, buildingPosition.y - edgeCoordinate.y);
                toEdgeVector.normalize();
                buildingPosition.rotation = toEdgeVector.angle() - Math.PI/2;
                buildingPosition.x = buildingPosition.x - toEdgeVector.x * .5;
                buildingPosition.y = buildingPosition.y - toEdgeVector.y * .5;
                const newBuildingId = this.cityscape.createRandomBuilding(this.options.typeId, this.activeEdge.name, buildingPosition);
            }
        }
    }
}

const InspectTool = class extends Tool {
    constructor(cityscape, options) {
        super(cityscape, options);
    }
    
    onClick(evt) {
        this.setPointerVector(evt);
        this.rayCaster.setFromCamera(this.pointerVector, this.scene.camera);
        const nodeIntersects = this.rayCaster.intersectObjects(this.scene.simStateGroup.children, true);
        
        if (nodeIntersects.length > 0) {
            // nodeIntersects[0].object.visible = false;
            console.log(nodeIntersects[0].object);
        }
        
        console.log(this.cityscape.state.currentSimState); // todo in lieu of actual save/load lol
    }
}

module.exports = {CreateEdgeTool, CreateBuildingTool, InspectTool};