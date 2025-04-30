// backend/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');  // Asegúrate de que la ruta esté importada

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', productRoutes);
app.use('/api', saleRoutes);  // Aquí se incluye la ruta de ventas

app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
