import * as THREE from 'three';
import { snapToGrid } from '../lib/utils.js'

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

const DisplayInfoTool = class extends Tool {
    constructor(cityscape) {
        super(cityscape);
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

module.exports = {CreateEdgeTool, DisplayInfoTool};