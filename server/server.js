const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs');

var mensaje = "mensaje";

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/momento2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, res) => {
      if (err) mensaje = "Hubo un error al conectar";
      mensaje = "Conectado a la base de datos.";
  });

app.get('/', function (req,res) {
    res.json({
        "mensaje" : "Bienvenido a la entrega de Momento 2."
    }) 
 });

 app.get('/saludo/:nombre', function (req,res) {

     var nombre = req.params.nombre;
     var nombreVal = nombre.split(' ').join('');
     var longitud  = nombreVal.length;

    //  var nombreVal = nombre.split(' ').join('');
    //  console.log("nombreVal trim: "+nombreVal);

    //  var nombreVal = nombreVal.length;
    //  console.log("nombreVal length: "+nombreVal);
    //console.log(longitud);

     if(longitud >= 3 && longitud <= 40){

        fs.appendFile(
            'Información.txt', 
            "nombre: " + nombre + "\n", 
            (err) => {
                if (err) 
                    throw err;
          });

        res.json({
            "data" : `¡Hola! como estás ${nombre}`
        }) 
     } else {
        res.json({
            "data" : `El nombre debe tener entre 3 y 40 caracteres sin contar espacios`
        }) 
     }
 });

 app.get('/edad/:XY', function (req,res) {

    var edad = req.params.XY;

    if(edad >= 0 && edad <= 150){
        if(edad < 18){

            fs.appendFile(
                'Información.txt', 
                "edad: menor - " + edad + " años. \n", 
                (err) => {
                    if (err) 
                        throw err;
              });


            res.json({
                "data" : `Menor de edad`
            }) 
        } else {

            fs.appendFile(
                'Información.txt', 
                "edad: mayor - " + edad + " años. \n", 
                (err) => {
                    if (err) 
                        throw err;
              });


            res.json({
                "data" : `Mayor de edad`
            }) 
        }
    } else {
       res.json({
           "data" : `Información incorrecta, debe ser un número entre 0 y 150`
       }) 
    }
});

app.get('/database', function (req,res) {

    res.json({
        "mensaje" : mensaje
    }) 
});


app.listen(3000,() => {
    console.log("Server online");
});