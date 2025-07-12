// index.js
const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./config/database');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
