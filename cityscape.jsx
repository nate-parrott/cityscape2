import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { testTicking } from './tests';
import { defaultCity } from './city.js';
import { tick } from './tick.js';
import { showBrowserWindow } from './browser.jsx';
import { showUI } from './ui.jsx'

import { 
    WebGLRenderer, 
    Mesh,
    GridHelper,
} from 'three';
import * as THREE from 'three';

self.THREE = THREE;
require("./orbitControls");
require("./dragControls");
const LineMesh = require('three-line-2d')(THREE);
const BasicShader = require('three-line-2d/shaders/basic')(THREE);

// Initialize Constants

const backgroundColor = 0xffffff;
const groundColor = 0xffffff;
const networkColor = 0xE5E5E5;
const residentialColor = 0xB3D28A;
const commercialColor = 0xADD1FC;
const personColor = 0xB5A8BA;

const groundMaterial = new THREE.MeshBasicMaterial( {
    color: groundColor,
    depthFunc: THREE.NeverDepth,
} );
const commercialBuildingMaterial = new THREE.MeshBasicMaterial( { color: commercialColor } );
const residentialBuildingMaterial = new THREE.MeshBasicMaterial( { color: residentialColor } );
const networkNodeMaterial = new THREE.MeshBasicMaterial( { color: networkColor } );
const networkEdgeMaterial = new THREE.ShaderMaterial(BasicShader({
    side: THREE.DoubleSide,
    diffuse: networkColor,
    thickness: 0.5
}));
const personMaterial = new THREE.MeshBasicMaterial({ color: personColor });

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

class CityScape extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
    componentDidMount() {
        
    }
    
    initializeCityView() {
        
    }
    
    
}