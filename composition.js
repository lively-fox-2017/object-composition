"use strict"
const fs = require('fs');
class Cookie {
  constructor() {
    this.status = "mentah";
    this.ingredients = [];
  }
  bake() {
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor() {
    super()
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor() {
    super()
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(){
    super()
    this.other_count = 150;
  }
}

class CookieFactory {
  constructor(){

  }
  static create(options) {
    var data = fs.readFileSync(options).toString().split('\n');
    var cookies = []
    for (var i = 0; i < data.length - 1; i++) {
      if(data[i].indexOf('peanut') > -1){
        var obj = new PeanutButter();
        cookies.push(obj);
      }
      else if(data[i].indexOf('chip') > -1){
        var obj = new ChocolateChip();
        cookies.push(obj);
      }
      else{
        var obj = new OtherCookie();
        cookies.push(obj);
      }
    }
    return cookies;
  }
}
var options = 'cookies.txt'
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
