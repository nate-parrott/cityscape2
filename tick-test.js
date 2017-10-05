let fs = require('fs');
let tick = require('./tick');

let city = JSON.parse(fs.readFileSync('city2.json'));
console.log(tick(city))
