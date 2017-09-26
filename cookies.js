'use strict'

class Cookie{
	constructor(ingredients){
		this.ingredients = ingredients
		this.status = 'mentah'
		// this.ingredients = []
	}

	bake(){
		return this.status = 'selesai masak' 
	}

}

module.exports = Cookie;