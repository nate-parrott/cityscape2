import { testTicking } from './tests';
import { defaultCity } from './city.js';
import { tick } from './tick.js';

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
const networkColor = 0x6F7A90;
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

// Initialize Scene
const city = {
    scene: new THREE.Scene(),
}
city.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
city.camera.up.set( 0, 0, 1 );
city.camera.position.z = 5;
city.controls = new THREE.OrbitControls( city.camera );

city.renderer = new WebGLRenderer({
    antialias: true,
});
city.renderer.setSize( window.innerWidth, window.innerHeight );
city.renderer.setClearColor( backgroundColor, 1 );
document.body.appendChild( city.renderer.domElement );

window.onresize = function () {
	city.camera.aspect = window.innerWidth / window.innerHeight;
	city.camera.updateProjectionMatrix();
	city.renderer.setSize( window.innerWidth, window.innerHeight );
};

const groundPlane = new THREE.PlaneBufferGeometry( 100, 100 );
city.groundPlaneMesh = new THREE.Mesh( groundPlane, groundMaterial );
city.groundPlaneMesh.position.z = -0.01;
city.scene.add( city.groundPlaneMesh );

city.groundPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1));

const grid = new GridHelper( 100, 100 );
grid.rotation.x = Math.PI / 2;
grid.position.x = -0.5;
grid.position.y = -0.5;
grid.position.z = 0;
city.scene.add(grid);

const snapToGrid = (vector) => {
    vector.x = Math.round(vector.x);
    vector.y = Math.round(vector.y);
    return vector;
}

city.simStateGroup = new THREE.Group();
city.scene.add(city.simStateGroup);

city.interfaceStateGroup = new THREE.Group();
city.scene.add(city.interfaceStateGroup);

// load the city json:
city.simState = defaultCity;
let timePerTick = 0.5 / 60;

// User Interaction
const Tool = class {
    constructor(city) {
        this.city = city;
        this.rayCaster = new THREE.Raycaster();
        this.pointerVector = new THREE.Vector3();
    }
    
    setPointerVector(evt) {
        console.log(this.city);
        const rect = this.city.renderer.domElement.getBoundingClientRect();
        this.pointerVector.x = (( evt.clientX - rect.left ) / rect.width ) * 2 - 1;
        this.pointerVector.y = -(( evt.clientY - rect.top ) / rect.height ) * 2 + 1;
    }
    
    onInteraction(evt) {
    }
}

const CreateRoadTool = class extends Tool {
    constructor(city) {
        super(city);
    }
    
    onInteraction(evt) {
        switch(evt.type) {
            case 'click':
                this.onClick(evt);
                break;
            default:
                break;
        }
    }
    
    onClick(evt) {
        this.setPointerVector(evt);
        this.rayCaster.setFromCamera(this.pointerVector, this.city.camera);
        const nodeIntersects = this.rayCaster.intersectObjects(this.city.nodeMeshArray);
        
        if(this.activeNodeMesh) {
            
        }
        
        if (nodeIntersects.length > 0) {
            if(this.activeNodeMesh) {
                const nodeB = nodeIntersects[0].object;
                const newEdgeIdA = createEdge("road", this.activeNodeMesh.bindingId, nodeB.bindingId);
                const newEdgeIdB = createEdge("road", nodeB.bindingId, this.activeNodeMesh.bindingId);
                this.activeNodeMesh = undefined;
            } else {
                this.activeNodeMesh = nodeIntersects[0].object; 
            }
        } else if(this.activeNodeMesh) {
            const groundIntersects = this.rayCaster.ray.intersectPlane(city.groundPlane);
            if (groundIntersects) {
                const newNodeId = createNode(snapToGrid(groundIntersects));
                const newEdgeIdA = createEdge("road", this.activeNodeMesh.bindingId, newNodeId);
                const newEdgeIdB = createEdge("road", newNodeId, this.activeNodeMesh.bindingId);
                this.activeNodeMesh = undefined;
            }
        }
        
        console.log(this.city.simState); // TODO in lieu of real save/loading lol
    }
}

city.interfaceState = {
    activeTool: new CreateRoadTool(city),
}

const toolEventDispatcher = (evt) => {
    if (city.interfaceState.activeTool) {
        city.interfaceState.activeTool.onInteraction(evt);
    }
}

city.renderer.domElement.addEventListener( 'click', toolEventDispatcher);

const draggableObjects = [];
// const dragControls = new THREE.DragControls( draggableObjects, camera, renderer.domElement );
// dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
// dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );


