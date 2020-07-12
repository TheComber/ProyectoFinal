'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PersonSchema = Schema({
    name: String,
    lastname: String,
    rol: String,
    user: String,
    email: String,
    password: String
})

module.exports = mongoose.model("person",PersonSchema)