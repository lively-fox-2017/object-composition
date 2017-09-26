'use strict'

let Cookies = require('./cookies.js')

class PeanutButter extends Cookies{
	constructor(name, ing){
		super()
		this.ingredients = ing
		this.name = name
		this.peanut_count = 100
	}
}

// let peanutButter = new PeanutButter()

// console.log(peanutButter.bake())
module.exports = PeanutButter;