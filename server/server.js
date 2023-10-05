const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Link de la Base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Negocio-Operativo',
});

// Base de datos conexion
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Conexión a la base de datos MongoDB exitosa');
});
db.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
});

// Rutas
const generalRoutes = require('./routes/generalRoutes');

app.use('/', generalRoutes);

// Arranque del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
