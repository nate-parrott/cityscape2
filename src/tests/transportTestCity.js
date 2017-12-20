import {newApartment, newWorkplace, newAgent} from '../simulation/generation.js';

export let transportTestCity = {
	map: {
		network: {
			nodes: {
				n4: {
					coordinate: {x: -10, y: 0} // building is here
				},
				n3: {
					coordinate: {x: -4, y: 0} // train stop is here
				},
				n2: {
					coordinate: {x: 4, y: 0} // embarking train stop is here
				},
				n1: {
					coordinate: {x: 10, y: 0} // start point
				},
				nt1: {
					coordinate: {x: 4, y: 0} // embarking station (connects to n2)
				},
				nt2: {
					coordinate: {x: 0, y: 2} // intermediate node on the train
				},
				nt3: {
					coordinate: {x: -4, y: 0} // ending station (connects to n3)
				},
				nt4: {
					coordinate: {x: 0, y: -2} // intermediate node
				}
			},
			edges: {
				e1: {
					typeId: 'road', startId: 'n1', endId: 'n2'
				},
				e2: {
					typeId: 'road', startId: 'n2', endId: 'n3'
				},
				e3: {
					typeId: 'road', startId: 'n3', endId: 'n4'
				},
				t1: {
					typeId: 'train', startId: 'nt1', endId: 'nt2',
				},
				t2: {
					typeId: 'train', startId: 'nt2', endId: 'nt3'
				},
				t3: {
					typeId: 'train', startId: 'nt3', endId: 'nt4'
				},
				t4: {
					typeId: 'train', startId: 'nt4', endId: 'nt1'
				},
				station1: {
					typeId: 'trainStation', startId: 'n2', endId: 'nt1'
				},
				station2: {
					typeId: 'trainStation', startId: 'nt3', endId: 'n3'
				} // in actuality, we should add nodes for getting *off* the train
			}
		},
		buildings: {
			b1: {
				...newWorkplace(),
				coordinate: {x: -10, y: 0, rotation: 0},
				edgeId: 'e3'
			}
		}
	},
	agents: {
		trains: {
			train1: {
				schedule: [{type: 'stop', nodeId: 'nt1'}, {type: 'go', edgeId: 't1'}, {type: 'go', edgeId: 't2'}, {type: 'stop', nodeId: 'nt3'}, {type: 'go', edgeId: 't3'}, {type: 'go', edgeId: 't4'}],
				state: {scheduleIndex: 0, progress: 0}
			}
		},
		people: {
			p1: {
				...newAgent(),
		    position: {
		      edgeId: 'e1',
		      distance: 0.3
		    },
				actions: [
					{actionId: 'travel', buildingId: 'b1'}
				]
			}
		}
	},
	simulation: {
		tick: 0,
		prevTick: -1
	}
}
