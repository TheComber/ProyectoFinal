'use strict'

//Imports
var bcrypt = require('bcrypt-nodejs');
var Category = require('../models/category')
var jwt = require('../services/jwt')
var path = require('path')
var fs = require('fs')

//Person
function registerCategory(req, res){
    var category = new Category();
    var params = req.body;

    if(params.name && params.type){
        category.name = params.name;
        category.type = params.type;
        category.save((err, categorySave)=>{
            if(err) return res.status(500).send({message: 'Error al guardar'})
                if(categorySave){
                    res.status(200).send({category: categorySave})
            }else{
                    res.status(404).send({message: 'No se ha registrado'})
                }
            })
        }else{
            res.status(200).send({message: 'Rellene todos los comapos necesarios'})
        }
    }

function editCategory(req, res){
    var categorytId = req.params.IdCategory;
    var params = req.body

    /* if(productId != req.product.sub){
        return res.status(500).send({message: "No tiene permisos para editar este usuario"})
    } */
    Category.findByIdAndUpdate(categorytId, params, {new: true}, (err, categoryUpdated)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!categoryUpdated) return res.status(404).send({message: "No se ha podido actulizar los datos"})
        return res.status(200).send({categorytId: categoryUpdated}) 
    })
}

function deleteCategory(req, res){
    var categorytId = req.params.IdCategory;

    /* if(personId != req.person.sub){
        return res.status(500).send({message: "No contiene permisos para eliminar este usuario"})
    } */
    Category.findByIdAndDelete(categorytId , (err, categoryDelete)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!categoryDelete) return res.status(404).send({message: "Error al eliminar"})
        return res.status(200).send({categorytId: categoryDelete})
    })

}

function listCategory(req, res){
    Category.find((err, category)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!category) return res.status(60).send({message: "Error en la consulta"})
        return res.status(200).send({category})
    }) 
}

function listCategoryName(req, res){
    var categoryName = req.params.nameCategory;
    Category.find({name: {$regex:categoryName}}, (err, nameCategory)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!nameCategory) return res.status(404).send({message: "Error al encontrar"})
        return res.status(300).send({nameCategory})
    })
}

//Expotaciones
module.exports = {
    registerCategory,
    editCategory,
    deleteCategory,
    listCategory,
    listCategoryName

}