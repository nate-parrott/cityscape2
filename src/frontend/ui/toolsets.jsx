import React, { Component } from 'react';
import * as Tools from '../tools.js'

class TransitPalette extends React.PureComponent {
    constructor(props) {
        super(props);
        
        this.actions = [
        {
            id: "road",
            name: "Road",
            tool: Tools.CreateEdgeTool,
            options: {
                typeId: "road",
            },
        },
        {
            id: "rail",
            name: "Rail",
            tool: Tools.CreateEdgeTool,
            options: {
                typeId: "train",
            },
        }
        ]
    }
    
    render() {
        const ToolsetActions = this.actions.map((action) => 
            <ActionCard
                key={action.id}
                toolset={this.props.currentToolset}
                action={action}
                active={this.props.currentAction && this.props.currentAction.id == action.id}
                onSetTool={this.props.onSetTool}/>
        )
        
        return (
            <div className="ToolsetPalette">
                {ToolsetActions}
            </div>
        )
    }
}

function ActionCard(props) {
    const style={
        color: props.toolset.color,
        boxShadow: props.active && `0 1.2em 1.8em rgba(0, 0, 0, 0.1), inset 0 0 0 .125em ${props.toolset.color}`,
        // border: props.active && `.125em solid ${props.toolset.color}`,
    }
    return (
        <div className="ActionCard" data-active={props.active} style={style} onClick={(evt) => {
            props.onSetTool(props.action.tool, props.action.options, props.action);
        }}>
            <div className="ActionImage"></div>
            <div className="ActionDetails">
                <div className="ActionName">{props.action.name}</div>
            </div>
        </div>
    )
}

const toolsets = [
{
    name: "Transit",
    color: "#EB5757",
    icon: "ic_directions_black_24px.svg",
    palette: TransitPalette
}
]

export default toolsets;