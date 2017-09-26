"use strict"
class Ingredient {
    constructor(options) {
        this.name = options['name'];
        this.amount = options['amount']
        this.has_sugar = options['has_sugar']
    }

}

class Cookie {
    constructor(ingredients) {
        this.name = ''
        this.status = 'mentah'
        this.ingredients = this.getData(ingredients);

    }
    bake() {
        this.status = 'Selesai dimasak'
    }

    getData(ingredients) {
    //    return ingredients;
        let ingredientSplit;
        let objek = [];
        let arr = [];
        for (let i = 0; i < ingredients.length; i++) {
            let ingred = {};
            ingredientSplit = ingredients[i].split(' : ');
            for (let j = 0; j < ingredientSplit.length; j++) {

                ingred['name'] = ingredientSplit[1];
                ingred['amount'] = ingredientSplit[0];

                if (ingredientSplit[1] == 'sugar') {
                    ingred['has_sugar'] = true
                } else {
                    ingred['has_sugar'] = false
                }
               
            }
            objek.push(new Ingredient(ingred));
        }
        return objek;
    }
}
class PeanutButter extends
    Cookie {
    constructor(name, ingredients) {
        super(ingredients)
        this.peanut_count = 100
        this.name = name
    }
}

class ChocholateChip extends Cookie {
    constructor(name, ingredients) {
        super(ingredients)
        this.choc_chip_count = 200
        this.name = name
    }
}
class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(ingredients)
        this.other_count = 150
        this.name = name
    }
}

class CookieFactory {
    static create(options) {

        let bahan;
        let type;
        let arr = [];
        for (let i = 0; i < options.length; i++) {
            bahan = options[i].split("=");
            if (bahan[0] == 'peanut butter') {
                type = new PeanutButter(bahan[0], bahan[1].split(','));
            } else if (bahan[0] == 'chocholate chip') {
                type = new ChocholateChip(bahan[0], bahan[1].split(','));
            } else {
                type = new OtherCookie(bahan[0], bahan[1].split(','));
            }
            arr.push(type);
        }
        return arr;
    }

    static cookieRecommendation(data){
        let cek;
        let arrData = [];
    
        
       for(let i=0; i< data.length; i++){
        let ingredient = data[i].ingredients
           for(let j=0; j<ingredient.length; j++){
            cek = ingredient[j].has_sugar;
            if(!cek && j == ingredient.length-1){
                arrData.push(data[i]);
             }else if(cek){
                break;
            }
           }
       }
    return arrData;
    }


}

let fs = require('fs');
let data = fs.readFileSync('bahan.txt').toString().split("\n");
let batch_of_cookies = CookieFactory.create(data);
// console.log(batch_of_cookies);
// console.log(require('util').inspect(batch_of_cookies, {
//     depth: null,
// }));
let sugarFreeFoods = CookieFactory.cookieRecommendation(batch_of_cookies);
console.log("sugar free cakes are : ");
// console.log(sugarFreeFoods);
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name);
}