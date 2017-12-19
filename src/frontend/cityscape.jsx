import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { defaultCity } from '../tests/city.js';
import { tick } from '../simulation/tick.js';

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
        this.startSimulation();
    }
    
    componentDidMount() {
        showBrowserWindow(this.state);
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
    
    render() {
        return (
            <div>
                <CityscapeScene simState={this.state.currentSimState} realTimePerTick={realTimePerTick}/>
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