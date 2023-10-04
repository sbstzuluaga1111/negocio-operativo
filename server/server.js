const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

// Conecta a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Manejadores de eventos de conexión
const db = mongoose.connection;

// Evento de conexión exitosa
db.on('connected', () => {
  console.log('Conexión a la base de datos MongoDB exitosa');
});

// Evento de error en la conexión
db.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
});

// Define un modelo para las sedes
const SedeSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    ciudad: String,
    pais: String,
    telefono: String,
  }, { collection: 'Sedes' }); // Especifica el nombre de la colección
  
  const Sede = mongoose.model('Sede', SedeSchema); 

// Ruta para obtener todas las sedes
app.get('/sedes', async (req, res) => {
  try {
    const sedes = await Sede.find();
    res.json(sedes);
  } catch (error) {
    console.error('Error al obtener las sedes:', error);
    res.status(500).json({ error: 'Error al obtener las sedes' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
