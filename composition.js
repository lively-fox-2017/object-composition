"use strict"
const fs = require('fs');
const CookieFactory = require('./cookieFactory.js');

const read = (file) => fs.readFileSync(file).toString().split('\n');
const options = read('cookies.txt');
const recipees = read('ingredients.txt')
					.map(val => val.split(' = '))
					.reduce((object, ing) => {
						let ingredient = ing[1]
										.split(', ')
										.map(val => {
											val = val.split(' : ');
											return {
												name: val[1],
												amount: val[0]
											}
										});

						object[ing[0]] = ingredient;
						return object;
					}, {});

// driver code

let batch_of_cookies = CookieFactory.create(options, recipees);
let sugarFreeCookies = CookieFactory.noSugarCookie(batch_of_cookies);

// print all cookie(s)
console.log(JSON.stringify(batch_of_cookies, null, 4));

// print all cookie(s) without sugar
console.log(JSON.stringify(sugarFreeCookies, null, 4));










