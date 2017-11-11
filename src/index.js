import { testTicking } from './tests';

import { 
    WebGLRenderer, 
    Mesh,
    Line,
    BufferGeometry,
    BufferAttribute,
    BoxBufferGeometry, 
    MeshBasicMaterial,
    LineBasicMaterial,
    GridHelper,
} from 'three';
import * as THREE from 'three';
self.THREE = THREE;
require("three/examples/js/controls/OrbitControls");

const backgroundColor = 0xffffff;
const networkColor = 0x6F7A90;
const residentialColor = 0xB3D28A;
const commercialColor = 0xADD1FC;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
const controls = new THREE.OrbitControls( camera );
window.onresize = function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

const renderer = new WebGLRenderer({
    antialias: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor, 1 );
document.body.appendChild( renderer.domElement );

const networkNodeGeometry = new BoxBufferGeometry( 0.1, 0.1, 0.1 );
const buildingGeometry = new BoxBufferGeometry( 0.2, 0.2, 0.2 );

const commercialBuildingMaterial = new MeshBasicMaterial( { color: commercialColor } );
const residentialBuildingMaterial = new MeshBasicMaterial( { color: residentialColor } );
const networkNodeMaterial = new MeshBasicMaterial( { color: networkColor } );
const networkEdgeMaterail = new LineBasicMaterial({ color: networkColor });

const buildingTypes = {
    "work": {
        material: commercialBuildingMaterial,
    },
    "home": {
        material: residentialBuildingMaterial,
    }
}

const grid = new GridHelper( 100, 100 );
grid.rotation.x = Math.PI / 2;
grid.position.z = -0.1;
scene.add(grid);

const load = () => {
    self.fetch('city2.json').then((response) => {
        return response.json();
    }).then(drawState);
}

const drawState = (state) => {
    const network = state.map.network;
    const buildings = state.map.buildings;
    for(const nodeID in network.nodes) {
        const node = network.nodes[nodeID];
        const nodeMesh = new Mesh( networkNodeGeometry, networkNodeMaterial );
        nodeMesh.position.x = node.coordinate.x;
        nodeMesh.position.y = node.coordinate.y;
        scene.add(nodeMesh);
    }
    for(const edgeId in network.edges) {
        const edge = network.edges[edgeId];
        const endNode = network.nodes[edge.endId];
        const startNode = network.nodes[edge.startId];
        
        if (startNode && endNode) {
            const edgeGeometry = new BufferGeometry();
            const vertices = new Float32Array([
                startNode.coordinate.x, startNode.coordinate.y, 0,
                endNode.coordinate.x, endNode.coordinate.y, 0,
            ]);
            edgeGeometry.addAttribute( 'position', new BufferAttribute( vertices, 3 ) );
            
            const edgeLine = new Line( edgeGeometry, networkEdgeMaterail );
            scene.add(edgeLine);
        }
    }
    for(const buildingID in buildings) {
        const building = buildings[buildingID];
        const buildingMesh = new Mesh( buildingGeometry, buildingTypes[building.typeId].material );
        buildingMesh.position.x = building.coordinate.x;
        buildingMesh.position.y = building.coordinate.y;
        scene.add(buildingMesh);
    }
    console.log(state);
}

const animate = () => {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

load();
animate();