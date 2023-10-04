const mongoose = require('mongoose');

const AlmacenSchema = new mongoose.Schema({
  sede_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sede'
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto' 
    }
  ],
  
}, { collection: 'Almacen' });

const Almacen = mongoose.model('Almacen', AlmacenSchema);

module.exports = { Almacen, AlmacenSchema };
