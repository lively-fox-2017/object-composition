'use strict'

const fs = require('fs');
var cookies = fs.readFileSync('cookies.txt', 'UTF-8')
var options = cookies.split('\n')
class Cookie {
    constructor(name){
        this._name = name
        this.status = "mentah"
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

class ChocholateChip extends Cookie {
    constructor(name){
        super(name)
        this.choc_chip_count = 200
    }
}

console.log(typeof options)