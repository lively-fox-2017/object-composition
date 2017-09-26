"use strict"
let fs = require('fs')

class Ingredient {
	constructor(options) {
		this.name = options['name']
		this.amount = options['amount']
	}
}
class Cookie{
	constructor(name,arr_composition) {
		this.name = name
		this.status = "mentah"
		this.ingredient = this.createIngredient(arr_composition)
		this.has_sugar = this.hasSugar(this.ingredient)
	}
	createIngredient(arr_composition) {
		let arr_ingredient = []
		for(let i = 0;i < arr_composition.length;i++){
			let arr = arr_composition[i].split(':')
			let obj = {}
			obj['name'] = arr[1]
			obj['amount'] = arr[0]
			let objIngredient = new Ingredient(obj)
			arr_ingredient.push(objIngredient)
		}
		return arr_ingredient
	}
	hasSugar(arr) {
		for(let i = 0;i < arr.length;i++){
			if(arr[i].name.indexOf('sugar') != -1){
				return true
			}
		}
		return false
	}
	bake() {
		this.status = "selesai dimasak"
	}
}
class PeanutButter extends Cookie{
	constructor(name,arr_composition) {
		super(name,arr_composition)
		this.peanut_count = 100
	}
}
class ChocolateChip extends Cookie{
	constructor(name,arr_composition) {
		super(name,arr_composition)
		this.choc_chip_count = 200
	}
}
class OtherCookie extends Cookie{
	constructor(name,arr_composition) {
		super(name,arr_composition)
		this.other_count = 150
	}
}

class CookieFactory{
	static create(options,ingredient){
		let menu = []
		for(let i = 0;i < options.length;i++){
			switch (options[i]){
				case 'peanut butter':
					for(let j = 0;j < ingredient.length;j++){
						if(ingredient[j][0] == options[i]){
							let arr_composition = ingredient[j][1].split(',')
							let peanut = new PeanutButter(options[i],arr_composition)
							menu.push(peanut)
						}
					}
				break;
				case 'chocolate chip':
					for(let j = 0;j < ingredient.length;j++){
						if(ingredient[j][0] == options[i]){
							let arr_composition = ingredient[j][1].split(',')
							let chocolate = new ChocolateChip(options[i],arr_composition)
							menu.push(chocolate)
						}
					}
				break;
				case 'chocolate chesse':
					for(let j = 0;j < ingredient.length;j++){
						if(ingredient[j][0] == options[i]){
							let arr_composition = ingredient[j][1].split(',')
							let cocho_chese = new OtherCookie(options[i],arr_composition)
							menu.push(cocho_chese)
						}
					}
				break;
				case 'chocolate butter':
				for(let j = 0;j < ingredient.length;j++){
					if(ingredient[j][0] == options[i]){
						let arr_composition = ingredient[j][1].split(',')
						let cocho_butter = new OtherCookie(options[i],arr_composition)
						menu.push(cocho_butter)
					}
				}
				break;
			}
		}
		return menu
	}
	static cookieRecommendation(day, batch_of_cookies){
		let cookie = []
		if(day == 'tuesday'){
			for(let i = 0;i < batch_of_cookies.length;i++){
				if(batch_of_cookies[i].has_sugar == false){
					cookie.push(batch_of_cookies[i])
				}
			}
		}
		return cookie
	}
}

let list_options = fs.readFileSync('cookies.txt', 'utf-8')
let list_ingredient = fs.readFileSync('ingredient.txt', 'utf-8')
let options = list_options.split('\n')
let temp_ingredient = list_ingredient.split('\n')
let ingredient = []
for(let i = 0;i < temp_ingredient.length;i++){
	let list_ingredient = temp_ingredient[i].split('=')
	ingredient.push(list_ingredient)
}
let batch_of_cookies = CookieFactory.create(options,ingredient)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log("sugar free cakes area : ");
for(let i = 0; i < sugarFreeFoods.length; i++){
	console.log(sugarFreeFoods[i].name)
}