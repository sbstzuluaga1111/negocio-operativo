const { Sede } = require('../models/SedesModel');
const { Proveedor } = require('../models/ProveedoresModel');
const { Empleado } = require('../models/EmpleadosModel');
const { Producto } = require('../models/ProductosModel');
const { Almacen } = require('../models/AlmacenModel');
const { Cliente } = require('../models/ClienteModel');
const { Compra } = require('../models/CompraModel');
const { Venta } = require('../models/VentaModel');


////////////////////////////////////////////////////

exports.getSedes = async (req, res) => {
  try {
    const sedes = await Sede.find();
    res.json(sedes);
  } catch (error) {
    console.error('Error al obtener las sedes:', error);
    res.status(500).json({ error: 'Error al obtener las sedes' });
  }
};

exports.agregarSede = async (req, res) => {
  try {
    const {
      nombre,
      direccion,
      ciudad,
      pais,
      telefono,
      almacenNombre,
      almacenUbicacion,
      proveedores,
      empleados
    } = req.body;

    const nuevaSede = new Sede({
      nombre,
      direccion,
      ciudad,
      pais,
      telefono,
      almacen: {
        nombre: almacenNombre,
        ubicacion: almacenUbicacion
      },
      proveedores,
      empleados
    });

    const sedeAgregada = await nuevaSede.save();

    res.status(201).json(sedeAgregada);
  } catch (error) {
    console.error('Error al agregar la sede:', error);
    res.status(500).json({ error: 'Error al agregar la sede' });
  }
};

exports.eliminarSede = async (req, res) => {
  try {
    const sedeId = req.params.id;
    const sedeEliminada = await Sede.findByIdAndDelete(sedeId);

    if (!sedeEliminada) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }

    res.json(sedeEliminada);
  } catch (error) {
    console.error('Error al eliminar la sede:', error);
    res.status(500).json({ error: 'Error al eliminar la sede' });
  }
};

exports.editarSede = async (req, res) => {
  try {
    const sedeId = req.params.id;
    const datosActualizados = req.body;

    const sedeActualizada = await Sede.findByIdAndUpdate(
      sedeId,
      datosActualizados,
      { new: true }
    );

    if (!sedeActualizada) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }

    res.json(sedeActualizada);
  } catch (error) {
    console.error('Error al editar la sede:', error);
    res.status(500).json({ error: 'Error al editar la sede' });
  }
};

///////////////////////////////////////////////////////////////////////////////

exports.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    console.error('Error al obtener los proveedores:', error);
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

exports.agregarProveedores = async (req, res) => {
  try {
    const { nombre, direccion, telefono, correo, sede_id } = req.body;

    const nuevoProveedor = new Proveedor({
      nombre,
      direccion,
      telefono,
      correo,
      sede_id,
    });

    const proveedorAgregado = await nuevoProveedor.save();

    res.status(201).json(proveedorAgregado);
  } catch (error) {
    console.error('Error al agregar el proveedor:', error);
    res.status(500).json({ error: 'Error al agregar el proveedor' });
  }
};

