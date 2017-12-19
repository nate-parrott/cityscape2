import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { defaultCity } from '../tests/city.js';
import { tick } from '../simulation/tick.js';
import { newApartment, newWorkplace, newAgent } from '../simulation/generation.js';

import CityscapeScene from './cityscapeScene.jsx';

import { showBrowserWindow } from './ui/browser.jsx';
import ActionBar from './ui/ui.jsx'

// Initialize Constants

const realTimePerTick = 300;
const simTimePerTick = realTimePerTick / (6000);

class Cityscape extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSimState: defaultCity,
        }
        
        this.setScene = this.setScene.bind(this);
        this.setToolset = this.setToolset.bind(this);
        this.setTool = this.setTool.bind(this);
        this.onClick = this.onClick.bind(this);
        
        this.startSimulation();
    }
    
    componentDidMount() {
        showBrowserWindow(this.state);
        
        this.scene.renderer.domElement.addEventListener('click', this.onClick);
    }
    
    onClick(evt) {
        if (this.state.currentTool) {
            this.state.currentTool.onClick(evt);
        }
    }
    
    setScene(scene) {
        this.scene = scene;
    }
    
    setToolset(toolset) {
        this.setState({
            currentToolset: (this.state.currentToolset === toolset) ? undefined : toolset,
        });
    }
    
    setTool(tool, options, action) {
        this.setState({
            currentAction: (this.state.currentAction && this.state.currentAction.id === action.id) ? undefined : action,
            currentTool: (this.state.currentAction && this.state.currentAction.id === action.id) ? undefined : new tool(this, options),
        });
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
    
    createRandomBuilding (typeId, edgeId, coordinate) {
        if (typeId && edgeId && coordinate) {
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
                    edgeId,
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
                    <ActionBar currentToolset={this.state.currentToolset} currentTool={this.state.currentTool} currentAction={this.state.currentAction} onSetToolset={this.setToolset} onSetTool={this.setTool}/>
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