'use strict'

const fs = require('fs');
var cookies = fs.readFileSync('cookies.txt', 'UTF-8')
var options = cookies.split('\n')

class Cookie {
    constructor(name){
        this._name = name
        this.status = "mentah"
        this.ingredients = []
    }

    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name){
        super(name)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name){
        super(name)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name){
        super(name)
        this.other_cookie = 150
    }
}

class CookieFactory {
    static create(option){
        this.cookies = []
        for (var i = 0; i < option.length - 1; i++) {
            if (option[i] === 'peanut butter') {
                let cookie = new PeanutButter(option[i])
                this.cookies.push(cookie)
            } else if (option[i] === 'chocolate chip') {
                let cookie = new ChocolateChip(option[i])
                this.cookies.push(cookie)
            } else {
                let cookie = new OtherCookie(option[i])
                this.cookies.push(cookie)
            }
        }
        return this.cookies
    }
}

var cookie = CookieFactory.create(options)

console.log(cookie)