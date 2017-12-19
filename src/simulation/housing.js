import { pickN } from '../lib/utils.js';

let searchForHousing = (buildings, person) => {
  // returns the ID of the new apartment, or null
  let apartmentsWithVacancies = buildings.filter((b) => {
    return b.typeId === 'home' && b.occupants.length < b.occupancy;
  });
  let choices = pickN(apartmentsWithVacancies, 10);
  if (choices.length === 0) return null;
  choices.sort((a,b) => a.niceness - b.niceness);
  
};
