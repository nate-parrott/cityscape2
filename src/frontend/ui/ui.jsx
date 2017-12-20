import React, { Component } from 'react';

import SVG  from 'react-inlinesvg';

import toolsets from './toolsets.jsx';

class CityscapeUI extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div id="topContent">
                    <Narrator title="Mass Transit" color="#EB5757">
                        <p className="NarratorParagraph">An effective transit network is the backbone of a dense, efficient city.</p>
                        <p className="NarratorInstruction">Add a station to the subway line below</p>
                    </Narrator>
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

