const express = require('express');
const cors = require('cors');
const conexion = require('./database');
const Cliente = require('./models/cliente');
const Empleado = require('./models/empleado');
const Nota = require('./models/nota')
const Cita = require('./models/cita');
const Solicitudservicio = require('./models/solicitudservicio');
const Registrotrabajo = require('./models/registrotrabajo');
const Pago = require('./models/pago');

const app = express();
const port = 8081;

app.use(cors()); 
app.use(express.json());

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
app.get('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findOne({ where: { id_cliente: id } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
});

app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findOne({ where: { id_cliente: id } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    await cliente.update(req.body);
    res.json({ mensaje: 'Cliente actualizado correctamente', cliente });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findOne({ where: { id_cliente: id } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    await cliente.destroy();
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
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
//Obtener un empleado por ID
app.get('/empleados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findOne({ where: { id_empleado: id } });
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(empleado);
  } catch (error) {
    console.error('Error al obtener empleado:', error);
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
});


//Actualizar empleado
app.put('/empleados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findOne({ where: { id_empleado: id } });
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    await empleado.update(req.body);
    res.json({ mensaje: 'Empleado actualizado correctamente', empleado });
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
});
app.delete('/empleados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findOne({ where: { id_empleado: id } });
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    await empleado.destroy();
    res.json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
});



// Ruta GET para obtener todas las notas
app.get('/notas', async (req, res) => {
  try {
    const Notas = await Nota.findAll();
    res.json(Notas);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
});

// Ruta POST para crear una nueva nota
app.post('/notas', async (req, res) => {
  try {
    const nuevaNota = await Nota.create(req.body);
    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al registrar nota:', error);
    res.status(500).json({ error: 'Error al registar nota' });  
  }
});

// Ruta GET para obtener todas las citas
app.get('/citas', async (req, res) => {
  try {
    const Citas = await Cita.findAll();
    res.json(Citas);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ error: 'Error al obtener citas' });
  }
});

// Ruta POST para crear una nueva cita
app.post('/citas', async (req, res) => {
  try {
    const nuevaCita = await Cita.create(req.body);
    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error('Error al registrar cita:', error);
    res.status(500).json({ error: 'Error al registar cita' });  
  }
});

// Ruta GET para obtener todas las solicitudes de servicio
app.get('/solicitudservicio', async (req, res) => {
  try {
    const Solicitud = await Solicitudservicio.findAll();
    res.json(Solicitud);
  } catch (error) {
    console.error('Error al obtener solicitud:', error);
    res.status(500).json({ error: 'Error al obtener solicitud' });
  }
});

// Ruta POST para crear una nueva solicitud de servicio
app.post('/solicitudservicio', async (req, res) => {
  try {
    const nuevaSolicitud = await Solicitudservicio.create(req.body);
    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    console.error('Error al registrar solicitud:', error);
    res.status(500).json({ error: 'Error al registar solicitud' });  
  }
});

// Ruta GET para obtener todos los registros de trabajo
app.get('/registrotrabajo', async (req, res) => {
  try {
    const Registro = await Registrotrabajo.findAll();
    res.json(Registro);
  } catch (error) {
    console.error('Error al obtener registro:', error);
    res.status(500).json({ error: 'Error al obtener registro' });
  }
});

// Ruta POST para crear unnuevo registro de trabajo
app.post('/registrotrabajo', async (req, res) => {
  try {
    const nuevoRegistro = await Registrotrabajo.create(req.body);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error('Error al registrar registro:', error);
    res.status(500).json({ error: 'Error al registar registro' });  
  }
});

// Ruta GET para obtener todos los pagos
app.get('/pagos', async (req, res) => {
  try {
    const Pagos = await Pago.findAll();
    res.json(Pagos);
  } catch (error) {
    console.error('Error al obtener pago:', error);
    res.status(500).json({ error: 'Error al obtener pago' });
  }
});

// Ruta POST para crear un nuevo pago
app.post('/pagos', async (req, res) => {
  try {
    const nuevoPago = await Pago.create(req.body);
    res.status(201).json(nuevoPago);
  } catch (error) {
    console.error('Error al registrar pago:', error);
    res.status(500).json({ error: 'Error al registar pago' });  
  }
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
