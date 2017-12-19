import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as THREE from 'three';

import { defaultCity } from '../tests/city.js';
import { tick } from '../simulation/tick.js';
import { newApartment, newWorkplace, newAgent } from '../simulation/generation.js';
import { snapToGrid } from '../lib/utils.js'

import CityscapeScene from './cityscapeScene.jsx';

import { showBrowserWindow } from './ui/browser.jsx';
import ActionBar from './ui/ui.jsx'

// Initialize Constants

const realTimePerTick = 300;
const simTimePerTick = realTimePerTick / (6000);

const Tool = class {
    constructor(cityscape) {
        this.cityscape = cityscape;
        this.scene = this.cityscape.scene;
        
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

const CreateRoadTool = class extends Tool {
    constructor(cityscape) {
        super(cityscape);
    }
    
    onClick(evt) {
        this.setPointerVector(evt);
        this.rayCaster.setFromCamera(this.pointerVector, this.scene.camera);
        const nodeIntersects = this.rayCaster.intersectObjects(this.scene.simStateSubgroups.networkNodeGroup.children);
        
        if(this.activeNodeMesh) {
            
        }
        
        if (nodeIntersects.length > 0) {
            if(this.activeNodeMesh) {
                const nodeB = nodeIntersects[0].object;
                const newEdgeIdA = this.cityscape.createEdge("road", this.activeNodeMesh.name, nodeB.name);
                const newEdgeIdB = this.cityscape.createEdge("road", nodeB.name, this.activeNodeMesh.name);
                this.activeNodeMesh = undefined;
            } else {
                this.activeNodeMesh = nodeIntersects[0].object; 
            }
        } else if(this.activeNodeMesh) {
            const groundIntersects = this.rayCaster.ray.intersectPlane(this.scene.groundPlane);
            if (groundIntersects) {
                const newNodeId = this.cityscape.createNode(snapToGrid(groundIntersects));
                const newEdgeIdA = this.cityscape.createEdge("road", this.activeNodeMesh.name, newNodeId);
                const newEdgeIdB = this.cityscape.createEdge("road", newNodeId, this.activeNodeMesh.name);
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

class Cityscape extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSimState: defaultCity,
        }
        
        this.setScene = this.setScene.bind(this);
        this.onClick = this.onClick.bind(this);
        
        this.startSimulation();
    }
    
    componentDidMount() {
        showBrowserWindow(this.state);
        
        this.scene.renderer.domElement.addEventListener('click', this.onClick);
        
        this.setState({
            activeTool: new DisplayInfoTool(this),
        })
    }
    
    onClick(evt) {
        if (this.state.activeTool) {
            this.state.activeTool.onClick(evt);
        }
    }
    
    setScene(scene) {
        this.scene = scene;
    }
    
    startSimulation() {
        this.intervalId = setInterval(() => {
            this.setState({
                currentSimState: tick(this.state.currentSimState, simTimePerTick)
            })
        }, realTimePerTick);
    }
    
    stopSimulation() {
        clearInterval(this.intervalId);
        this.intervalId = 0;
    }
    
    createEdge (typeId, startId, endId) {
        if (typeId && startId && endId) {
            const simState = this.state.currentSimState;
            const numEdges = Object.keys(simState.map.network.edges).length;
            const id = `e${numEdges}`;
            simState.map.network.edges[id] = {
                typeId,
                startId,
                endId,
            };
            return id;
        } else {
            console.error(`Invalid createEdge parameters: ${typeId}, ${startId}, ${endId}`);
        }
    }
    
    createNode (coordinate) {
        if (coordinate) {
            const simState = this.state.currentSimState;
            const numNodes = Object.keys(simState.map.network.nodes).length;
            const id =`n${numNodes}`;
            simState.map.network.nodes[id] = {
                coordinate,
            };
            return id;
        } else {
            console.error(`Invalid createNode parameters: ${coordinate}`);
        }
    }
    
    createRandomBuilding (typeId, coordinate) {
        if (typeId && coordinate) {
            const simState = this.state.currentSimState;
            const numBuildings = Object.keys(simState.map.buildings).length;
            const id = `b${numBuildings}`;
            const buildingGenerators = {
                "home": newApartment,
                "work": newWorkplace,
            };
            if(buildingGenerators[typeId]) {
                simState.map.buildings[id] = {
                    ...buildingGenerators[typeId](),
                    coordinate,
                };
                return id;
            } else {
                console.error(`Invalid createRandomBuilding typeId: ${typeId}`);
            }
        } else {
            console.error(`Invalid createRandomBuilding parameters: ${typeId}, ${coordinate}`);
        }
    }
    
    render() {
        return (
            <div>
                <CityscapeScene simState={this.state.currentSimState} realTimePerTick={realTimePerTick} ref={this.setScene}/>
                <div id="bottomContent">
                    <ActionBar/>
                </div>
            </div>
        )
    }
}

export let mountCityscape = () => {
    const reactContainer = document.createElement("div");
    reactContainer.id = "reactContainer"
    document.body.appendChild(reactContainer);
    ReactDOM.render(<Cityscape/>, reactContainer);
};