import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TransitToolset from './toolsets.jsx';

class ActionBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const Toolset = this.props.currentToolset;
        return (
            <div className="ActionBarContainer">
                <div className='ToolBar'>
                    <ToolButton toolset={TransitToolset} onSetToolset={this.props.onSetToolset}/>
                </div>
                <div className='ToolsetPalette'>
                    {this.props.currentToolset &&
                        <Toolset/>
                    }
                </div>
            </div>
        );
    }
}

function ToolButton(props) {
    
    return (
        <div className="ToolButton" onClick={(evt) => {
            props.onSetToolset(props.toolset);
        }}>
        </div>
    )
}

export default ActionBar;

