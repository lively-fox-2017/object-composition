/*

*/
'use strict'
const fs = require('fs');

class Ingredient {
  constructor(options) {
    this.name=options[0]; //console.log('-------------------------------------'+options[1]);
    this.amount=options[1].trim();
    // if (options[1].toUpperCase()==' SUGAR') {
    //   this.has_sugar=true;
    // } else this.has_sugar=false;
    // console.log(options);
  }
}

class Cookie {
  constructor(nama) {
    this.status='mentah';
    this.ingredient = this.getIngredient(nama); //console.log(this.ingredient);
    this.has_sugar = this.hasSugar(this.ingredient);
  }
  getIngredient(nama){ //console.log('nama='+nama+'================'+ingred.length);
    let bhn_per_cookie=[];
    // console.log(ingred);
    for (var i = 0; i < ingred.length; i++) {
      //console.log('-------------'+ingred[i][0]+'== '+nama);
      if (ingred[i][0].trim()==nama) {
        bhn_per_cookie.push(ingred[i][1].split(','));
      }
    }
    //console.log('bahan-bahan='+bhn_per_cookie[0].length);
    let bhn_bhn=[]; //satu baris
    for (var i = 0; i < bhn_per_cookie[0].length; i++) {//console.log(bhn_per_cookie[i]);
      let newIngred = new Ingredient(bhn_per_cookie[0][i].split(':'))
      bhn_bhn.push(newIngred);
    }
    return bhn_bhn; //console.log('bahan-bahan'+bhn_bhn);
  }

  hasSugar(arr){
    // console.log(arr);//.amount);
    for (var i = 0; i < arr.length; i++) {
      // console.log(arr[i]);
      // console.log('-----------------'+arr[i].amount.trim());
      if (arr[i].amount.indexOf('sugar')>-1) {
        // console.log(arr[i].amount+'------------------------');
        return true;
      }
    }
    return false;
  }
  bak(){
    this.status='selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(nama) {
    super(nama);
    this.peanut_count=100
  }
}

class ChocolateChip extends Cookie{
  constructor(nama) {
    super(nama);
    this.choc_chip_count=200
  }
}

class OtherCookis extends Cookie{
  constructor(nama) {
    super(nama);
    this.choc_chipt_count=200
  }
}

class CookieFactory {
  static create (options){
    this.cookies=[]
    for (var i = 0; i < options.length-1; i++) {
      if (options[i]=='peanut butter') {
        let obj = new PeanutButter(options[i])
        obj.name=options[i];
        this.cookies.push(obj);
      } else
      if (options[i]=='chocolate chip') {
        let obj = new ChocolateChip(options[i])
        obj.name=options[i];
        this.cookies.push(obj);
      } else {
        let obj = new OtherCookis(options[i])
        obj.name=options[i];
        this.cookies.push(obj);
      }
    }
    return this.cookies;
  }
  static cookieRecomendation(hari,arr){
    let output=[];//console.log(options[0]);
    //console.log(arr.length);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].has_sugar==false) {
        output.push(arr[i]);
        // console.log(options[i]);
      }
    }
    return output
  }
}

let options=fs.readFileSync('./cookies.txt','UTF-8').toString().split(/\n/);
let ingred_temp=fs.readFileSync('./ingredient.txt','UTF-8').toString().split(/\n/);//.splice(0,4);
//let ingred_temp2=ingred_temp[1].split('=');
let ingred=[];
for (var i = 0; i < ingred_temp.length-1; i++) {
  ingred.push(ingred_temp[i].split('='));
}
//console.log(ingred);
// console.log(ingred_temp2);

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies[0].ingredient);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday',batch_of_cookies);
console.log('sugar free cakes are:');
for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