exports.eliminarProveedores = async (req, res) => {
  try {
    const proveedorId = req.params.id;
    const proveedorEliminado = await Proveedor.findByIdAndDelete(proveedorId);

    if (!proveedorEliminado) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    res.json(proveedorEliminado);
  } catch (error) {
    console.error('Error al eliminar el proveedor:', error);
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
};

exports.editarProveedores = async (req, res) => {
  try {
    const proveedorId = req.params.id;
    const datosActualizados = req.body;

    const proveedorActualizado = await Proveedor.findByIdAndUpdate(
      proveedorId,
      datosActualizados,
      { new: true }
    );

    if (!proveedorActualizado) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    res.json(proveedorActualizado);
  } catch (error) {
    console.error('Error al editar el proveedor:', error);
    res.status(500).json({ error: 'Error al editar el proveedor' });
  }
};


/////////////////////////////////////////////////////////////////
exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

exports.agregarEmpleado = async (req, res) => {
  try {
    const { nombre, apellido, direccion, puesto, salario } = req.body;

    const nuevoEmpleado = new Empleado({
      nombre,
      apellido,
      direccion,
      puesto,
      salario,
    });

    const empleadoAgregado = await nuevoEmpleado.save();

    res.status(201).json(empleadoAgregado);
  } catch (error) {
    console.error('Error al agregar el empleado:', error);
    res.status(500).json({ error: 'Error al agregar el empleado' });
  }
};


exports.eliminarEmpleado = async (req, res) => {
  try {
    const empleadoId = req.params.id;
    const empleadoEliminado = await Empleado.findByIdAndDelete(empleadoId);

    if (!empleadoEliminado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.json(empleadoEliminado);
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};

exports.editarEmpleado = async (req, res) => {
  try {
    const empleadoId = req.params.id;
    const { nombre, apellido, direccion, puesto, salario } = req.body;

    const datosActualizados = {
      nombre,
      apellido,
      direccion, 
      puesto,
      salario,
    };

    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      empleadoId,
      datosActualizados,
      { new: true }
    );

    if (!empleadoActualizado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.json(empleadoActualizado);
  } catch (error) {
    console.error('Error al editar el empleado:', error);
    res.status(500).json({ error: 'Error al editar el empleado' });
  }
};


///////////////////////////////////////////////////////////////

exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

exports.agregarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, proveedor_id } = req.body;

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      proveedor_id,
    });

    const productoAgregado = await nuevoProducto.save();

    res.status(201).json(productoAgregado);
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const productoId = req.params.id;
    const productoEliminado = await Producto.findByIdAndDelete(productoId);

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoEliminado);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

exports.editarProducto = async (req, res) => {
  try {
    const productoId = req.params.id;
    const datosActualizados = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      productoId,
      datosActualizados,
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error('Error al editar el producto:', error);
    res.status(500).json({ error: 'Error al editar el producto' });
  }
};


//////////////////////////////////////////////////////////////

exports.getAlmacenes = async (req, res) => {
  try {
    const almacenes = await Almacen.find();
    res.json(almacenes);
  } catch (error) {
    console.error('Error al obtener los almacenes:', error);
    res.status(500).json({ error: 'Error al obtener los almacenes' });
  }
};

exports.agregarAlmacen = async (req, res) => {
  try {
    const { sede_id, productos } = req.body;

    const nuevoAlmacen = new Almacen({
      sede_id,
      productos,
    });

    const almacenAgregado = await nuevoAlmacen.save();

    res.status(201).json(almacenAgregado);
  } catch (error) {
    console.error('Error al agregar el almacen:', error);
    res.status(500).json({ error: 'Error al agregar el almacen' });
  }
};

exports.eliminarAlmacen = async (req, res) => {
  try {
    const almacenId = req.params.id;
    const almacenEliminado = await Almacen.findByIdAndDelete(almacenId);

    if (!almacenEliminado) {
      return res.status(404).json({ error: 'Almacen no encontrado' });
    }

    res.json(almacenEliminado);
  } catch (error) {
    console.error('Error al eliminar el almacen:', error);
    res.status(500).json({ error: 'Error al eliminar el almacen' });
  }
};

exports.editarAlmacen = async (req, res) => {
  try {
    const almacenId = req.params.id;
    const datosActualizados = req.body;

    const almacenActualizado = await Almacen.findByIdAndUpdate(
      almacenId,
      datosActualizados,
      { new: true }
    );

    if (!almacenActualizado) {
      return res.status(404).json({ error: 'Almacen no encontrado' });
    }

    res.json(almacenActualizado);
  } catch (error) {
    console.error('Error al editar el almacen:', error);
    res.status(500).json({ error: 'Error al editar el almacen' });
  }
};


////////////////////////////////////////////////////////////

// Controladores de Clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

