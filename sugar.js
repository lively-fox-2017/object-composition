class Cookie {
    constructor(Ingredients) {
        this.name =''
        // this.status = 'mentah'
        this.ingredients = ingredients;
        
    }
    bake() {
        this.status = 'Selesai dimasak'
    }

}
class PeanutButter extends
    Cookie {
    constructor(name) {
        super()
        this.peanut_count = 100
        this.name = name
    }
}

class ChocholateChip extends Cookie {
    constructor(name) {
        super()
        this.choc_chip_count = 200
        this.name = name
    }
}
class OtherCookie extends Cookie {
    constructor(name) {
        super()
        this.other_count = 150
        this.name = name
    }
}

class CookieFactory {
    static create(options) {
      return options;
    }

    cookieRecomendation()
}

class Ingredient {
    constructor(options){
        this.name = options['name'];
        this.amount = options['amount']
        this.has_sugar = options['has_sugar']
    }

}

let fs = require('fs');
let data = fs.readFileSync('bahan.txt').toString().split("\n");
let batch_of_cookies = CookieFactory.create(data);
console.log(batch_of_cookies);

// let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
// console.log("sugar free cakes are : ");
// for(let i=0; i< sugarFreeFoods.length; i++){
//     console.log(sugarFreeFoods[i].name);
// }
