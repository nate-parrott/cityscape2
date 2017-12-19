import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import toolsets from './toolsets.jsx';

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
                activeColor={toolset.color} 
                active={this.props.currentToolset == toolset} 
                onSetToolset={this.props.onSetToolset}/>
        );
        return (
            <div className="ActionBarContainer">
                <div className='ToolBar'>
                    {ToolsetButtons}
                </div>
                <div className='ToolsetPaletteContainer'>
                    {this.props.currentToolset &&
                        <ToolsetPalette currentToolset={this.props.currentToolset} currentTool={this.props.currentTool} onSetTool={this.props.onSetTool}/>
                    }
                </div>
            </div>
        );
    }
}

function ToolsetButton(props) {
    const style={
        background: props.active && props.activeColor,
    }
    return (
        <div className="ToolsetButton" data-active={props.active} style={style} onClick={(evt) => {
            props.onSetToolset(props.toolset);
        }}>
        </div>
    )
}

export default ActionBar;

