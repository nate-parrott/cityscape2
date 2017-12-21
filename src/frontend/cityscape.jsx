import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { defaultCity } from '../tests/city.js';
import { transportTestCity } from '../tests/transportTestCity.js';
import { massTransitUnitCity } from '../tests/massTransitUnitCity.js';

import { tick } from '../simulation/tick.js';
import { newApartment, newWorkplace, newAgent } from '../simulation/generation.js';

import CityscapeScene from './cityscapeScene.jsx';

import { showBrowserWindow } from './ui/browser.jsx';
import CityscapeUI from './ui/ui.jsx'

// Initialize Constants

const realTimePerTick = 300;
const simTimePerTick = realTimePerTick / (6000);

class Cityscape extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSimState: massTransitUnitCity,
        }
        
        this.setScene = this.setScene.bind(this);
        this.setToolset = this.setToolset.bind(this);
        this.setTool = this.setTool.bind(this);
        this.onClick = this.onClick.bind(this);
        
        this.populate()
        
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
    
    populate() {
        const simState = this.state.currentSimState;
        const numBuildings = Object.keys(simState.map.buildings).length;
        const numPeople = numBuildings; //TODO
        const edgeIds = Object.keys(simState.map.network.edges);
        const numEdges = edgeIds.length;
        for(let i = 0; i < numPeople; i++) {
            const edgeIdx = Math.floor(Math.random() * numEdges);
            // this.createRandomPerson(edgeIds[edgeIdx], Math.random());
            this.createRandomPerson("e0", Math.random());
        }
    }
    
    createEdge (typeId, startId, endId) {
        if (typeId && startId && endId) {
            const simState = this.state.currentSimState;
            let i = Object.keys(simState.map.network.edges).length;
            while(simState.map.network.edges[`e${i}`]) {
                i++;
            }
            const id = `e${i}`;
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
            let i = Object.keys(simState.map.network.nodes).length;
            while(simState.map.network.nodes[`n${i}`]) {
                i++;
            }
            const id =`n${i}`;
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
            let i = Object.keys(simState.map.buildings).length;
            while(simState.map.buildings[`b${i}`]) {
                i++;
            }
            const id = `b${i}`;
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
    
    createRandomPerson (edgeId, ageFraction) {
        console.log(edgeId);
        
        if (edgeId && ageFraction) {
            const simState = this.state.currentSimState;
            let i = Object.keys(simState.agents.people).length;
            while(simState.agents.people[`p${i}`]) {
                i++;
            }
            const id = `p${i}`;
            simState.agents.people[id] = {
                ...newAgent(ageFraction),
                position: {
                  edgeId: edgeId,
                  distance: Math.random(),
                },
            }
        } else {
            console.error(`Invalid createNode parameters: ${edgeId}, ${ageFraction}`);
        }
    }
    
    render() {
        return (
            <div>
                <CityscapeScene 
                    simState={this.state.currentSimState} 
                    realTimePerTick={realTimePerTick} 
                    ref={this.setScene}/>
                <CityscapeUI 
                    currentToolset={this.state.currentToolset} 
                    currentTool={this.state.currentTool} 
                    currentAction={this.state.currentAction} 
                    onSetToolset={this.setToolset} 
                    onSetTool={this.setTool}/>
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