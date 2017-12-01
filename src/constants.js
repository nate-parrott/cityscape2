let percent = 0.01;

// generastion parameters are stored in generation.js
let Constants = {
  // time:
  realSecondsPerSimulatedHour: 5,
  hoursPerDay: 24,
  daysPerYear: 2,
  morningHours: [6, 12],
  // distance:
  walkingSpeedUnitsPerHour: 10,
  // people:
  lifespanYears: 80,
  schoolUntilAge: 20,
  workUntilAge: 65,
  // needs:
  restReplenishmentPerHourSleeping: 12.5 * percent,
  restDepletionPerHour: 6 * percent,
  funDepletionPerHour: 2 * percent,
  basicProductsDepletionPerHour: 3 * percent,
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
  rentHikeForFilledApartments: 0.2,
  rentDropForEmptyApartments: 0.2,
  maxHousingCostAsFractionOfIncome: 0.5
}
export default Constants;
