//rutas de acceso por la URL a la API
const route = require("express").Router();

const rutacliente =  require("../controller/propietariosController");
route.use("/propietarios", rutacliente);

const rutatorres =  require("../controller/torresController");
route.use("/torres", rutatorres);

const rutatarifas =  require("../controller/tarifasController");
route.use("/tarifas", rutatarifas);

const rutapagos =  require("../controller/pagosController");
route.use("/apartapagos", rutapagos);

const rutaapartamentos =  require("../controller/apartamentosController");
route.use("/apartamentos", rutaapartamentos);

module.exports=route