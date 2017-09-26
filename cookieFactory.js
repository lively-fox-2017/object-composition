"use strict"
const Ingredients = require('./ingredients.js');
const PeanutButter = require('./peanutButter.js');
const ChocolateChip = require('./chocolateChip.js');
const OtherCookie = require('./otherCookie.js');

class CookieFactory {
	static create(options, recipees) {
		return options.map(cookie => {
			let recipee = [];
			recipees[cookie].forEach(ing => {
				recipee.push(new Ingredients(ing));
			});
			if (cookie === 'peanut butter') {
				return new PeanutButter(cookie, recipee);
			}
			else if (cookie === 'chocolate chip')  {
				return new ChocolateChip(cookie, recipee);
			}
			else if (cookie === 'chocolate cheese') {
				return new OtherCookie(cookie, recipee);
			}
			else if (cookie === 'chocolate butter') {
				return new OtherCookie(cookie, recipee);
			}
		});
	}

	static noSugarCookie(batch_of_cookies) {
		return batch_of_cookies.filter(cookie => {
			return cookie.ingredients.every(ing => ing.has_sugar === false);
		});
	}
}

module.exports = CookieFactory;