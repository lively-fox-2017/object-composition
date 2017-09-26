'use strict'
let PeanutButter = require('./PeanutButter')
let ChocolateChip = require('./ChocolateChip')
let Cookies = require('./cookies.js')
let OtherCookies = require('./OtherCookies.js')
let Ingredient = require('./Ingredients.js')

// class Ingredient{
// 	constructor(options){
// 		this.name = options['name']
// 		this.amount = options['amount']
// 		this.has_sugar = options['has_sugar']
// 	}
// }


class CookieFactory{
	static create(options){
		let option = options.split('\n')
		let optionArr = []
		for(var i = 0; i < option.length; i++){
			optionArr.push(option[i].split('='))
		}
			// console.log(optionArr)


		let tampung = []
		for(var i = 0; i < optionArr.length; i++){
			// console.log(optionArr[1][0])
			let split = optionArr[i][1].split(',')
			
			let ingredient = []
			for(var j = 0; j < split.length; j++){
				ingredient.push(split[j].trim().split(':'))
				// console.log(ingredient)
			}

			// console.log(ingredient[1])

			let all_ingredient = []
			if(optionArr[i][0].trim() === 'peanut butter'){
				for(var l = 0; l < ingredient.length; l++){
					// console.log(optionArr[l][0])
					let status_sugar = true
					if(ingredient[l][1].trim() === 'sugar'){
						status_sugar = true
					}else{
						status_sugar = false
					}

					all_ingredient.push(new Ingredient({
						name : ingredient[l][1],
						amount : ingredient[l][0],
						has_sugar : status_sugar

					}))

				}

				tampung.push(new PeanutButter(optionArr[i][0], all_ingredient))
				// console.log(tampung[0])
			}
			else if(optionArr[i][0].trim() === 'chocolate cheese'){
				for(var l = 0; l < ingredient.length; l++){
					// console.log(optionArr[l][0])
					let status_sugar = true
					if(ingredient[l][1].trim() === 'sugar'){
						status_sugar = true
					}else{
						status_sugar = false
					}

					all_ingredient.push(new Ingredient({
						name : ingredient[l][1],
						amount : ingredient[l][0],
						has_sugar : status_sugar

					}))

				}

				tampung.push(new ChocolateChip(optionArr[i][0], all_ingredient))

			}else{
				for(var l = 0; l < ingredient.length; l++){
					// console.log(optionArr[l][0])
					let status_sugar = true
					if(ingredient[l][1].trim() === 'sugar'){
						status_sugar = true
					}else{
						status_sugar = false
					}

					all_ingredient.push(new Ingredient({
						name : ingredient[l][1],
						amount : ingredient[l][0],
						has_sugar : status_sugar

					}))

				}

				tampung.push(new OtherCookies(optionArr[i][0], all_ingredient))

			}
		}
		
		return tampung
		
		
		
	}

	static read(file){
		let fs = require('fs')
		let konten = fs.readFileSync(file, 'utf8')
		return konten.toString()
	}

	static create2(cookies){
		// console.log(cookies)
		let cookie = cookies.split('\n')

		let cookieArr = []
		for(var i = 1; i < cookie.length; i+=2){
			cookieArr.push(cookie[i])
		}

		// console.log(cookieArr)
		let array = []
		for(var i = 0; i < cookieArr.length; i++){
			array.push(cookieArr[i].split(','))
		}
		// console.log(array)
		// console.log(array)
		let arrBaru = []
		for(var i = 0; i < array.length; i++){
			// console.log(array[i])
			let tampung = []

			for(var j = 0; j < array[i].length; j++){
				let char = array[i][j].split(':')
				// console.log(array[i][j])
				arrBaru.push(char)
			}
			
		}

		

		let arrObj = []
		// for(var i = 0; i < arrBaru.length; i++){
		// 			arrObj.push(new Ingredient({
		// 			name:arrBaru[i][1],
		// 			amount:arrBaru[i][0],
		// 			has_sugar:arrBaru[i][1] === ' sugar' ? true : false
		// 		}))
		// 	// }
		// }

		let data = []
		for(var i = 0; i < cookie.length; i+=2 ){
				

			if(cookie[i].trim() === 'peanut butter'){

				data.push(new PeanutButter(cookie[i]))
			}else if(cookie[i].trim() === 'chocolate chip'){
				data.push(new ChocolateChip(cookie[i]))
			}else{
				data.push(new OtherCookies(cookie[i]))
			}
		}
		// console.log(arrObj)
		return data
		// console.log(arrObj)
		// for(var i = 0; i < )

	}


 static cookieRecommendation(day, batch){
 	
 	let cookie = []
 	for(var i = 0; i < batch.length; i++){
 		let flag = false
 		for(var j = 0; j < batch[i].ingredients.length; j++){
 			// console.log(batch[i].ingredients[j].has_sugar)
 			if(batch[i].ingredients[j].has_sugar){
 				flag = true

 			}
		}
 		// flag = false
 		if(!flag){
 				// console.log(batch[i])
 				cookie.push(batch[i])
 			}
 		// return cookie
 	}
 	return cookie
// 
 }
	// 
}



// module.exports = peanutButter, chocolateChip, cookies
// let read_of_cookies = CookieFactory.read('cookies.txt')
let batch_of_cookies = CookieFactory.create(CookieFactory.read('cookies.txt'))
let sugarFreeFood = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
// console.log(batch_of_cookies[0].ingredients[0].has_sugar)
console.log(sugarFreeFood)
// let tes = CookieFactory.tesIngred()

