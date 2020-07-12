'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'secret_person'

exports.createToken = function(person){
    var payload = {
        sub: person._id,
        name: person.name,
        lastname: person.lastname,
        rol: person.rol,
        email: person.email,
        int: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }

    return jwt.encode(payload, secret)
}