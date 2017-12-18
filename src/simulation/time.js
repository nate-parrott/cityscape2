import Constants from './constants.js';

export let tickToTime = (tick) => {
	let hours = tick / Constants.realSecondsPerSimulatedHour;
	let days = hours / Constants.hoursPerDay;
	let years = days / Constants.daysPerYear;
	
	let year = years | 0;
	let day = days % Constants.daysPerYear  | 0;
	let hour = hours % (Constants.hoursPerDay) | 0;
	let minute = ((hours - Math.floor(hours)) * 60) | 0;
	
	let startingYear = 2000;
	year += startingYear;
	return {year, day, hour, minute};
}

export let formatTickAsTime = (tick) => {
	let {year, day, hour, minute} = tickToTime(tick);
	return `${hour}:${minute} on day ${day+1}, year ${year}`;
}

