'use strict'

const util = require('util');
const fs   = require('fs');

const CookieFactory = require('./cookie-factory.js');

const readFile = fs.readFileSync('cookies.txt').toString().split('\n');

let batchOfCookies = CookieFactory.create(readFile);
console.log(batchOfCookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation(batchOfCookies);

console.log('Sugar free cakes are:');
for (let i = 0; i < sugarFreeFoods.length; i++) {

  console.log(sugarFreeFoods[i].name);

}