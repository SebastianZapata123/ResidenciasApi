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
    res.json({ mensaje: '¡Index propietarios!' })  
  })
//------- getpropietario  ---------------------​
  ruta.get('/cliente', function(req, res) {
    let sql="select * from propietarios order by id";
    conexion.query(sql,(err,rows)=>{
          if(err) throw err;
          else{
              res.json(rows)
          }
      })
  })
//------- getpropietario by Id  ---------------------​
ruta.get('/cliente/:id', function(req, res) {
    conexion.query("select * from propietarios where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
  })
  //---------- post cliente------------------------​
  const { body, validationResult } = require('express-validator');
ruta.post(
  '/cliente', 
  body('nombres').isLength({ min: 1 }),
  body('apellidos').isLength({ min: 1 }),
  body('direccion').isLength({ min: 1 }),
  body('telefono').isLength({ min: 1 }),
  body('email').isEmail(),
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        let sql = "insert into  propietarios set ?"
        console.log('Registro recibido: ',req.body);
            let poststr = {
            nombres : req.body.nombres,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email
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
  ruta.delete('/cliente/:id', function(req, res) {
    const propietarioId = req.params.id;

    // Primero, desvincula los apartamentos relacionados
    let sql = "UPDATE apartamentos SET propietarios_id = NULL WHERE propietarios_id = ?";
    conexion.query(sql, [propietarioId], function(error) {
        if (error) {
            console.error("Error al desvincular apartamentos:", error);
            return res.status(500).json({ error: 'Error al desvincular apartamentos.' });
        }

        // Luego, elimina el propietario
        sql = "DELETE FROM propietarios WHERE id = ?";
        conexion.query(sql, [propietarioId], function(error, results) {
            if (error) {
                console.error("Error al eliminar propietario:", error);
                return res.status(500).json({ error: 'Error al eliminar propietario.' });
            }

            if (results.affectedRows) {
                res.json({ status: 'Registro eliminado' });
            } else {
                res.json({ status: 'No se pudo eliminar' });
            }
        });
    });
});

  //------- getasesor  ---------------------​
  ruta.put('/cliente', 
  body('nombres').isLength({ min: 1 }),
  body('apellidos').isLength({ min: 1 }),
  body('direccion').isLength({ min: 1 }),
  body('telefono').isLength({ min: 1 }),
  body('email').isEmail(),
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let sql = "update propietarios set nombres= ?,apellidos = ?,direccion =?, telefono = ?,email= ? where id = ?"
    conexion.query(sql, [req.body.nombres,req.body.apellidos,req.body.direccion,req.body.telefono,req.body.email,req.body.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
        res.json({status: 'Registro actualizado'})
      }
      else
        res.json({status: 'No se pudo actualizar'})
     });
  })
module.exports = ruta;