// Simulation Mutation
const createEdge = (typeId, startId, endId) => {
    if (typeId && startId && endId) {
        const numEdges = Object.keys(city.simState.map.network.edges).length;
        const id = `e${numEdges}`;
        city.simState.map.network.edges[id] = {
            typeId,
            startId,
            endId,
        };
        return id;
    } else {
        console.error(`Invalid createEdge parameters: ${typeId}, ${startId}, ${endId}`);
    }
    
}

const createNode = (coordinate) => {
    if (coordinate) {
        const numNodes = Object.keys(city.simState.map.network.nodes).length;
        const id =`n${numNodes}`;
        city.simState.map.network.nodes[id] = {
            coordinate,
        };
        return id;
    } else {
        console.error(`Invalid createNode parameters: ${coordinate}`);
    }
}

// Draw Loop
const lerpCoordinates = ( coordinateA, coordinateB, progress ) => {
    return {
        x: coordinateA.x + (coordinateB.x - coordinateA.x) * progress,
        y: coordinateA.y + (coordinateB.y - coordinateA.y) * progress,
    }
}

city.simStateMeshcache = new Map();

const drawState = (state) => {
  // clear the old group state:
  while (city.simStateGroup.children.length > 0) {
    // city.simStateGroup.remove(city.simStateGroup.children[0]);
    // draggableObjects.length = 0;
    // TODO remove deleted nodes
  }
    const network = state.map.network;
    const buildings = state.map.buildings;
    const people = state.agents.people;
    city.nodeMeshArray = [];
    for(const nodeID in network.nodes) {
        const node = network.nodes[nodeID];
        const nodeMesh = city.simStateMeshcache.has(nodeID) 
            ? city.simStateMeshcache.get(nodeID) 
            : city.simStateMeshcache.set(
                nodeID, new Mesh( networkNodeGeometry, networkNodeMaterial )
            ).get(nodeID);
        nodeMesh.position.x = node.coordinate.x;
        nodeMesh.position.y = node.coordinate.y;
        nodeMesh.bindingId = nodeID;
        city.simStateGroup.add(nodeMesh);
        city.nodeMeshArray.push(nodeMesh);
    }
    city.edgeMeshArray = [];
    for(const edgeId in network.edges) {
        const edge = network.edges[edgeId];
        const endNode = network.nodes[edge.endId];
        const startNode = network.nodes[edge.startId];
        if (city.simStateMeshcache.has(edgeId)) {
            city.simStateGroup.remove(city.simStateMeshcache.get(edgeId));
        }
        if (startNode && endNode) {
            const edgeLine = city.simStateMeshcache.set(
                edgeId, new LineMesh( [[startNode.coordinate.x, startNode.coordinate.y], [endNode.coordinate.x, endNode.coordinate.y]] )
            ).get(edgeId);
            edgeLine.bindingId = edgeId;
            city.simStateGroup.add(new THREE.Mesh(edgeLine, networkEdgeMaterial));
            city.edgeMeshArray.push(edgeLine);
        }
    }
    city.buildingMeshArray = [];
    for(const buildingID in buildings) {
        const building = buildings[buildingID];
        const buildingMesh = city.simStateMeshcache.has(buildingID) 
            ? city.simStateMeshcache.get(buildingID) 
            : city.simStateMeshcache.set(
                buildingID, new Mesh( buildingGeometry, buildingTypes[building.typeId].material )
            ).get(buildingID);
        buildingMesh.position.x = building.coordinate.x;
        buildingMesh.position.y = building.coordinate.y;
        buildingMesh.rotateZ(building.coordinate.rotation);
        buildingMesh.scale.x = building.dimension.x;
        buildingMesh.scale.y = building.dimension.y;
        buildingMesh.scale.z = building.dimension.z;
        buildingMesh.bindingId = buildingID;
        city.simStateGroup.add(buildingMesh);
        city.buildingMeshArray.push(buildingMesh);
    }
    city.personMeshArray = [];
    for(const personID in people) {
        const person = people[personID];
        const edge = network.edges[person.position.edgeId];
        const endNode = network.nodes[edge.endId];
        const startNode = network.nodes[edge.startId];
        const coordinate = lerpCoordinates(startNode.coordinate, endNode.coordinate, person.position.distance);
        const personMesh = city.simStateMeshcache.has(personID) 
            ? city.simStateMeshcache.get(personID) 
            : city.simStateMeshcache.set(
                personID, new Mesh( personGeometry, personMaterial )
            ).get(personID);
        personMesh.position.x = coordinate.x;
        personMesh.position.y = coordinate.y;
        personMesh.bindingId = personID;
        city.simStateGroup.add(personMesh);
        city.personMeshArray.push(personMesh);
    }
}

// Simulation Code

const animate = () => {
  city.simState = tick(city.simState, timePerTick);
  drawState(city.simState);
	requestAnimationFrame( animate );
	city.renderer.render( city.scene, city.camera );
}

animate();