exports.agregarCliente = async (req, res) => {
  try {
    const { nombre, direccion, ciudad, pais, telefono } = req.body;

    const nuevoCliente = new Cliente({
      nombre,
      direccion,
      ciudad,
      pais,
      telefono,
    });

    const clienteAgregado = await nuevoCliente.save();

    res.status(201).json(clienteAgregado);
  } catch (error) {
    console.error('Error al agregar el cliente:', error);
    res.status(500).json({ error: 'Error al agregar el cliente' });
  }
};

exports.eliminarCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const clienteEliminado = await Cliente.findByIdAndDelete(clienteId);

    if (!clienteEliminado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(clienteEliminado);
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};

exports.editarCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const datosActualizados = req.body;

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      clienteId,
      datosActualizados,
      { new: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(clienteActualizado);
  } catch (error) {
    console.error('Error al editar el cliente:', error);
    res.status(500).json({ error: 'Error al editar el cliente' });
  }
};


//////////////////////////////////////////////////////////

// Controladores de Compras
exports.getCompras = async (req, res) => {
  try {
    const compras = await Compra.find();
    res.json(compras);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
};

exports.agregarCompra = async (req, res) => {
  try {
    const {
      fecha,
      producto_id,
      proveedor_id,
      sede_id,
      almacen_id,
      cantidad,
      precio_unitario,
    } = req.body;

    const nuevaCompra = new Compra({
      fecha,
      producto_id,
      proveedor_id,
      sede_id,
      almacen_id,
      cantidad,
      precio_unitario,
    });

    const compraAgregada = await nuevaCompra.save();

    res.status(201).json(compraAgregada);
  } catch (error) {
    console.error('Error al agregar la compra:', error);
    res.status(500).json({ error: 'Error al agregar la compra' });
  }
};

exports.eliminarCompra = async (req, res) => {
  try {
    const compraId = req.params.id;
    const compraEliminada = await Compra.findByIdAndDelete(compraId);

    if (!compraEliminada) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }

    res.json(compraEliminada);
  } catch (error) {
    console.error('Error al eliminar la compra:', error);
    res.status(500).json({ error: 'Error al eliminar la compra' });
  }
};

exports.editarCompra = async (req, res) => {
  try {
    const compraId = req.params.id;
    const datosActualizados = req.body;

    const compraActualizada = await Compra.findByIdAndUpdate(
      compraId,
      datosActualizados,
      { new: true }
    );

    if (!compraActualizada) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }

    res.json(compraActualizada);
  } catch (error) {
    console.error('Error al editar la compra:', error);
    res.status(500).json({ error: 'Error al editar la compra' });
  }
};


/////////////

// Controladores de Ventas
exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

exports.agregarVenta = async (req, res) => {
  try {
    const {
      fecha,
      producto_id,
      cliente_id,
      empleado_id,
      almacen_id,
      cantidad,
      precio_unitario,
    } = req.body;

    const nuevaVenta = new Venta({
      fecha,
      producto_id,
      cliente_id,
      empleado_id,
      almacen_id,
      cantidad,
      precio_unitario,
    });

    const ventaAgregada = await nuevaVenta.save();

    res.status(201).json(ventaAgregada);
  } catch (error) {
    console.error('Error al agregar la venta:', error);
    res.status(500).json({ error: 'Error al agregar la venta' });
  }
};

exports.eliminarVenta = async (req, res) => {
  try {
    const ventaId = req.params.id;
    const ventaEliminada = await Venta.findByIdAndDelete(ventaId);

    if (!ventaEliminada) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json(ventaEliminada);
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    res.status(500).json({ error: 'Error al eliminar la venta' });
  }
};

exports.editarVenta = async (req, res) => {
  try {
    const ventaId = req.params.id;
    const datosActualizados = req.body;

    const ventaActualizada = await Venta.findByIdAndUpdate(
      ventaId,
      datosActualizados,
      { new: true }
    );

    if (!ventaActualizada) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json(ventaActualizada);
  } catch (error) {
    console.error('Error al editar la venta:', error);
    res.status(500).json({ error: 'Error al editar la venta' });
  }
};

