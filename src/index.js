
import { mountCityscape } from './frontend/cityscape.jsx'

// // User Interaction

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

mountCityscape();