const { Sede } = require('../models/SedesModel');
const { Proveedor } = require('../models/ProveedoresModel');
const { Empleado } = require('../models/EmpleadosModel');
const { Producto } = require('../models/ProductosModel');
const { Almacen } = require('../models/AlmacenModel');
const { Cliente } = require('../models/ClienteModel');
const { Compra } = require('../models/CompraModel');
const { Venta } = require('../models/VentaModel');

exports.getSedes = async (req, res) => {
  try {
    const sedes = await Sede.find();
    res.json(sedes);
  } catch (error) {
    console.error('Error al obtener las sedes:', error);
    res.status(500).json({ error: 'Error al obtener las sedes' });
  }
};

exports.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    console.error('Error al obtener los proveedores:', error);
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

exports.getAlmacen = async (req, res) => {
  try {
    const almacen = await Almacen.find();
    res.json(almacen);
  } catch (error) {
    console.error('Error al obtener los almacenes:', error);
    res.status(500).json({ error: 'Error al obtener los almacenes' });
  }
};

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

exports.getCompras = async (req, res) => {
  try {
    const compras = await Compra.find();
    res.json(compras);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
};

exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

