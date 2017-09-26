"use strict"

const fs = require('fs');
let option = fs.readFileSync('cookies.txt','utf8').split('\n')
//console.log(option)

class Cookie {
  constructor(name,ingredients) {
    this.name = name
    this.status = "mentah"
    this.ingredients = ingredients
  }

  bake() {
    this.status = "selesai dimasak"
  }

  checkSugar(ingredients) {
    // console.log(ingredients);
    for(let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].has_sugar == true) {
        return true
      }
    }
    return false
  }

}

class PeanutButter extends Cookie {
  constructor(name,ingredients) {
    super()
    this.name = name
    this.peanut_count = 100
    this.ingredients = ingredients
    this.sugar = this.checkSugar(ingredients)
  }
}

class ChocolateChip extends Cookie {
  constructor(name,ingredients) {
    super()
    this.name = name
    this.choc_chip_count = 200
    this.ingredients = ingredients
    this.sugar = this.checkSugar(ingredients)
  }
}

class OtherCookie extends Cookie {
  constructor(name,ingredients) {
    super()
    this.name = name;
    this.other_count = 150
    this.ingredients = ingredients
    this.sugar = this.checkSugar(ingredients)
  }
}

class Ingredients {
  constructor(option){
    this.name = option['name']
    this.amount = option['amount']
    this.has_sugar = option['has_sugar']
  }
}

class CookieFactory {
	static create(option){
		let tampung = []

		for (let i = 0; i < option.length; i++){
			// tampung.push(option[i])
			if (option[i].split(" = ")[0] == 'peanut butter'){
				tampung.push(new PeanutButter(option[i].split(" = ")[0], this.bumbu(option[i].split(" = ")[1])))
			} else if (option[i].split(" = ")[0] == 'chocolate chip') {
				tampung.push(new ChocolateChip(option[i].split(" = ")[0],this.bumbu(option[i].split(" = ")[1])))
			} else if (option[i].split(" = ")[0] == 'chocolate cheese'){
        tampung.push(new OtherCookie(option[i].split(" = ")[0],this.bumbu(option[i].split(" = ")[1])))
			} else if (option[i].split(" = ")[0] == 'chocolate butter') {
        tampung.push(new OtherCookie(option[i].split(" = ")[0],this.bumbu(option[i].split(" = ")[1])))
      }
      //console.log(option[i].split(" = ")[0])
		}
		return tampung
	}

  static bumbu(bahanbahan){
    let arr = []
    let pisah = bahanbahan.split(', ')
    // console.log(pisah)

    for (let i = 0; i < pisah.length; i++){
      let obj = {}
      obj.name = pisah[i].split(' : ')[1]
      obj.amount = pisah[i].split(' : ')[0]

      if (obj.name == 'sugar' ){
        obj.has_sugar = true
      }else{
        obj.has_sugar = false
      }
      arr.push(new Ingredients(obj))
    }

    //console.log(arr)
    return arr
  }

  // static olahIngredients(strBahan) {
  //   let arr = []
  //   let perBahan = strBahan.split(', ')
  //   for (var i = 0; i < perBahan.length; i++) {
  //     let obj = {}
  //     let amountName = perBahan[i].split(' : ')
  //     obj.name = amountName[1]
  //     obj.amount = amountName[0]
  //     arr.push(new Ingredient(obj))
  //   }
  //   // console.log(arr);
  //   return arr
  // }

  static cookieRecomendation(today, list) {

    let tampung = []
    if (today == 'tuesday') {
      for (let i = 0; i < list.length; i++) {
        if (list[i].sugar == false){
          tampung.push(list[i])
        }
      }
    }
    return tampung
  }

}

// DRIVER CODE

let slice_cake = CookieFactory.create(option);
console.log(JSON.stringify(slice_cake,null,3))

let sugarGula = CookieFactory.cookieRecomendation('tuesday', slice_cake);
// console.log(JSON.stringify(sugarGula,null,2));
console.log('----------------- DAFTAR KUE YANG TIDAK MENGANDUNG GULA ----------------');
for (var i = 0; i < sugarGula.length; i++) {
  console.log(sugarGula[i].name);
}
console.log('-------------------------------------------------------------------------');
