let percent = 0.01;

// generastion parameters are stored in generation.js
let Constants = {
    simSpeedup: 5,
    // time:
    realSecondsPerSimulatedHour: 5, // each 'tick' is 1 second
    hoursPerDay: 24,
    daysPerYear: 2,
    morningHours: [6, 12],
    // distance:
    walkingSpeedUnitsPerHour: 10,
    trainSpeedUnitsPerHour: 50,
		trainStopHours: 0.2, // 1 second
    // people:
    lifespanYears: 80,
    schoolUntilAge: 20, // unimplemented
    workUntilAge: 65, // unimplemented
    // needs:
    restReplenishmentPerHourSleeping: 12.5 * percent,
    restDepletionPerHour: 5 * percent,
    funDepletionPerHour: 2 * percent,
    basicProductsDepletionPerHour: 3 * percent, // unimplemented
    // durations:
    workDuration: 8,
    sleepMaxDuration: 8,
    wakeupTime: 8,
    // store:
    basicNeedsPurchaseTime: 1,
    basicNeedsCost: 1,
    // jobs:
    findNewJobEveryNYears: 5,
    minDailyWage: 2,
    maxDailyWage: 10,
    salaryDropForFilledPositions: 0.2,
    salaryRaiseForEmptyPositions: 0.2,
    // housing:
    minDailyRent: 0.6,
    maxDailyRent: 5,
    rentHikeForFilledApartments: 0.2, // unimplemented right now
    rentDropForEmptyApartments: 0.2, // unimplemented right now
    maxHousingCostAsFractionOfIncome: 0.5,
    // decision making: 
    restThresholdToSleepOnStreet: 0.1,
    restThresholdToSleepAtHome: 0.3,
    wakeupHour: 8,
    maxSleepTime: 8,
}
export default Constants;
export let ticksPerYear = Constants.realSecondsPerSimulatedHour * Constants.hoursPerDay * Constants.daysPerYear;
