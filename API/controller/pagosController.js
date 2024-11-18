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
  ruta.get('/pagos', function(req, res) {
    let sql="select * from pagos order by id";
    conexion.query(sql,(err,rows)=>{
          if(err) throw err;
          else{
              res.json(rows)
          }
      })
  })
//------- getpropietario by Id  ---------------------​
ruta.get('/pagos/:id', function(req, res) {
    conexion.query("select * from pagos where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
  })
  //---------- post cliente------------------------​
  const { body, validationResult } = require('express-validator');
ruta.post('/pagos', 
body('year').isLength({ min: 1 }),
body('mes').isLength({ min: 1 }),
body('fecha').isLength({ min: 1 }),
body('valor').isLength({ min: 1 }),
body('descripcion').isLength({ min: 1 }),
body('apartamentos_id').isLength({ min: 1 }),
function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        let sql = "insert into  pagos set ?"
        console.log('Registro recibido: ',req.body);
            let poststr = {
                year : req.body.year,
                mes: req.body.mes,
                fecha: req.body.fecha,
                valor: req.body.valor,
                descripcion: req.body.descripcion,
                apartamentos_id: req.body.apartamentos_id
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
  ruta.delete('/pagos/:id', function(req, res) {
    let sql ="delete from pagos where id = ?"
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
  ruta.put('/pagos', 
  body('year').isLength({ min: 1 }),
  body('mes').isLength({ min: 1 }),
  body('fecha').isLength({ min: 1 }),
  body('valor').isLength({ min: 1 }),
  body('descripcion').isLength({ min: 1 }),
  body('apartamentos_id').isLength({ min: 1 }),
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let sql = "update pagos set year= ?,mes = ?,fecha=?,valor=?,descripcion=?,apartamentos_id=? where id = ?"
    conexion.query(sql, [req.body.year,req.body.mes,req.body.fecha,req.body.valor,req.body.descripcion,req.body.apartamentos_id,req.body.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
        res.json({status: 'Registro actualizado'})
      }
      else
        res.json({status: 'No se pudo actualizar'})
     });
  })
module.exports = ruta;