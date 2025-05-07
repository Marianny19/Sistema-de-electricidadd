const express = require('express');
const cors = require('cors');
const conexion = require('./database');
const Cliente = require('./models/cliente');
const Empleado = require('./models/empleado');

const app = express();
const port = 8081;

app.use(cors()); 
app.use(express.json());

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Ruta GET para obtener todos los clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Ruta POST para registrar un nuevo cliente
app.post('/clientes', async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    res.status(500).json({ error: 'Error al registrar cliente' });
  }
});


// Ruta GET para obtener todos los empleados
app.get('/empleados', async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

// Ruta POST para registrar un nuevo empleado
app.post('/empleados', async (req, res) => {
  try {
    const nuevoEmpleado = await Empleado.create(req.body);
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    console.error('Error al registrar empleado:', error);
    res.status(500).json({ error: 'Error al registrar empleado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
