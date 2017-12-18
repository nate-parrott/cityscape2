import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TWEEN from '@tweenjs/tween.js';

import { defaultCity } from '../tests/city.js';
import { tick } from '../simulation/tick.js';
import { showBrowserWindow } from './ui/browser.jsx';
import ActionBar from './ui/ui.jsx'

import { 
    WebGLRenderer, 
    Mesh,
    GridHelper,
} from 'three';
import * as THREE from 'three';

self.THREE = THREE;
require("./orbitControls");
require("./dragControls");

// require('aframe-effects');

require("three/examples/js/shaders/CopyShader");
require("three/examples/js/shaders/SSAOShader");
require("three/examples/js/shaders/SMAAShader");
require("three/examples/js/shaders/SMAAShader");
require("three/examples/js/shaders/BokehShader");
require("../lib/shaders/HorizontalTiltShiftShader");
require("../lib/shaders/VerticalTiltShiftShader");

const fxaa = require('three-shader-fxaa');

require("../lib/postprocessing/EffectComposer");
require("../lib/postprocessing/RenderPass");
require("../lib/postprocessing/ShaderPass");
require("../lib/postprocessing/SSAOPass");
require("../lib/postprocessing/SMAAPass");
require("../lib/postprocessing/BokehPass");

const LineGeometry = require('three-line-2d')(THREE);
const LineBasicShader = require('three-line-2d/shaders/basic')(THREE);

// Initialize Constants

const realTimePerTick = 300;
const simTimePerTick = realTimePerTick / (6000);

const backgroundColor = 0xffffff;
const gridColor = 0xeaeaea;
const groundColor = 0xffffff;
const roadColor = 0xE5E5E5;
const trackColor = 0xB5B5B5;
const residentialColor = 0xB3D28A;
const commercialColor = 0xADD1FC;
const personColor = 0xB5A8BA;

const groundMaterial = new THREE.MeshBasicMaterial( {
    color: groundColor,
    depthFunc: THREE.NeverDepth,
    name: "ground",
} );
const commercialBuildingMaterial = new THREE.MeshBasicMaterial( { color: commercialColor, name: "commercialBuilding" } );
const residentialBuildingMaterial = new THREE.MeshBasicMaterial( { color: residentialColor, name: "residentialBuilding" } );
const networkNodeMaterial = new THREE.MeshBasicMaterial( { color: roadColor, name: "networkNode" } );
const networkEdgeMaterial = new THREE.ShaderMaterial(LineBasicShader({
    side: THREE.DoubleSide,
    diffuse: roadColor,
    thickness: 0.5
}));
networkEdgeMaterial.name = "networkEdge";
const networkTrainEdgeMaterial = new THREE.ShaderMaterial(LineBasicShader({
    side: THREE.DoubleSide,
    diffuse: trackColor,
    thickness: 0.5
}));
networkTrainEdgeMaterial.name = "networkTrainEdge";
const personMaterial = new THREE.MeshBasicMaterial({ color: personColor, name: "person" });

const networkNodeGeometry = new THREE.BoxBufferGeometry( 0.5, 0.5, 0.1 );
networkNodeGeometry.translate(0, 0, -0.05);
const buildingGeometry = new THREE.BoxBufferGeometry( 1.0, 1.0, 1.0 );
buildingGeometry.translate(0, 0.5, 0.5);
const personGeometry = new THREE.DodecahedronBufferGeometry( 0.1, 0 );
personGeometry.translate(0, 0, .05);

const buildingTypes = {
    "work": {
        material: commercialBuildingMaterial,
    },
    "home": {
        material: residentialBuildingMaterial,
    }
}

const lerpCoordinates = ( coordinateA, coordinateB, progress ) => {
    return {
        x: coordinateA.x + (coordinateB.x - coordinateA.x) * progress,
        y: coordinateA.y + (coordinateB.y - coordinateA.y) * progress,
    }
}

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
    
    render() {
        return (
            <div>
                <CityscapeScene simState={this.state.currentSimState}/>
                <div id="bottomContent">
                    <ActionBar/>
                </div>
            </div>
        )
    }
}

