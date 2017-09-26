'use strict'

class Ingredient{
	constructor(options){
		this.name = options['name']
		this.amount = options['amount']
		this.has_sugar = options['has_sugar']
	}
}

module.exports = Ingredient;