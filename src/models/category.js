'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CategorytSchema = Schema({
    name: String,
    type: String,
})

module.exports = mongoose.model("category",CategorytSchema)