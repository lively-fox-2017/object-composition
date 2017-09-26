'use strict'

const fs = require('fs')

class Ingredients {

    constructor(options){
        this.name = options['name']
        this.amount = options['amount']
        this.has_sugar = options['has_sugar']
    }

}

class Cookie {

    constructor(name, ingredients, hasSugar){
        this.name = name
        this.status = 'mentah'
        this.ingredients = ingredients
        this.hasSugar = hasSugar
    }

    bake(){
        this.status = 'selesai dimasak'
        return this.status
    }

}

class PeanutButter extends Cookie {

    constructor(name, ingredients, hasSugar){
        super(name, ingredients, hasSugar)
        this.peanut_count = 100
    }

    get peanutCount(){
        return this.peanut_count
    }

}

class ChocolateChip extends Cookie {

    constructor(name, ingredients, hasSugar){
        super(name, ingredients, hasSugar)
        this.choc_chip_count = 100
    }
    
}

class ChocolateCheese extends Cookie {

    constructor(name, ingredients, hasSugar){
        super(name, ingredients, hasSugar)
        this.choc_cheese_count = 100
    }

}

class ChocolateButter extends Cookie {

    constructor(name, ingredients, hasSugar){
        super(name, ingredients, hasSugar)
        this.choc_butter_count = 100
    }

}

class CookieFactory {

    constructor(){

    }

    static create(options){

        let ingredients = null
        let split = options.split('\n')
        let spliteq, splitTik2, splitCom
        let splitseq, splitsTik2, splitsCom
        let obj = {}
        let arrCook = []

        for(let i = 0; i < split.length; i++){
            let ingre = new Ingredients(i)
            spliteq = split[i].split('=')
            splitTik2 = spliteq[1].split(',')
            let arrIngre = []
            let sugar = false
            for(let j = 0; j < splitTik2.length; j++){
                
                obj={}
                splitCom = splitTik2[j].split(':')
                obj['name'] = splitCom[1].replace(' ', '')
                obj['amount'] = splitCom[0].replace(' ', '')
                
                if(obj['name'] === 'sugar'){
                    sugar = true
                    obj['has_sugar'] = true
                }else{
                    obj['has_sugar'] = false
                }
                arrIngre.push(JSON.stringify(obj))
            }
            if(spliteq[0] === 'peanut butter '){
                ingredients = new PeanutButter(spliteq[0], arrIngre, sugar)
            }else if(spliteq[0] === 'chocolate chip '){
                ingredients = new ChocolateChip(spliteq[0], arrIngre, sugar)
            }else if(spliteq[0] === 'chocolate cheese '){
                ingredients = new ChocolateCheese(spliteq[0], arrIngre, sugar)
            }else if(spliteq[0] === 'chocolate butter '){
                ingredients = new ChocolateButter(spliteq[0], arrIngre, sugar)
            }
            arrCook.push(ingredients)
        }
        return arrCook
    }

    static cookieRecommendation(day, cook){
        let arr = []
        for(let i = 0; i < cook.length; i++){
            if(cook[i].hasSugar === false){
                arr.push(cook[i])
            }
        }
        return arr
    }
    
}

let options = fs.readFileSync('cookies.txt', 'utf8')
let optionsI = fs.readFileSync('ingredient.txt', 'utf8')
let batch_of_cookies = CookieFactory.create(optionsI)
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
console.log('sugar free cakes are : ')
for(let i = 0; i < sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}