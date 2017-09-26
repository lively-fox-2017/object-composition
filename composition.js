'use strict'
let fs = require('fs')
let importFile = fs.readFileSync('cookies.txt', 'utf8').toString().split('\n')

let dataFixed = []
for(let idx=0; idx<importFile.length; idx++){
  dataFixed.push(importFile[idx].split('='))
}

class Cookie{
  constructor(name){
    this.name = name
    this.status = 'mentah'
    this.ingredients = []
  }

  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name){
    super(name)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie{
  constructor(name){
    super(name)
    this.choc_chip_count = 200
  }
}

class OtherCookies extends Cookie{
  constructor(name){
    super(name)
    this.other_count = 150
  }
}


class CookieFactory{
  static create(options){
    // accepts a list of cookie types and returns those cookies
    let result = []
    for(let i=0; i<importFile.length-1; i++){
      if(dataFixed[i][0].trim() === 'peanut butter'){
        result.push(new PeanutButter(dataFixed[0][0]))
      }else if(dataFixed[i][0].trim() === 'chocolate chip'){
        result.push(new ChocholateChip(dataFixed[1][0]))
      }else{
        result.push(new OtherCookies(dataFixed[i][0]))
      }
    }
    return result
  }
  // define other methods as needed
}

// contoh driver code
// sesuaikan dengan model inheritance
// baca daftar kue dari file dan kirim ke cookie factory
// dimana lokasi file yang kamu tulis supaya code bisa berjalan?
//let factory = new CookieFactory()

let batch_of_cookies = CookieFactory.create('cookies.txt')
console.log(batch_of_cookies)
