'use strict'

//Imports
var bcrypt = require('bcrypt-nodejs');
var Product = require('../models/product')
var jwt = require('../services/jwt')
var path = require('path')
var fs = require('fs')

//Person
function registerProduct(req, res){
    var product = new Product();
    var params = req.body;

    if(params.name && params.price){
        product.name = params.name;
        product.price = params.price;
        product.category = "Default";

    product.save((err, productSave)=>{
        if(err) return res.status(500).send({message: 'Error al guardar'})
            if(productSave){
                res.status(200).send({product: productSave})
        }else{
                res.status(404).send({message: 'No se ha registrado'})
            }
        })
    }else{
        res.status(200).send({message: 'Rellene todos los comapos necesarios'})
    }
}

function editProduct(req, res){
    var productId = req.params.IdProduct;
    var params = req.body

    /* if(productId != req.product.sub){
        return res.status(500).send({message: "No tiene permisos para editar este usuario"})
    } */
    Product.findByIdAndUpdate(productId, params, {new: true}, (err, productUpdated)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!productUpdated) return res.status(404).send({message: "No se ha podido actulizar los datos del usuario"})
        return res.status(200).send({productId: productUpdated}) 
    })
}

function deleteProducto(req, res){
    var productId = req.params.IdProduct;

    /* if(personId != req.person.sub){
        return res.status(500).send({message: "No contiene permisos para eliminar este usuario"})
    } */
    Product.findByIdAndDelete(productId , (err, productDelete)=>{
        if(err) res.status(500).send({message: "Error en la peticion"})
        if(!productDelete) res.status(404).send({message: "Error al eliminar la empresa"})
        return res.status(200).send({productId: productDelete})
    })

}

function listProduct(req, res){
    Product.find((err, product)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!product) return res.status(60).send({message: "Error en la consulta"})
        return res.status(200).send({product})
    }) 
}

//Expotaciones
module.exports = {
    registerProduct,
    editProduct,
    deleteProducto,
    listProduct
}