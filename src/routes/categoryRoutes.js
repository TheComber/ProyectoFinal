'use strict'

var express = require('express')
var categoryControllers = require("../controllers/categoryControllers")
var md_auth = require("../middlewares/authentication")

var api = express.Router()
// Rutas Empresa
api.post('/registrarCategoria', categoryControllers.registerCategory)
api.put('/editarCategoria/:IdCategory', categoryControllers.editCategory)
api.delete('/eliminarCategoria/:IdCategory', categoryControllers.deleteCategory)
api.get('/verCategorias', categoryControllers.listCategory)
api.get('/verCategoriasNombre/:nameCategory', categoryControllers.listCategoryName)


module.exports = api;