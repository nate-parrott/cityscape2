import Constants from './constants.js';

const localeDateStringOptions = {
	// weekday: 'long', 
	year: 'numeric', 
	month: 'numeric', 
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
}

export let tickToTime = (tick) => {
	const hours = tick / Constants.realSecondsPerSimulatedHour;
	const days = hours / Constants.hoursPerDay;
	const years = days / Constants.daysPerYear;
	
	let year = years | 0;
	const day = days % Constants.daysPerYear  | 0;
	const hour = hours % (Constants.hoursPerDay) | 0;
	const minute = ((hours - Math.floor(hours)) * 60) | 0;
	
	const startingYear = 2000;
	year += startingYear;
	return {year, day, hour, minute};
}

export const tickToJSDate = (tick) => {
	let {year, day, hour, minute} = tickToTime(tick);
	return new Date(year, 0, day + 1, hour, minute, 0);
}

export const tickToLocaleDateString = (tick) => {
	return tickToJSDate(tick).toLocaleDateString(undefined,localeDateStringOptions)
}