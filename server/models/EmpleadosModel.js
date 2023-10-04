const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre: String,
  puesto: String,
  salario: Number,
}, { collection: 'Empleados' });

const Empleado = mongoose.model('Empleado', EmpleadoSchema);

module.exports = { Empleado, EmpleadoSchema };
