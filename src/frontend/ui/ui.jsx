import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ActionBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
    render() {
        return (
            <div className="ActionBarContainer">
                <div className='ToolBar'>
                    <ToolButton/>
                    <ToolButton/>
                    <ToolButton/>
                    <ToolButton/>
                    <ToolButton/>
                    <ToolButton/>
                </div>
                <div className='ToolPalette'>
                </div>
            </div>
        );
    }
}

function ToolButton(props) {
    
    
    return (
        <div className="ToolButton">
        </div>
    )
}

export default ActionBar;

