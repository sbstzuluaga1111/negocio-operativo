const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
  fecha: Date,
  producto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto'
  },
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente' 
  },
  empleado_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado'
  },
  almacen_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Almacen'
  },
  cantidad: Number,
  precio_unitario: Number
}, { collection: 'Ventas' });

const Venta = mongoose.model('Venta', VentaSchema);

module.exports = { Venta, VentaSchema };
