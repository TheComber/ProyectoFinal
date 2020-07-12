'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var StockSchema = Schema({
    name: String,
    product: {type: Schema.ObjectId, ref: 'product'},
    quantity: Number,
})

module.exports = mongoose.model("stock",StockSchema)