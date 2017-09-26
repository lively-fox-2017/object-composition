'use strict'
const fs = require('fs');

class Inggredient{
  constructor(options) {
    this.name = options.name || '';
    this.amount = options.amount || 0;
    this.hasSugar = options.hasSugar || true;
  }
}

class TxtToCookiesConverter {
  constructor(){
  }

  textToIngredients(textForm) {
    //console.log(textForm);
    let arrPairs = textForm.split(',');
    let tempPair = [];
    let tempIngredient ;
    let opt;
    let result = [];
    for (let i = 0; i<arrPairs.length; i++){
      tempPair = arrPairs[i].split(':');
      opt = {name:tempPair[1], amount:tempPair[0]};
      tempIngredient = new Inggredient(opt);
      result.push(tempIngredient);
    }
    return result;
  }

  converter(nameFile){
    let string = fs.readFileSync(nameFile, 'utf8');
    let arrForm =  string.split('\n')
    let result = [];
    let temp = {};
    //console.log(arrForm[1]);
    //fetch data
    //split per line
    for (let i =0; i<arrForm.length-1; i+=2){
      temp.name = arrForm[i];
      temp.inggredients = this.textToIngredients(arrForm[i+1]);
      result.push({name:temp.name, inggredients: temp.inggredients})
    }
    //return {name:'asd', ing:[]
    //console.log('\n');
    //console.log('asdasdasd',result);
    //console.log(result);
    return result
  }
}

new TxtToCookiesConverter().converter('cookies.txt');

class Cookie {
  constructor(name, inggredients) {
    this.name = name;
    this.status = 'mentah';
    this.inggredients = inggredients || [];
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(inggredients) {
    super('peanut butter', inggredients)
    this.peanutCount = 100;
  }
}

class ChocoChip extends Cookie {
  constructor(inggredients) {
    super('choco chip', inggredients)
    this.chocChipCount = 200;
  }
}

class chocolate

class CookieFactory {
  constructor() {
    //console.log('jadi');
  }

  static create(options) {
    if (options.hasOwnProperty('name')){
      switch (options.name) {
        case 'peanut butter':
          return new PeanutButter(options.inggredients);
          break;
        case 'chocolate chip':
          return new ChocoChip(options.inggredients);
          break;
        default:
          return new Cookie(options)
      }
    }
  }

  static createBatch(arrOfOptions){
    let cookies = []
    for (var i in arrOfOptions) {
      cookies.push(CookieFactory.create(arrOfOptions[i]))
    }
    return cookies;
  }
}

let chocolate = new Inggredient({name:'chocolate', amount:80, hasSugar:false});
let egg = new Inggredient({name:'egg', amount:3, hasSugar:false});
let ings = [ egg, chocolate];
let opt = [{name:'peanut butter', inggredients:ings},
            {name:'chocolate chip'},
            {name: 'medovnik'}]
let fromFile = new TxtToCookiesConverter().converter('cookies.txt');
let factory = CookieFactory.createBatch(fromFile);
let sugarFreeFoods = CookieFactory.
//console.log(CookieFactory);
console.log(factory);
