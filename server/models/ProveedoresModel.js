const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
  correo: String,
  sede_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sede'
  }
}, { collection: 'Proveedores' });

const Proveedor = mongoose.model('Proveedor', ProveedorSchema);

module.exports = { Proveedor, ProveedorSchema };
