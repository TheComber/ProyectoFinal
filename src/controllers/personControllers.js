'use strict'

//Imports
var bcrypt = require('bcrypt-nodejs');
var Person = require('../models/person')
var jwt = require('../services/jwt')
var path = require('path')
var fs = require('fs')

//Person
function registerPersonClient(req, res){
    var person = new Person();
    var params = req.body;

    if(params.name && params.lastname && params.user && params.email && params.password){
        person.name = params.name;
        person.lastname = params.lastname;
        person.rol = "Cliente";
        person.user = params.user;
        person.email = params.email;
        person.password = params.password;
        Person.find({$or:[
            {email: person.email,
            user: person.user}
        ]}).exec((err, users)=>{
            if(err) return res.status(500).send({message: "Error en la peticion"})
            if(users && users.length >=1){
                return res.status(500).send({message: "La Persona ya existe"})
            }else{
                bcrypt.hash(params.password, null, null,(err, hash)=>{
                    person.password = hash;
                    person.save((err, personSave)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar la persona'})
                                if(personSave){
                                res.status(200).send({person: personSave})
                            }else{
                                res.status(404).send({message: 'No se ha registrado la persona'})
                        }
                    })
                })
            }
        })
    }else{
        res.status(200).send({message: 'Rellene todos los comapos necesarios'})
    }
}

function registerPersonAdmin(req, res){
    var person = new Person();
    var params = req.body;

    if(params.name && params.lastname && params.user && params.email && params.password){
        person.name = params.name;
        person.lastname = params.lastname;
        person.rol = "Administrador";
        person.user = params.user;
        person.email = params.email;
        person.password = params.password;
        Person.find({$or:[
            {email: person.email,
            user: person.user}
        ]}).exec((err, users)=>{
            if(err) return res.status(500).send({message: "Error en la peticion"})
            if(users && users.length >=1){
                return res.status(500).send({message: "La Persona ya existe"})
            }else{
                bcrypt.hash(params.password, null, null,(err, hash)=>{
                    person.password = hash;
                    person.save((err, personSave)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar la persona'})
                                if(personSave){
                                res.status(200).send({person: personSave})
                            }else{
                                res.status(404).send({message: 'No se ha registrado la persona'})
                        }
                    })
                })
            }
        })
    }else{
        res.status(200).send({message: 'Rellene todos los comapos necesarios'})
    }
}

function login(req, res){
    var params = req.body;

    Person.findOne({email: params.email}, (err, person)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        if(person){
            bcrypt.compare(params.password, person.password, (err, check)=>{
                if(check){
                    if(params.gettoken){
                        return res.status(200).send({token: jwt.createToken(person)})
                    }else{
                        person.password = undefined;
                        return res.status(200).send({person})
                    }
                }else{
                    return res.status(404).send({message: 'La persona no se pudo logiar'})
                }
            })
        }else{
            return res.status(404).send({message: 'La persona no se pudo logiar'})
        }     
        
    })
}

function editUser(req, res){
    var personId = req.params.idPerson;
    var params = req.body

    delete params.password
    if(personId != req.person.sub){
        return res.status(500).send({message: "No tiene permisos para editar este usuario"})
    }
    Person.findByIdAndUpdate(personId, params, {new: true}, (err, userUpdated)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!userUpdated) return res.status.send({message: "No se ha podido actulizar los datos del usuario"})
        return res.status(200).send({personId: userUpdated}) 
    })
}

function deleteUser(req, res){
    var personId = req.params.idPerson;

    if(personId != req.person.sub){
        return res.status(500).send({message: "No contiene permisos para eliminar este usuario"})
    }
    Person.findByIdAndDelete(personId , (err, userDelete)=>{
        if(err) res.status(500).send({message: "Error en la peticion"})
        if(!userDelete) res.status(404).send({message: "Error al eliminar la empresa"})
        return res.status(200).send({personId: userDelete})
    })
}

function listPerson(req, res){
    Person.find((err, person)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!person) return res.status(60).send({message: "Error en la consulta"})
        return res.status(200).send({person})
    }) 
}

function listPersonName(req, res){
    var personName = req.params.namePerson;
    Person.find({name: {$regex:personName}}, (err, namePerson)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!namePerson) return res.status(404).send({message: "Error al encontrar"})
        return res.status(300).send({namePerson})
    })
}

//Expotaciones
module.exports = {
    registerPersonClient,
    registerPersonAdmin,
    login,
    editUser,
    deleteUser,
    listPerson
}