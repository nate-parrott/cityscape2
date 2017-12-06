import Constants from './constants.js';
let { minDailyWage, maxDailyWage, lifespanYears } = Constants;
import { generateId } from './utils.js';

let jobs = {
  service_employee: {title: 'Service Employee', skills: {people: [0.4, 0.6], physical: [0.1, 0.4]}},
  service_manager: {title: 'Service Manager', skills: {people: [0.4, 0.9], physical: [0.2, 0.4], language: [0.1, 0.6]}},
  cleaner: {title: 'Cleaner', skills: {people: [0, 0.3], physical: [0.3, 0.9]}},
  designer: {title: 'Designer', skills: {people: [0.3, 0.8], stem: [0.3, 0.8], language: [0.3, 0.8], arts: [0.6, 1.0]}},
  engineer: {title: 'Engineer', skills: {people: [0.1, 0.6], stem: [0.6, 1.0], language: [0.2, 0.5], arts: [0, 0.2]}}
}

let randomizeSkills = (skills) => {
  let vals = {};
  for (let key of Object.keys(skills)) {
    let range = skills[key];
    vals[key] = range[0] + (range[1] - range[0]) * Math.random();
  }
  return vals;
}

let generateJob = (id) => {
  let {title, skills} = jobs[id];
  let salary = minDailyWage + (maxDailyWage - minDailyWage) * Math.random();
  return {title, skills: randomizeSkills(skills), salary, personId: null};
}

export let newApartment = () => {
  return {
    typeId: 'home',
    occupancy: 1,
    occupants: [],
    rent: 1,
    dimension: {x: 1, y: 0.75, z: 1},
    coordinate: null,
    edgeId: null
  }
}

export let newWorkplace = () => {
  return {
    typeId: 'work',
    dimension: {x: 1, y: 1, z: 2},
    name: 'K-Mart',
    jobs: {j1: generateJob('service_employee'), j2: generateJob('service_employee'), j3: generateJob('service_employee'), j4: generateJob('service_manager')},
    coordinate: null,
    edgeId: null
  }
}

export let newAgent = (ageFraction) => {
  let age = (ageFraction * lifespanYears) | 0;
  return {
    workplaceId: null,
    jobId: null,
    homeId: null,
    ageYears: age,
    wealth: 5,
		name: 'Test Name',
    position: {
      edgeId: "e000",
      distance: 0.3
    },
    actions: []
  }
}



//
// "workplaceId": "b000",
// "homeId": "b001",
// "position": {
//   "edgeId": "e000",
//   "distance": 0.3
// },
// "actions": [
//   {"actionId": "travel", "buildingId": "b000"},
//   {"actionId": "travel", "buildingId": "b001"},
//   {"actionId": "travel", "buildingId": "b000"},
//   {"actionId": "travel", "buildingId": "b001"},
//   {"actionId": "travel", "buildingId": "b000"},
//   {"actionId": "travel", "buildingId": "b001"},
//   {"actionId": "travel", "buildingId": "b000"},
//   {"actionId": "travel", "buildingId": "b001"},
//   {"actionId": "travel", "buildingId": "b000"},
//   {"actionId": "travel", "buildingId": "b001"}
// ]



//
//   "typeId": "work",
//   "coordinate": {
//     "x": -5,
//     "y": -0.5,
//     "rotation": Math.PI
//   },
//   "dimension": {
//     "x": 1.0,
//     "y": 1.0,
//     "z": 2.0
//   },
//   "edgeId": "e000"
// },