class CityscapeScene extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            width: 0,
            height: 0,
        }
        
        this.updateDimensions = this.updateDimensions.bind(this);
        this.initializeScene = this.initializeScene.bind(this);
        this.startRender = this.startRender.bind(this);
    }
    
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
        
        this.scene = new THREE.Scene();
        window.scene = this.scene;
        
        this.renderer = new WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(this.state.width, this.state.height);
        this.renderer.setClearColor( backgroundColor, 1 );
        
        this.camera = new THREE.PerspectiveCamera( 50, this.state.width / this.state.height, 0.1, 1000);
        this.camera.up.set( 0, 0, 1);
        this.camera.position.z = 20;
        
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        
        const ssaoPass = new THREE.SSAOPass(this.scene, this.camera);
		ssaoPass.radius = 16;
		ssaoPass.aoClamp = .25;
		ssaoPass.lumInfluence = .7;
        
        const bokehPass = new THREE.BokehPass( this.scene, this.camera, {
			focus: 		0.98,
			aperture:	0.025,
			maxblur:	1.0,
		} );
		
		const hTiltPass = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
		const vTiltPass = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
		hTiltPass.uniforms[ 'r' ].value = .5;
        vTiltPass.uniforms[ 'r' ].value = .5;
        hTiltPass.uniforms[ 'h' ].value = 1/1024;
        vTiltPass.uniforms[ 'v' ].value = 1/720;
		
		const smaaPass = new THREE.SMAAPass(1920, 1080);
		

        vTiltPass.renderToScreen = true;
		
		this.effectComposer = new THREE.EffectComposer(this.renderer);
		this.effectComposer.addPass( renderPass );
		this.effectComposer.addPass( ssaoPass );
		this.effectComposer.addPass( smaaPass );
// 		this.effectComposer.addPass( bokehPass );
        this.effectComposer.addPass( hTiltPass );
        this.effectComposer.addPass( vTiltPass );

        // this.effects = new AFRAME.Effects(this.renderer, this.scene, this.camera);
        // this.effects.init("fxaa");
        // this.effects.init("bloom");
        // this.effects.init("ssao");
        // this.effects.chain( [ "fxaa" ] );
        
        this.mountTarget.appendChild(this.renderer.domElement);
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        
        this.initializeScene();
        
        this.startRender();
    }
    
    initializeScene() {
        this.groundPlane = new THREE.PlaneBufferGeometry( 100, 100 );
        this.groundPlaneMesh = new THREE.Mesh( this.groundPlane, groundMaterial );
        this.groundPlaneMesh.name = "groundPlane";
        this.groundPlaneMesh.position.z = -0.01;
        this.scene.add( this.groundPlaneMesh );
        
        this.grid = new GridHelper( 100, 100, gridColor, gridColor);
        this.grid.name = "grid";
        this.grid.rotation.x = Math.PI / 2;
        this.grid.position.x = -0.5;
        this.grid.position.y = -0.5;
        this.grid.position.z = 0;
        this.scene.add(this.grid);
        
        this.simStateGroup = new THREE.Group();
        this.simStateGroup.name = "simStateGroup";
        this.simStateGroup.matrixAutoUpdate = false;
        this.scene.add(this.simStateGroup);
        this.simStateSubgroups = {
            networkNodeGroup: this.createSimStateSubgroup("networkNodeGroup"),
            networkEdgeGroup: this.createSimStateSubgroup("networkEdgeGroup"),
            buildingGroup: this.createSimStateSubgroup("buildingGroup"),
            personGroup: this.createSimStateSubgroup("personGroup"),
        };
        
        this.interfaceStateGroup = new THREE.Group();
        this.interfaceStateGroup.name = "interfaceStateGroup";
        this.interfaceStateGroup.matrixAutoUpdate = false;
        this.scene.add(this.interfaceStateGroup);
    }
    
    createSimStateSubgroup(name) {
        const subgroup = new THREE.Group();
        subgroup.name = name;
        subgroup.matrixAutoUpdate = false;
        this.simStateGroup.add(subgroup);
        
        return subgroup;
    }
    
    startRender() {
        requestAnimationFrame(this.startRender);
        TWEEN.update();
        this.effectComposer.render();
        // this.renderer.render(this.scene, this.camera);
        // this.renderer.render(this.scene, this.camera, this.effects.renderTarget);
        // this.effects.render();
    }
    
    updateDimensions() {
        this.setState({
            width: this.mountTarget.clientWidth,
            height: this.mountTarget.clientHeight,
        });
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    
    render() {
        return (
            <div className="sceneContainer" ref={(mountTarget) => { this.mountTarget = mountTarget }}>
                <SimStateGroupManager simState={this.props.simState} simStateGroup={this.simStateGroup} simStateSubgroups={this.simStateSubgroups}/>
                <CameraManager renderer={this.renderer} camera={this.camera} effectComposer={this.effectComposer} width={this.state.width} height={this.state.height}/>
            </div>
        )
    }
}

