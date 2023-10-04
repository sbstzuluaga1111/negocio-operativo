const express = require('express');
const router = express.Router();
const generalControllers = require('../controllers/generalControllers');

router.get('/sedes', generalControllers.getSedes);
router.post('/sedes', generalControllers.agregarSede);
router.delete('/sedes/:id', generalControllers.eliminarSede);
router.put('/sedes/:id', generalControllers.editarSede);

router.get('/proveedores', generalControllers.getProveedores);
router.post('/proveedores', generalControllers.agregarProveedores);
router.delete('/proveedores/:id', generalControllers.eliminarProveedores);
router.put('/proveedores/:id', generalControllers.editarProveedores);

router.get('/empleados', generalControllers.getEmpleados);
router.post('/empleados', generalControllers.agregarEmpleado);
router.delete('/empleados/:id', generalControllers.eliminarEmpleado);
router.put('/empleados/:id', generalControllers.editarEmpleado);

router.get('/productos', generalControllers.getProductos);
router.post('/productos', generalControllers.agregarProducto);
router.delete('/productos/:id', generalControllers.eliminarProducto);
router.put('/productos/:id', generalControllers.editarProducto);

router.get('/almacen', generalControllers.getAlmacenes);
router.post('/almacen', generalControllers.agregarAlmacen);
router.delete('/almacen/:id', generalControllers.eliminarAlmacen);
router.put('/almacen/:id', generalControllers.editarAlmacen);

router.get('/clientes', generalControllers.getClientes);
router.post('/clientes', generalControllers.agregarCliente);
router.delete('/clientes/:id', generalControllers.eliminarCliente);
router.put('/clientes/:id', generalControllers.editarCliente);

router.get('/compras', generalControllers.getCompras);
router.post('/compras', generalControllers.agregarCompra);
router.delete('/compras/:id', generalControllers.eliminarCompra);
router.put('/compras/:id', generalControllers.editarCompra);

router.get('/ventas', generalControllers.getVentas);
router.post('/ventas', generalControllers.agregarVenta);
router.delete('/ventas/:id', generalControllers.eliminarVenta);
router.put('/ventas/:id', generalControllers.editarVenta);

module.exports = router;
