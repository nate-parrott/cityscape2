import { testRouting } from './tests';

testRouting();

import { 
    WebGLRenderer, 
    Mesh,
    Line,
    GridHelper,
} from 'three';
import * as THREE from 'three';
self.THREE = THREE;
require("three/examples/js/controls/OrbitControls");

const backgroundColor = 0xffffff;
const networkColor = 0x6F7A90;
const residentialColor = 0xB3D28A;
const commercialColor = 0xADD1FC;
const personColor = 0xB5A8BA;

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

const networkNodeGeometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
const buildingGeometry = new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 );
const personGeometry = new THREE.DodecahedronBufferGeometry( 0.1, 0 );

const commercialBuildingMaterial = new THREE.MeshBasicMaterial( { color: commercialColor } );
const residentialBuildingMaterial = new THREE.MeshBasicMaterial( { color: residentialColor } );
const networkNodeMaterial = new THREE.MeshBasicMaterial( { color: networkColor } );
const networkEdgeMaterial = new THREE.LineBasicMaterial({ color: networkColor });
const personMaterial = new THREE.MeshBasicMaterial({ color: personColor });

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

const lerpCoordinates = ( coordinateA, coordinateB, progress ) => {
    return {
        x: coordinateA.x + (coordinateB.x - coordinateA.x) * progress,
        y: coordinateA.y + (coordinateB.y - coordinateA.y) * progress,
    }
}

const drawState = (state) => {
    const network = state.map.network;
    const buildings = state.map.buildings;
    const people = state.agents.people;
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
            const edgeGeometry = new THREE.BufferGeometry();
            const vertices = new Float32Array([
                startNode.coordinate.x, startNode.coordinate.y, 0,
                endNode.coordinate.x, endNode.coordinate.y, 0,
            ]);
            edgeGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
            
            const edgeLine = new Line( edgeGeometry, networkEdgeMaterial );
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
    for(const personID in people) {
        const person = people[personID];
        const edge = network.edges[person.position.edgeId];
        const endNode = network.nodes[edge.endId];
        const startNode = network.nodes[edge.startId];
        
        const coordinate = lerpCoordinates(startNode.coordinate, endNode.coordinate, person.position.distance);
        
        const personMesh = new Mesh( personGeometry, personMaterial );
        personMesh.position.x = coordinate.x;
        personMesh.position.y = coordinate.y;
        
        scene.add(personMesh);
    }
    console.log(state);
}

const animate = () => {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

load();
animate();