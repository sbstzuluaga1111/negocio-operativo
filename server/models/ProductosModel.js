const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  proveedor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proveedor'
  }
}, { collection: 'Productos' });

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = { Producto, ProductoSchema };
