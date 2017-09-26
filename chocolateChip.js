"use strict"
const Cookie = require('./cookie.js');

class ChocolateChip extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients)
		this.choc_chip_count = 200;
	}
}

module.exports = ChocolateChip;