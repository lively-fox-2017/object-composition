"use strict"

class Cookie {
	constructor(name, ingredients) {
		this.name = name;
		this.ingredients = ingredients;
		this.status = 'mentah';
	}

	bake() {
		this.status = 'selesai dimasak';
	}
}

module.exports = Cookie;