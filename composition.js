"use strict"

const fs = require("fs");

class Ingredient {
	constructor(options){
		this.name = options["name"];
		this.amount = options["amount"];
		this.has_sugar = this.sugarCek(options["name"]);
	}
	
	sugarCek(name){
		if(name === "sugar"){
			return true;
		}else{
			return false;
		}
	}
}

class Cookie {
	constructor(name, ingredients){
		// this.status = "mentah";
		this.name = name;
		this.status = "mentah";
		this.ingredients = ingredients;
		// this.peanut_count = 100;
	}
	
	pecahIngredients(){
		let bahan = this.ingredients.split(",");
		let arr = [];
		for(let i = 0; i < bahan.length; i++){
			let detailBahan = bahan[i].split(":");
			let obj = {
				name : detailBahan[1],
				amount : detailBahan[0],
			}
			
			let ingredient = new Ingredient(obj);
			arr.push({name: ingredient.name, amount: ingredient.amount, has_sugar: ingredient.has_sugar});
		}
		
		this.ingredients = arr;
		
		return this.ingredients;
	}
	
	// bake(){
		// this.status = "selesai dimasak";
	// }
}

class PeanutButter {
	constructor(name, status, ingredients){
		this.name = name;
		this.status = status;
		this.ingredients = ingredients;
		this.peanut_count = 100;
	}
}

class ChocholateChip {
	constructor(name, status, ingredients){
		this.name = name;
		this.status = status;
		this.ingredients = ingredients;
		this.peanut_count = 200;
	}
}

class OtherCookie {
	constructor(name, status, ingredients){
		this.name = name;
		this.status = status;
		this.ingredients = ingredients;
		this.peanut_count = 150;
	}
}

// let options = fs.readFileSync("cookies.txt").toString().split("\r\n");
let options = fs.readFileSync("ingredients.txt").toString().split("\r\n");

class CookieFactory {
	static create(cookies){
		let arr = [];
		for (let i = 0; i < cookies.length; i++) {
			let namaKue = cookies[i].split("=");
			let cookie = new Cookie(namaKue[0], namaKue[1]);
			cookie.pecahIngredients();
			if (namaKue[0] === "peanut butter"){
				let peanutbutter = new PeanutButter(cookie.name, cookie.status, cookie.ingredients);
				arr.push(peanutbutter);
			} else if (namaKue[0] === "chocolate chip") {
				let chocolatechip = new ChocholateChip(cookie.name, cookie.status, cookie.ingredients);
				arr.push(chocolatechip);
			} else {
				let othercookie = new OtherCookie(cookie.name, cookie.status, cookie.ingredients);
				arr.push(othercookie);
			}
		}
		
		return arr;
	}
	
	static cookieRecommendation(option){
		let arr2 = [];
		for (let i = 0; i < option.length; i++){
			let ingredients = option[i].ingredients;	
			for (let j = 0; j < ingredients.length; j++){
				let detailIngredients = ingredients[j];
				if(detailIngredients.has_sugar){
					break;
				}else if (!detailIngredients.has_sugar && j === ingredients.length-1){
					arr2.push(option[i]);
				}
			}
		}
		
		return arr2;
	}
}

let batch_of_cookies = CookieFactory.create(options);
// console.log(require('util').inspect(batch_of_cookies,{
	// depth:null
// }));

let sugarFreeFoods = CookieFactory.cookieRecommendation(batch_of_cookies);

console.log("Sugar free cakes are : ");
for (let i = 0; i < sugarFreeFoods.length; i++){
	console.log((i+1)+". "+sugarFreeFoods[i].name);
}