class SimStateGroupManager extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            meshCache: new Map(),
        }
        
        this.zAxis = new THREE.Vector3(0,0,1);
    }
    
    createNodeMesh(nodeId) {
        const nodeMesh = new Mesh( networkNodeGeometry, networkNodeMaterial );
        nodeMesh.name = nodeId;
        nodeMesh.userData.updated = true;
        this.props.simStateSubgroups["networkNodeGroup"].add(nodeMesh);
        this.state.meshCache.set(nodeId, nodeMesh);
        return nodeMesh;
    }
    
    createEdgeMesh(edgeId, edge, startNode, endNode) {
        const edgeLine = new LineGeometry([[startNode.coordinate.x, startNode.coordinate.y], [endNode.coordinate.x, endNode.coordinate.y]]);
		const material = {
			road: networkEdgeMaterial,
			train: networkTrainEdgeMaterial
		}[edge.typeId];
        const edgeMesh = new THREE.Mesh(edgeLine, material)
        edgeMesh.name = edgeId;
        this.props.simStateSubgroups["networkEdgeGroup"].add(edgeMesh);
        this.state.meshCache.set(edgeId, edgeMesh);
        return edgeMesh;
    }
    
    createBuildingMesh(buildingId, building) {
        const buildingMesh = new Mesh( buildingGeometry, buildingTypes[building.typeId].material );
        buildingMesh.name = buildingId;
        this.props.simStateSubgroups["buildingGroup"].add(buildingMesh);
        this.state.meshCache.set(buildingId, buildingMesh);
        return buildingMesh;
    }
    
    createPersonMesh(personId) {
        const personMesh = new Mesh( personGeometry, personMaterial );
        personMesh.name = personId;
        this.props.simStateSubgroups["personGroup"].add(personMesh);
        this.state.meshCache.set(personId, personMesh);
        return personMesh;
    }
    
    render() {
        if(this.props.simStateGroup && this.props.simStateSubgroups) {
            const network = this.props.simState.map.network;
            const buildings = this.props.simState.map.buildings;
            const people = this.props.simState.agents.people;
            const meshCache = this.state.meshCache;
            
            const networkEdgeGroup = this.props.simStateSubgroups["networkEdgeGroup"];
            
            for(const nodeId in network.nodes) {
                const node = network.nodes[nodeId];
                const nodeMesh = meshCache.has(nodeId) ? meshCache.get(nodeId) : this.createNodeMesh(nodeId);
                if (nodeMesh.position.x !== node.coordinate.x || nodeMesh.position.y !== node.coordinate.y) {
                    nodeMesh.position.x = node.coordinate.x;
                    nodeMesh.position.y = node.coordinate.y;
                    nodeMesh.userData.updated = true;
                } else {
                    nodeMesh.userData.updated = false;
                }
            }
            
            for(const edgeId in network.edges) {
                const edge = network.edges[edgeId];
                const endNode = network.nodes[edge.endId];
                const endNodeMesh = meshCache.get(edge.endId);
                const startNode = network.nodes[edge.startId];
                const startNodeMesh = meshCache.get(edge.endId);
                
                const nodesExist = startNode && endNode;
                
                if (meshCache.has(edgeId)) {
                    if (!(startNodeMesh && endNodeMesh && !startNodeMesh.userData.updated && !endNodeMesh.userData.updated)) {
                        networkEdgeGroup.remove(meshCache.get(edgeId));
                        if (nodesExist) {
                            this.createEdgeMesh(edgeId, edge, startNode, endNode);
                        }
                    }
                } else if (nodesExist) {
                    this.createEdgeMesh(edgeId, edge, startNode, endNode);
                }
            }
            
            for(const buildingId in buildings) {
                const building = buildings[buildingId];
                const buildingMesh = meshCache.has(buildingId) ? meshCache.get(buildingId) : this.createBuildingMesh(buildingId, building);
                buildingMesh.position.x = building.coordinate.x;
                buildingMesh.position.y = building.coordinate.y;
                buildingMesh.setRotationFromAxisAngle(this.zAxis, building.coordinate.rotation);
                buildingMesh.scale.x = building.dimension.x;
                buildingMesh.scale.y = building.dimension.y;
                buildingMesh.scale.z = building.dimension.z;
            }
            
            for(const personId in people) {
                const person = people[personId];
                const edge = network.edges[person.position.edgeId];
                const endNode = network.nodes[edge.endId];
                const startNode = network.nodes[edge.startId];
                const coordinate = lerpCoordinates(startNode.coordinate, endNode.coordinate, person.position.distance);
                const personMesh = meshCache.has(personId) ? meshCache.get(personId) : this.createPersonMesh(personId);
                if (personMesh.position.x !== coordinate.x || personMesh.position.y !== coordinate.y) {
                    if(personMesh.userData.tween) {
                        TWEEN.remove(personMesh.userData.tween);
                    }
                    personMesh.userData.tween = new TWEEN.Tween(personMesh.position)
                        .to(coordinate, realTimePerTick)
                        .onComplete(() => personMesh.userData.tween = undefined)
                        .start();
                }
            }
        }
        
        return null;
    }
}

function CameraManager(props) {
    if(props.width && props.height) {
        if(props.camera) {
            props.camera.aspect = props.width / props.height;
            props.camera.updateProjectionMatrix();
        }
        if(props.renderer) {
            props.renderer.setSize(props.width, props.height);
        }
        if(props.effectComposer) {
            props.effectComposer.setSize(props.width, props.height);    
        }
    }
    return null;
}

export let mountCityscape = () => {
    const reactContainer = document.createElement("div");
    reactContainer.id = "reactContainer"
    document.body.appendChild(reactContainer);
    ReactDOM.render(<Cityscape/>, reactContainer);
};