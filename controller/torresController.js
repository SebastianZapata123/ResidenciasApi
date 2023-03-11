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
    res.json({ mensaje: '¡Index torres!' })  
  })
//------- getpropietario  ---------------------​
  ruta.get('/torres', function(req, res) {
    let sql="select * from torres order by id";
    conexion.query(sql,(err,rows)=>{
          if(err) throw err;
          else{
              res.json(rows)
          }
      })
  })
//------- getpropietario by Id  ---------------------​
ruta.get('/torres/:id', function(req, res) {
    conexion.query("select * from torres where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
  })
  //---------- post cliente------------------------​
  const { body, validationResult } = require('express-validator');
ruta.post('/torres', 
body('nombre').isLength({ min: 1 }),
body('napto').isLength({ min: 1 }),
function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        let sql = "insert into  torres set ?"
        console.log('Registro recibido: ',req.body);
            let poststr = {
            nombre : req.body.nombre,
            napto: req.body.napto
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
  ruta.delete('/torres/:id', function(req, res) {
    let sql ="delete from torres where id = ?"
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
  ruta.put('/torres', 
  body('nombre').isLength({ min: 1 }),
  body('napto').isLength({ min: 1 }),
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let sql = "update torres set nombre= ?,napto = ? where id = ?"
    conexion.query(sql, [req.body.nombre,req.body.napto,req.body.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
        res.json({status: 'Registro actualizado'})
      }
      else
        res.json({status: 'No se pudo actualizar'})
     });
  })
module.exports = ruta;