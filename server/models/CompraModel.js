const mongoose = require('mongoose');

const CompraSchema = new mongoose.Schema({
  fecha: Date,
  producto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto' // Referencia al modelo de Producto
  },
  proveedor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proveedor' // Referencia al modelo de Proveedor
  },
  sede_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sede' // Referencia al modelo de Sede
  },
  almacen_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Almacen' // Referencia al modelo de Almacen
  },
  cantidad: Number,
  precio_unitario: Number
}, { collection: 'Compras' });

const Compra = mongoose.model('Compra', CompraSchema);

module.exports = { Compra, CompraSchema };
