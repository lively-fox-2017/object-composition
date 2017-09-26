'use strict'
let Cookies = require('./cookies.js')

class ChocolateChip extends Cookies{
	constructor(name, ing){
		super()
		this.ingredients = ing
		this.name = name
		this.choc_chip_count = 200
	}
}

// let tes = new ChocolateChip()
// console.log(tes.bake())
module.exports = ChocolateChip;