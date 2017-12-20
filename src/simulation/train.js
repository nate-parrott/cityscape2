import Constants from './constants.js';
const { realSecondsPerSimulatedHour, trainStopHours, trainSpeedUnitsPerHour } = Constants;

export default class Train {
	constructor(id, city) {
		this.id = id;
		this.city = city;
		this.json = city.agents.trains[id];
	}
	tick(time) {
		let hours = time / realSecondsPerSimulatedHour;
		let {state, schedule} = this.json;
		let i = 0;
		let stopsMade = [];
		while (hours > 0) {
			let curSched = schedule[state.scheduleIndex];
			if (curSched.type === 'stop') {
				let remainingHours = (1 - state.progress) * trainStopHours;
				let consume = Math.min(remainingHours, hours);
				state.progress += consume / trainStopHours;
				hours -= consume;
				stopsMade.push(curSched.nodeId);
			} else if (curSched.type === 'go') {
				let dist = this.city.network.edgeLength(curSched.edgeId);
				let edgeHours = dist / trainSpeedUnitsPerHour;
				let remainingHours = (1 - state.progress) * edgeHours;
				let consume = Math.min(remainingHours, hours);
				state.progress += consume / edgeHours;
				hours -= consume;
			}
			if (state.progress >= 1) {
				state.progress = 0;
				state.scheduleIndex = (state.scheduleIndex + 1) % schedule.length;
			}
			if (i++ > 100) fail();
		}
		this.json.stopsDuringPrevTick = stopsMade;
	}
}
