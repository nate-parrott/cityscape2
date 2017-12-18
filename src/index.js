
import { mountCityscape } from './frontend/cityscape.jsx'


// const snapToGrid = (vector) => {
//     vector.x = Math.round(vector.x);
//     vector.y = Math.round(vector.y);
//     return vector;
// }

// // User Interaction
// const Tool = class {
//     constructor(city) {
//         this.city = city;
//         this.rayCaster = new THREE.Raycaster();
//         this.pointerVector = new THREE.Vector3();
//     }
    
//     setPointerVector(evt) {
//         const rect = this.city.renderer.domElement.getBoundingClientRect();
//         this.pointerVector.x = (( evt.clientX - rect.left ) / rect.width ) * 2 - 1;
//         this.pointerVector.y = -(( evt.clientY - rect.top ) / rect.height ) * 2 + 1;
//     }
    
//     onInteraction(evt) {
//     }
// }

// const CreateRoadTool = class extends Tool {
//     constructor(city) {
//         super(city);
//     }
    
//     onInteraction(evt) {
//         switch(evt.type) {
//             case 'click':
//                 this.onClick(evt);
//                 break;
//             default:
//                 break;
//         }
//     }
    
//     onClick(evt) {
//         this.setPointerVector(evt);
//         this.rayCaster.setFromCamera(this.pointerVector, this.city.camera);
//         const nodeIntersects = this.rayCaster.intersectObjects(this.city.nodeMeshArray);
        
//         if(this.activeNodeMesh) {
            
//         }
        
//         if (nodeIntersects.length > 0) {
//             if(this.activeNodeMesh) {
//                 const nodeB = nodeIntersects[0].object;
//                 const newEdgeIdA = createEdge("road", this.activeNodeMesh.bindingId, nodeB.bindingId);
//                 const newEdgeIdB = createEdge("road", nodeB.bindingId, this.activeNodeMesh.bindingId);
//                 this.activeNodeMesh = undefined;
//             } else {
//                 this.activeNodeMesh = nodeIntersects[0].object; 
//             }
//         } else if(this.activeNodeMesh) {
//             const groundIntersects = this.rayCaster.ray.intersectPlane(city.groundPlane);
//             if (groundIntersects) {
//                 const newNodeId = createNode(snapToGrid(groundIntersects));
//                 const newEdgeIdA = createEdge("road", this.activeNodeMesh.bindingId, newNodeId);
//                 const newEdgeIdB = createEdge("road", newNodeId, this.activeNodeMesh.bindingId);
//                 this.activeNodeMesh = undefined;
//             }
//         }
//     }
// }

// const DisplayInfoTool = class extends Tool {
//     constructor(city) {
//         super(city);
//     }
    
//     onInteraction(evt) {
//         switch(evt.type) {
//             case 'click':
//                 this.onClick(evt);
//                 break;
//             default:
//                 break;
//         }
//     }
    
//     onClick(evt) {
//         this.setPointerVector(evt);
//         this.rayCaster.setFromCamera(this.pointerVector, this.city.camera);
//         const nodeIntersects = this.rayCaster.intersectObjects(this.city.simStateGroup.children);
        
//         if (nodeIntersects.length > 0) {
//             console.log(nodeIntersects[0].object);
//         }
        
//         console.log(this.city) // todo in lieu of actual save/load lol
//     }
// }

// city.interfaceState = {
//     activeTool: new DisplayInfoTool(city),
// }

// const toolEventDispatcher = (evt) => {
//     if (city.interfaceState.activeTool) {
//         city.interfaceState.activeTool.onInteraction(evt);
//     }
// }

// city.renderer.domElement.addEventListener( 'click', toolEventDispatcher);

// const draggableObjects = [];
// // const dragControls = new THREE.DragControls( draggableObjects, camera, renderer.domElement );
// // dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
// // dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );


// // Simulation Mutation
// const createEdge = (typeId, startId, endId) => {
//     if (typeId && startId && endId) {
//         const numEdges = Object.keys(city.simState.map.network.edges).length;
//         const id = `e${numEdges}`;
//         city.simState.map.network.edges[id] = {
//             typeId,
//             startId,
//             endId,
//         };
//         return id;
//     } else {
//         console.error(`Invalid createEdge parameters: ${typeId}, ${startId}, ${endId}`);
//     }
    
// }

// const createNode = (coordinate) => {
//     if (coordinate) {
//         const numNodes = Object.keys(city.simState.map.network.nodes).length;
//         const id =`n${numNodes}`;
//         city.simState.map.network.nodes[id] = {
//             coordinate,
//         };
//         return id;
//     } else {
//         console.error(`Invalid createNode parameters: ${coordinate}`);
//     }
// }

mountCityscape();