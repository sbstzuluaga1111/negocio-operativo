const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  ciudad: String,
  pais: String,
  telefono: String,
}, { collection: 'Clientes' });

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = { Cliente, ClienteSchema };
