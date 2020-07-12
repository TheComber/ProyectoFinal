'use strict'

var express = require('express')
var personController = require("../controllers/personControllers")
var md_auth = require("../middlewares/authentication")

var api = express.Router()
// Rutas Empresa
api.post('/registrarCliente',md_auth.ensureAuth, personController.registerPersonClient)
api.post('/registrarAdministrador', personController.registerPersonAdmin)
api.post('/login', personController.login)
api.put('/editarUsuario/:idPerson', md_auth.ensureAuth, personController.editUser)
api.delete('/eliminarUsuario/:idPerson', md_auth.ensureAuth, personController.deleteUser)
api.get('/verUsuarios', personController.listPerson)


module.exports = api;