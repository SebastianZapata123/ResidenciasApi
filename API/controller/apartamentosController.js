//conexión con la base de datos​
const conexion = require('../config/conexion');
//------------- realiza los método para cada operaciones​
const express = require("express");
const ruta = express();
// para capturar los parametros​
const bodyParser = require('body-parser');
ruta.use(bodyParser.json())  
//-------------------------------​
ruta.get('/', function(req, res) {
    res.json({ mensaje: '¡Index Cliente!' })  
  })
//------- getpropietario  ---------------------​
  ruta.get('/apartamentos', function(req, res) {
    let sql="select * from apartamentos order by id";
    conexion.query(sql,(err,rows)=>{
          if(err) throw err;
          else{
              res.json(rows)
          }
      })
  })
//------- getpropietario by Id  ---------------------​
ruta.get('/apartamentos/:id', function(req, res) {
    conexion.query("select * from apartamentos where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
  })
  //---------- post cliente------------------------​
  const { body, validationResult } = require('express-validator');
ruta.post('/apartamentos', 
  body('numero').isLength({ min: 1 }),
  body('habitaciones').isLength({ min: 1 }),
  body('bathroom').isLength({ min: 1 }),
  body('area').isLength({ min: 1 }),
  body('torres_id').isLength({ min: 1 }),
  body('propietarios_id').isLength({ min: 1 }),
function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        let sql = "insert into  apartamentos set ?"
        console.log('Registro recibido: ',req.body);
            let poststr = {
                numero : req.body.numero,
                habitaciones: req.body.habitaciones,
                bathroom: req.body.bathroom,
                area: req.body.area,
                torres_id: req.body.torres_id,
                propietarios_id: req.body.propietarios_id
           }
       //Continua en el siguiente cuadro​
       conexion.query(sql, poststr, function (error, results) {
        if (error) throw error;
        if (results.affectedRows) {
         res.json({status: 'Registro guardado'})
         }
         else
           res.json({status: 'No se pudo guardar'})
      });  
  })

  //------- deletetasesor  ---------------------​
  ruta.delete('/apartamentos/:id', function(req, res) {
    let sql ="delete from apartamentos where id = ?"
    conexion.query(sql, [req.params.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
         res.json({status: 'Registro eliminado'})
       }
       else
         res.json({status: 'No se pudo eliminar'})
     });
  })

  //------- getasesor  ---------------------​
  ruta.put('/apartamentos', 
  body('numero').isLength({ min: 1 }),
  body('habitaciones').isLength({ min: 1 }),
  body('bathroom').isLength({ min: 1 }),
  body('area').isLength({ min: 1 }),
  body('torres_id').isLength({ min: 1 }),
  body('propietarios_id').isLength({ min: 1 }),
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let sql = "update apartamentos set numero= ?,habitaciones = ?,bathroom=?,area=?,torres_id=?,propietarios_id=? where id = ?"
    conexion.query(sql, [req.body.numero,req.body.habitaciones,req.body.bathroom,req.body.area,req.body.torres_id,req.body.propietarios_id,req.body.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
        res.json({status: 'Registro actualizado'})
      }
      else
        res.json({status: 'No se pudo actualizar'})
     });
  })
module.exports = ruta;