'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CartSchema = Schema({
    product: {type: Schema.ObjectId, ref: 'product'},
    quantity: Number,
    price: {type: Schema.ObjectId, ref: 'product'},
    bill:[{
        name: {type: Schema.ObjectId, ref: 'person'},
        user: {type: Schema.ObjectId, ref: 'person'},
        total: Number,
    }]
})

module.exports = mongoose.model("cart",CartSchema)