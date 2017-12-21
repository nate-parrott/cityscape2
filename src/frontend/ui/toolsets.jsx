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

class RCIPalette extends React.PureComponent {
    constructor(props) {
        super(props);
        
        this.actions = [
        {
            id: "apartment",
            name: "Apartment",
            color: "#B3D28A",
            tool: Tools.CreateBuildingTool,
            options: {
                typeId: "home",
            },
        },
        {
            id: "business",
            name: "Business",
            color: "#ADD1FC",
            tool: Tools.CreateBuildingTool,
            options: {
                typeId: "work",
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

class DataPalette extends React.PureComponent {
    constructor(props) {
        super(props);
        
        this.actions = [
        {
            id: "inspect",
            name: "Inspect",
            tool: Tools.InspectTool,
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
    const color = props.action.color ? props.action.color : props.toolset.color;
    const style={
        color,
        boxShadow: props.active && `0 1.2em 1.8em rgba(0, 0, 0, 0.1), inset 0 0 0 .125em ${color}`,
        // border: props.active && `.125em solid ${color}`,
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
    palette: TransitPalette,
},
{
    name: "RCI",
    color: "#B3D28A",
    icon: "ic_home_black_24px.svg",
    palette: RCIPalette,
},
{
    name: "Data",
    color: "rgb(196, 196, 196)",
    icon: "ic_search_black_24px.svg",
    palette: DataPalette,
}
]

export default toolsets;