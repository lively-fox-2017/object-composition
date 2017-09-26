'use strict'
let Cookies = require('./cookies.js')

class OtherCookies extends Cookies{
	constructor(name, ing){
		super()
		this.ingredients = ing
		this.name = name
		this.other_count = 150
	}
}

// let tes = new ChocolateChip()
// console.log(tes.bake())
module.exports = OtherCookies;