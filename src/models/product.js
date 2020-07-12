'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name: String,
    price: String,
    category: {type: Schema.ObjectId, ref: 'category'},
})

module.exports = mongoose.model("product",ProductSchema)