'use strict'

var express = require('express')
var productControllers = require("../controllers/productControllers")
var md_auth = require("../middlewares/authentication")

var api = express.Router()
// Rutas Empresa
api.post('/registrarProducto', productControllers.registerProduct)
api.put('/editarProducto/:IdProduct', productControllers.editProduct)
api.delete('/eliminarProducto/:IdProduct', productControllers.deleteProducto)
api.get('/verProductos', productControllers.listProduct)
api.get('/verProductos/:')

module.exports = api;