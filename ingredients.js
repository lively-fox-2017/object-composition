"use strict"

class Ingredients {
	constructor(opt) {
		this.name = opt.name;
		this.amount = opt.amount;
		this.has_sugar = opt.name === 'sugar';
	}
}

module.exports = Ingredients;