"use strict"

let fs = require("fs");
let ingredients = fs.readFileSync("cookies2.txt").toString().split("\n");

class Ingredients {
  constructor(ingredient_name,ingredient_ammount){
    this.ingredient_name = ingredient_name;
    this.ingredient_ammount = ingredient_ammount;
    // this.with_sugar = with_sugar;
  }
}

class Cookie {
  constructor(name,ingredients){
    this.name = name;
    this.status = "mentah";
    this.ingredients = ingredients;
    this.other_count = 150;
  }
  bake(){
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor(name,ingred){
    super(name,ingred)
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name,ingred){
    super(name,ingred)
    this.name = name;
    this.choc_chip_count =  200;
  }
}

class OtherCookies extends Cookie {
  constructor(name,ingred){
    super(name,ingred)
    this.name = name;
  }
}

class CookieFactory {
  static create(options){
    let arr = [];
    for(var i = 0; i < ingredients.length; i++){
      let tampung = [];
      let pisah = ingredients[i].split("=");
      let pisah2 = pisah[1].split(",");
      for(var y = 0; y < pisah2.length; y++){
        let pisah3 = pisah2[y].split(",")
        for(var k = 0; k < pisah3.length; k++){
          let ammount = pisah3[k].split(":")[0];
          let ing_name = pisah3[k].split(":")[1];
          let ingred = new Ingredients(ing_name,ammount);
          tampung.push(ingred);
        }
      }
      if(pisah[0] === "peanut butter "){
        let peanutButter = new PeanutButter(pisah[0],tampung);
        arr.push(peanutButter);
      }
      else if(pisah[0] === "chocolate chip "){
        let chocolateChip = new ChocolateChip(pisah[0],tampung);
        arr.push(chocolateChip)
      }
      else {
        let otherCookies = new OtherCookies(pisah[0],tampung);
        arr.push(otherCookies);
      }
    }
    return arr;
  }
}

let cookie = new Cookie();
let cookieFactory = CookieFactory.create(ingredients);
console.log(JSON.stringify(cookieFactory,null,4));