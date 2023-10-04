const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proveedor'
  },
  nombre: String
});

const EmpleadoSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado'
  },
  nombre: String
});

const AlmacenSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Almacen'
  },
  nombre: String,
  ubicacion: String
});

const SedeSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  ciudad: String,
  pais: String,
  telefono: String,
  almacen: AlmacenSchema,
  proveedores: [ProveedorSchema],
  empleados: [EmpleadoSchema]
}, { collection: 'Sedes' });

const Sede = mongoose.model('Sede', SedeSchema);

module.exports = { Sede };
