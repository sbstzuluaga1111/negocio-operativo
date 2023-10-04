const express = require('express');
const router = express.Router();
const generalControllers = require('../controllers/generalControllers');

router.get('/sedes', generalControllers.getSedes);

router.get('/proveedores', generalControllers.getProveedores);

router.get('/empleados', generalControllers.getEmpleados);

router.get('/productos', generalControllers.getProductos);

router.get('/clientes', generalControllers.getClientes);

router.get('/almacen', generalControllers.getAlmacen);

router.get('/compras', generalControllers.getCompras);

router.get('/ventas', generalControllers.getVentas);

module.exports = router;
