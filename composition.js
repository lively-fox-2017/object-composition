// Answer These Questions:
//
// - What are essential classes?
// - What attributes will each class have?
// - What interface will each class provide?
// - How will the classes interact with each other?
// - Which classes will inherit from others, if any?
//
//
// Your code here

"use strict" 
var fs = require('fs')
var options = fs.readFileSync('cookies.txt', 'utf8').split('\n');


class Ingredients {
    constructor (options) {
        this.name = options['name']
        this.amount = options['amount']
        this.has_sugar = options['has_sugar']
    }



}

class Cookie {
  constructor (name, ingredient){
    this.name = name  
    this.ingredient = ingredient
    this.status = "mentah"
    
    
    }

  bake(){
    this.status = "selesai dimasak"
  }

}

class PeanutButter extends Cookie {
  constructor (name, ingredient){
    super (name, ingredient)
      
      this.Peanut_count = 100
      
  }
}

class ChocolateChip extends Cookie {
    constructor (name, ingredient){
      super (name, ingredient)
        this.choc_chip_count = 200
        
    }
}

class ChocolateCheese extends Cookie {
    constructor (name, ingredient){
      super (name, ingredient)
        this.choc_cheese_count = 150
        
    }
  }

  class ChocolateButter extends Cookie {
    constructor (name, ingredient){
      super (name, ingredient)
        this.choc_butter_count = 150
        
    }
  }

class CookieFactory {
  static create (options){
    let arr = []
    let newArr = []
    
    
    
    for(let i = 0; i < options.length; i++ ){
        let boo = options[i].split(' = ')
        //console.log(boo[1]);
        //console.log(this.bahan(boo[1]));
        
      if( boo[0] === 'peanut butter'){
          
          arr.push(new PeanutButter(boo[0], this.bahan(boo[1])))
         }
         if(boo[0] === 'chocolate chip'){
             arr.push(new ChocolateChip(boo[0], this.bahan(boo[1])))
         }
         if(boo[0] === 'chocolate cheese'){
             arr.push(new ChocolateCheese(boo[0], this.bahan(boo[1])))
         }

        if(boo[0] === 'chocolate butter'){
            arr.push(new ChocolateButter(boo[0], this.bahan(boo[1])))
            
         }

      }
        return arr

    
    }

    static bahan (options) {
        let splitting = options.split(',')
        
        let newArr = []
        
        //console.log(splitting)
        
        for(let i =0; i < splitting.length; i++){
            let pisahBahan = splitting[i].split(':')
            
            
            let temp = true
            if(pisahBahan[1] === 'sugar'){
                temp = true
            }else{
                temp =  false
            }
            let obj = {
            name: pisahBahan[1],
            amount: pisahBahan[0],
            has_sugar: temp
            }
            let bahanBahan = new Ingredients (obj)
        
            
             newArr.push(bahanBahan)
        
        }
        return newArr
    }
 
}


 let batch_of_cookies = CookieFactory.create(options);
 console.log('batch of cookies')

let arr = []
batch_of_cookies.forEach(item => {
    if (item.ingredient.filter(data => data.has_sugar).length === 0) {
       arr.push(item.name)
    }
})

console.log('sugar free cakes are: ', arr)


const util = require('util')



// alternative shortcut
console.log(util.inspect(batch_of_cookies, false, null))






