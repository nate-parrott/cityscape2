import React, { Component } from 'react';

import SVG  from 'react-inlinesvg';

import toolsets from './toolsets.jsx';

const massTransitNarrative = {
    "01_welcome": {
        title: "Welcome to Cityscape",
        body: "<p>Let’s start with the basics:<br/><span class='textResidential definition'>Green buildings</span> represent apartments<br/><span class='textCommercial definition'>Blue buildings</span> represent businesses<br/><span class='textPerson definition'>Purple dots</span> are citizens, who live in apartments, and work in businesses.</p>",
    },
    "02_roads": {
        title: "Work and Play",
        body: "<p>Citizens need to travel between work and home throughout their day.</p><p class='NarratorInstruction'>Build a road between the downtown on the left with the neighborhood to the right.</p>",
    },
    "03_congestion": {
        title: "Traffic Jams",
        body: "<p>Notice that as we expand, we’re starting to experience <span class='definition'>congestion</span>, as more traffic travels on our roads.</p><p class='NarratorInstruction'>Turn on traffic view to examine the congestion.</p>",
    },
    "04_mass-transit": {
        title: "Mass Transit",
        body: "<p>One way to reduce this congestion is by building mass transit systems, such as subways.<br/><span class='textTransit definition'>Subway stations</span> already exist between downtown and our neighborhood, but need to be connected.</p><p class='NarratorInstruction'>Build tracks between the two subway stations.</p>",
    },
    "05_trains": {
        title: "Trains",
        body: "<p>Now, we need to place trains.</p><p class='NarratorInstruction'>Add a train to the line you just built.</p>",
    },
    "06_conclusion": {
        title: "Congestion, II",
        body: "<p>Wonderful! Notice how congestion decreases, as more people begin to use the subway instead of driving on the roads.</p>",
    },
    "0n_mass-transit": {
        title: "Mass Transit",
        body: "<p class='NarratorParagraph'>An effective <span class='textTransit definition'>transit network</span> is the backbone of a dense, efficient city.</p><p class='NarratorInstruction'>Add a station to the subway line below:</p>",
    }
}

class CityscapeUI extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div id="topContent">
                    <NarratorManager narrative={massTransitNarrative} currentStepId={"06_conclusion"}/>
                </div>
                <div id="bottomContent">
                    <ActionBar 
                        currentToolset={this.props.currentToolset} 
                        currentTool={this.props.currentTool} 
                        currentAction={this.props.currentAction} 
                        onSetToolset={this.props.onSetToolset} 
                        onSetTool={this.props.onSetTool}/>
                </div>
            </div>
        )
    }
}

class NarratorManager extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        const currentStep = this.props.narrative[this.props.currentStepId];
        
        return (
            <Narrator title={currentStep.title} color="#EB5757">
                <div dangerouslySetInnerHTML={{ __html: currentStep.body}}/>
            </Narrator>
        )
    }
}

class Narrator extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        const accentBarStyle = {
            background: this.props.color,
        }
        
        return (
            <div className="NarratorContainer">
                <div className="NarratorContent">
                    <h1 className="NarratorTitle"><div className="NarratorAccentBar" style={accentBarStyle} />{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class ActionBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const ToolsetPalette = (this.props.currentToolset) ? this.props.currentToolset.palette : undefined;
        const ToolsetButtons = toolsets.map((toolset) =>
            <ToolsetButton 
                key={toolset.name} 
                toolset={toolset}
                active={this.props.currentToolset == toolset} 
                onSetToolset={this.props.onSetToolset}/>
        );
        return (
            <div className="ActionBarContainer" data-active={!!this.props.currentToolset}>
                <div className='ToolBar'>
                    {ToolsetButtons}
                </div>
                <div className='ToolsetPaletteContainer'>
                    {this.props.currentToolset &&
                        <ToolsetPalette currentToolset={this.props.currentToolset} currentTool={this.props.currentTool} currentAction={this.props.currentAction} onSetTool={this.props.onSetTool}/>
                    }
                </div>
            </div>
        );
    }
}

function ToolsetButton(props) {
    const style={
        background: props.active && props.toolset.color,
    }
    return (
        <div className="ToolsetButton" data-active={props.active} style={style} onClick={(evt) => {
            props.onSetToolset(props.toolset);
        }}>
            <SVG src={`/webAssets/icons/${props.toolset.icon}`} />
        </div>
    )
}

export default CityscapeUI;

