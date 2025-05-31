const express = require('express');
const cors = require('cors');
const conexion = require('./database');
const Cliente = require('./models/cliente');
const Empleado = require('./models/empleado');
const Nota = require('./models/nota')
const Cita = require('./models/cita');
const Solicitudservicio = require('./models/solicitudservicio');
const Registrotrabajo = require('./models/Detalleregistrotrabajo');
const Pago = require('./models/pago');
const Servicio = require('./models/Servicio');
const DetalleSolicitudServicio = require('./models/DetalleSolicitudServicio');
const DetalleCita  = require('./models/detallecita'); 
const Usuario = require('./models/usuario');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); 
const Cotizacion = require('./models/Cotizacion');
const DetalleCotizacion = require('./models/DetalleCotizacion');
const Detalleregistrotrabajo = require('./models/Detalleregistrotrabajo');
const Factura = require('./models/factura');
const DetalleFactura = require('./models/detallefactura');
const sequelize = require('./database'); 



Cliente.hasMany(Cita, { foreignKey: 'id_cliente' });
Cita.belongsTo(Cliente, { foreignKey: 'id_cliente' });

Cliente.hasMany(Cita, { foreignKey: 'id_cliente' });
Cita.belongsTo(Cliente, { foreignKey: 'id_cliente' });

Empleado.hasMany(Cita, { foreignKey: 'id_empleado' });
Cita.belongsTo(Empleado, { foreignKey: 'id_empleado' });

DetalleCita.belongsTo(Cita, { foreignKey: 'id_cita' });
DetalleCita.belongsTo(Servicio, { foreignKey: 'id_servicio' });

Cita.belongsToMany(Servicio, {
  through: DetalleCita,
  foreignKey: 'id_cita',
  otherKey: 'id_servicio'
});

Servicio.belongsToMany(Cita, {
  through: DetalleCita,
  foreignKey: 'id_servicio',
  otherKey: 'id_cita'
});

Cliente.hasMany(Solicitudservicio, { foreignKey: 'id_cliente' });
Solicitudservicio.belongsTo(Cliente, { foreignKey: 'id_cliente' });

Factura.hasMany(DetalleFactura, { foreignKey: 'factura_id', as: 'detalles' });

Solicitudservicio.belongsToMany(Servicio, {
  through: {
    model: DetalleSolicitudServicio,
    unique: false
  },
  foreignKey: 'id_solicitud',
  otherKey: 'id_servicio'
});

Solicitudservicio.hasMany(Pago, { foreignKey: 'id_solicitud' });
Pago.belongsTo(Solicitudservicio, { foreignKey: 'id_solicitud' });

Servicio.belongsToMany(Solicitudservicio, {
  through: {
    model: DetalleSolicitudServicio,
    unique: false
  },
  foreignKey: 'id_servicio',
  otherKey: 'id_solicitud'
});
Factura.belongsTo(Solicitudservicio, { as: 'solicitud', foreignKey: 'solicitud_id' });
Solicitudservicio.hasMany(Factura, { foreignKey: 'solicitud_id' });

Servicio.hasMany(DetalleCotizacion, { foreignKey: 'id_servicio' });



DetalleCotizacion.belongsTo(Servicio, { foreignKey: 'id_servicio', as: 'servicio' });
DetalleCotizacion.belongsTo(Cotizacion, { foreignKey: 'id_cotizacion' });

Cotizacion.hasMany(DetalleCotizacion, { foreignKey: 'id_cotizacion', as: 'detalles' });
Cotizacion.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

Registrotrabajo.belongsToMany(Servicio, {
  through: 'detalleregistro',
  foreignKey: 'id_registro_trabajo',
  otherKey: 'id_servicio',
  as: 'Servicios'   
});
Servicio.belongsToMany(Registrotrabajo, {
  through: 'detalleregistro',
  foreignKey: 'id_servicio',
  otherKey: 'id_registro_trabajo',
  as: 'RegistrosTrabajo'  
});

Nota.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Cliente.hasMany(Nota, { foreignKey: 'id_cliente' });

Solicitudservicio.hasMany(Registrotrabajo, { foreignKey: 'id_solicitud_servicio' });
Registrotrabajo.belongsTo(Solicitudservicio, { foreignKey: 'id_solicitud_servicio' });

Factura.hasMany(Pago, { foreignKey: 'factura_id', as: 'pagos' });
Pago.belongsTo(Factura, { foreignKey: 'factura_id' });



DetalleCotizacion.belongsTo(Servicio, { foreignKey: 'id_servicio', as: 'servicio' });
DetalleCotizacion.belongsTo(Cotizacion, { foreignKey: 'id_cotizacion' });

Cotizacion.hasMany(DetalleCotizacion, { foreignKey: 'id_cotizacion', as: 'detalles' });
Cotizacion.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

Registrotrabajo.belongsToMany(Servicio, {
  through: 'detalleregistro',
  foreignKey: 'id_registro_trabajo',
  otherKey: 'id_servicio',
  as: 'Servicios'   
});
Servicio.belongsToMany(Registrotrabajo, {
  through: 'detalleregistro',
  foreignKey: 'id_servicio',
  otherKey: 'id_registro_trabajo',
  as: 'RegistrosTrabajo'  
});


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
    await cliente.update({ estado: 'inactivo' });

    res.json({ mensaje: 'Cliente marcado como inactivo correctamente' });
  } catch (error) {
    console.error('Error al actualizar estado del cliente:', error);
    res.status(500).json({ error: 'Error al actualizar estado del cliente' });
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
    await empleado.update({ estado: 'inactivo' });

    res.json({ mensaje: 'Empleado marcado como inactivo correctamente' });
  } catch (error) {
    console.error('Error al actualizar estado del empleado:', error);
    res.status(500).json({ error: 'Error al actualizar estado del empleado' });
  }
});

app.get('/notas', async (req, res) => {
  try {
    const notas = await Nota.findAll({
      include: {
        model: Cliente,
        attributes: ['nombre'] 
      }
    });
    res.json(notas);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
});


app.post('/notas', async (req, res) => {
  try {
    const { id_cliente, comentario, fecha_creacion, estado } = req.body;

    if (!id_cliente) {
      return res.status(400).json({ error: 'El id_cliente es obligatorio' });
    }
    if (!comentario || !fecha_creacion || !estado) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear la nota en la base
    const nuevaNota = await Nota.create({
      id_cliente,
      comentario,
      fecha_creacion,
      estado,
    });

    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/citas', async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        {
          model: Cliente,
          attributes: ['nombre']
        },
        {
          model: Empleado,
          attributes: ['nombre']
        },
        {
          model: Servicio, 
          through: { attributes: [] },
          attributes: ['nombre_servicio']
        }
      ]
    });

    const citasConServicios = citas.map(cita => {
      const citaJson = cita.toJSON();
      citaJson.nombre_cliente = cita.Cliente ? cita.Cliente.nombre : 'Sin cliente';
      citaJson.nombre_empleado = cita.Empleado ? cita.Empleado.nombre : 'Sin empleado';

      citaJson.servicios = citaJson.Servicios && citaJson.Servicios.length
        ? citaJson.Servicios.map(s => s.nombre_servicio).join(', ')
        : 'No hay servicios';

      return citaJson;
    });

    res.json(citasConServicios);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ error: 'Error al obtener citas', detalles: error.message });
  }
});



// POST /citas
app.post('/citas', async (req, res) => {
  try {
    const { id_cliente, id_empleado, id_solicitud, fecha, hora, servicios } = req.body;

    if (!id_cliente || !id_empleado || !id_solicitud || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const solicitud = await Solicitudservicio.findByPk(id_solicitud);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (solicitud.estado === 'cancelada' || solicitud.estado === 'realizada') {
      console.log(`La solicitud ${id_solicitud} está ${solicitud.estado}, no se puede agendar cita.`);
      return res.status(400).json({ error: 'No se pueden crear citas para solicitudes canceladas o realizadas' });
    }

    const citaExistente = await Cita.findOne({
      where: { id_empleado, fecha, hora }
    });

    if (citaExistente) {
      return res.status(400).json({
        error: 'Ya existe una cita para ese empleado en esa fecha y hora.'
      });
    }

    const citaNueva = await Cita.create({
      id_cliente,
      id_empleado,
      id_solicitud,
      fecha,
      hora,
      estado: 'agendada'
    });

    if (Array.isArray(servicios) && servicios.length > 0) {
      const detalles = servicios.map(id_servicio => ({
        id_cita: citaNueva.id_cita,
        id_servicio
      }));
      await DetalleCita.bulkCreate(detalles);
    }

    return res.json({
      message: 'Cita creada correctamente',
      cita: citaNueva
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'La fecha y la hora que seleccionaste no están disponibles, intenta con otra'
    });
  }
});



//Actualizar cita
app.put('/citas/:id', async (req, res) => {
  const { id } = req.params;
  const { servicios, ...restoCita } = req.body;

  try {
    const cita = await Cita.findOne({ where: { id_cita: id } });
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    await cita.update(restoCita);

    if (Array.isArray(servicios)) {
      try {
        await DetalleCita.destroy({ where: { id_cita: id } });

        const creaciones = servicios.map((id_servicio) =>
          DetalleCita.create({
            id_cita: cita.id_cita,
            id_servicio
          })
        );
        await Promise.all(creaciones);
      } catch (error) {
        console.error('Error al actualizar servicios:', error);
        return res.status(500).json({ error: 'Error al actualizar servicios de la cita' });
      }
    }

    let citaActualizada;
    try {
      citaActualizada = await Cita.findByPk(id, {
        include: [
          { model: Cliente, attributes: ['nombre'] },
          { model: Empleado, attributes: ['nombre'] },
          {
            model: Servicio,
            attributes: ['nombre'],
            through: { attributes: [] }
          }
        ]
      });
    } catch (error) {
      console.error('Error al obtener cita actualizada con relaciones:', error);
      return res.status(200).json({
        mensaje: 'Cita actualizada, pero no se pudo recuperar los datos completos',
        cita: null
      });
    }

    if (!citaActualizada) {
      return res.status(200).json({
        mensaje: 'Cita actualizada, pero no se encontró en consulta posterior',
        cita: null
      });
    }

    return res.json({
      mensaje: 'Cita actualizada correctamente',
      cita: citaActualizada
    });

  } catch (error) {
    console.error('Error general al actualizar cita:', error);
    return res.status(500).json({ error: 'Error general al actualizar cita' });
  }
});



app.get('/citas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findByPk(id, {
      include: [
        {
          model: Servicio,
          attributes: ['id_servicio', 'nombre_servicio'], 
          through: { attributes: [] }
        }
      ]
    });

    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    res.json({
      id_cita: cita.id_cita,
      id_cliente: cita.id_cliente,
      id_empleado: cita.id_empleado,
      id_solicitud: cita.id_solicitud,
      fecha: cita.fecha,
      hora: cita.hora,
      estado: cita.estado,
      servicios: cita.Servicios.map(s => ({
        id_servicio: s.id_servicio,
        nombre_servicio: s.nombre_servicio
      }))
    });
  } catch (error) {
    console.error('Error al obtener citas por ID:', error);
    res.status(500).json({ error: 'Error al obtener cita' });
  }
});

app.delete('/citas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cita = await Cita.findOne({ where: { id_cita: id } });
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    await cita.update({ estado: 'Cancelada' });

    res.json({ mensaje: 'Cita marcada como cancelada correctamente' });
  } catch (error) {
    console.error('Error al actualizar estado de la cita:', error);
    res.status(500).json({ error: 'Error al actualizar estado de la cita' });
  }
});

// GET /validar-fecha
app.get('/validar-fecha', async (req, res) => {
  try {
    const { fecha, id_empleado } = req.query;

    if (!fecha || !id_empleado) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos.' });
    }

    const citas = await Cita.findAll({
      where: { fecha, id_empleado },
      attributes: ['hora']
    });

    const todasLasHoras = [
      '08:00:00', '10:00:00', '13:00:00', '15:00:00',
      '18:00:00',
    ];

    const horasOcupadas = citas.map(cita => cita.hora);
    const horasDisponibles = todasLasHoras.filter(hora => !horasOcupadas.includes(hora));

    res.json({ horasDisponibles });

  } catch (error) {
    console.error('La hora seleccionada no esta disponible, intenta con otra hora', error);
    res.status(500).json({ error: 'La hora seleccionada no esta disponible, intenta con otra hora' });
  }
});


//get de servicios
app.get('/servicios', async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.json(servicios);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});


// Ruta GET para obtener todas las solicitudes de servicio
app.get('/solicitudservicio', async (req, res) => {
  try {
    const solicitudes = await Solicitudservicio.findAll({
      include: [
        { model: Cliente, attributes: ['nombre'] },
        {
          model: Servicio,
          attributes: ['nombre_servicio'],
          through: { attributes: [] }
        }
      ]
    });

    const respuesta = solicitudes.map((s) => ({
      id_solicitud: s.id_solicitud,
      cliente: s.Cliente?.nombre,
      servicios: s.Servicios.map(serv => serv.nombre_servicio).join(', '),
      direccion: s.direccion,
      via_comunicacion: s.via_comunicacion,
      fecha: s.fecha,
      hora: s.hora,
      estado: s.estado
    }));

    res.json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
});
 

app.get('/solicitudservicio/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const solicitud = await Solicitudservicio.findByPk(id, {
      include: [
        {
          model: Servicio,
          attributes: ['id_servicio', 'nombre_servicio'], 
          through: { attributes: [] }
        }
      ]
    });

    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.json({
      id_cliente: solicitud.id_cliente,
      direccion: solicitud.direccion,
      via_comunicacion: solicitud.via_comunicacion,
      fecha: solicitud.fecha,
      hora: solicitud.hora,
      estado: solicitud.estado,
      servicios: solicitud.Servicios.map(s => ({
        id_servicio: s.id_servicio,
        nombre_servicio: s.nombre_servicio
      }))
    });
  } catch (error) {
    console.error('Error al obtener solicitud por ID:', error);
    res.status(500).json({ error: 'Error al obtener solicitud' });
  }
});


app.post('/solicitudservicio', async (req, res) => {
  try {
    const { id_cliente, direccion, via_comunicacion, fecha, hora, estado, servicios } = req.body;

    if (!Array.isArray(servicios) || servicios.some(id => !Number.isInteger(id))) {
      return res.status(400).json({ error: 'La lista de servicios debe ser un arreglo de IDs numéricos válidos' });
    }

    const serviciosEncontrados = await Servicio.findAll({
      where: { id_servicio: servicios }
    });

    if (serviciosEncontrados.length !== servicios.length) {
      return res.status(400).json({ error: 'Uno o más servicios no existen en la base de datos' });
    }

    const nuevaSolicitud = await Solicitudservicio.create({
      id_cliente,
      direccion,
      via_comunicacion,
      fecha,
      hora,
      estado
    });

    await nuevaSolicitud.addServicios(servicios);

    res.status(201).json({ mensaje: 'Solicitud creada exitosamente' });
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    res.status(500).json({ error: 'Error al crear solicitud' });
  }
});

app.put('/solicitudservicio/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_cliente, direccion, via_comunicacion, fecha, hora, estado, servicios } = req.body;


    if (!Array.isArray(servicios) || servicios.some(id => !Number.isInteger(id))) {
      return res.status(400).json({ error: 'La lista de servicios debe ser un arreglo de IDs numéricos válidos' });
    }

    const solicitud = await Solicitudservicio.findByPk(id);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    const serviciosEncontrados = await Servicio.findAll({
      where: { id_servicio: servicios }
    });

    if (serviciosEncontrados.length !== servicios.length) {
      return res.status(400).json({ error: 'Uno o más servicios no existen en la base de datos' });
    }

    await solicitud.update({
      id_cliente,
      direccion,
      via_comunicacion,
      fecha,
      hora,
      estado
    });
    await solicitud.setServicios(servicios);

    res.json({ mensaje: 'Solicitud actualizada exitosamente' });
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    res.status(500).json({ error: 'Error al actualizar solicitud' });
  }
});
  
app.delete('/solicitudservicio/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const solicitudservicio = await Solicitudservicio.findOne({ where: { id_solicitud: id } });
    if (!solicitudservicio) {
      return res.status(404).json({ error: 'Solicitud de servicio no encontrada' });
    }
    await solicitudservicio.update({ estado: 'Cancelada' });

    res.json({ mensaje: 'Solicitud de servicio cancelada correctamente' });
  } catch (error) {
    console.error('Error al cancelar la solicitud:', error);
    res.status(500).json({ error: 'Error al cancelar la solicitud' });
  }
});

app.get('/servicios-mas-solicitados', async (req, res) => {
  try {
    const resultados = await DetalleSolicitudServicio.findAll({
      attributes: [
        'id_servicio',
        [fn('COUNT', col('id_servicio')), 'cantidad_solicitudes']
      ],
      include: [{
        model: Servicio,
        attributes: ['nombre']
      }],
      group: ['id_servicio', 'Servicio.id_servicio'],
      order: [[fn('COUNT', col('id_servicio')), 'DESC']],
      limit: 5
    });

    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener servicios más solicitados:', error);
    res.status(500).json({ error: 'Error al obtener servicios más solicitados' });
  }
});



app.get('/registrotrabajo', async (req, res) => {
  try {
    const registros = await Registrotrabajo.findAll({
      include: [
        {
          model: Servicio,
          as: 'Servicios',  
          attributes: ['id_servicio', 'nombre_servicio'],
          through: { attributes: [] }
        },
      ]
    });

    const resultado = registros.map(r => ({
      id_registro_trabajo: r.id_registro_trabajo,
      id_solicitud_servicio: r.id_solicitud_servicio,
      id_empleado: r.id_empleado,
      costo_extra: r.costo_extra,
      fecha: r.fecha,
      estado: r.estado,
      servicios: r.Servicios?.map(s => ({
        id_servicio: s.id_servicio,
        nombre_servicio: s.nombre_servicio,
      })) || []
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener registro:', error);
    res.status(500).json({ error: 'Error al obtener registro' });
  }
});


app.post('/registrotrabajo', async (req, res) => {
  try {
    const {
      id_solicitud_servicio,
      id_empleado,
      servicios,
      costo_extra,
      fecha,
      estado,
    } = req.body;

    if (!id_solicitud_servicio || !id_empleado || !fecha || !estado) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const solicitud = await Solicitudservicio.findByPk(id_solicitud_servicio);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (solicitud.estado === 'cancelada' || solicitud.estado === 'realizada') {
      console.log(`La solicitud ${id_solicitud_servicio} ya ha sido cerrada (estado: ${solicitud.estado}).`);
      return res.status(400).json({ error: 'No se pueden crear registros de trabajo para solicitudes canceladas o terminadas' });
    }

    if (servicios && (!Array.isArray(servicios) || servicios.some(id => !Number.isInteger(id)))) {
      return res.status(400).json({ error: 'La lista de servicios debe ser un arreglo de IDs numéricos válidos' });
    }

    if (servicios && servicios.length > 0) {
      const serviciosEncontrados = await Servicio.findAll({
        where: { id_servicio: servicios }
      });

      if (serviciosEncontrados.length !== servicios.length) {
        return res.status(400).json({ error: 'Uno o más servicios no existen en la base de datos' });
      }
    }

    const nuevoRegistro = await Registrotrabajo.create({
      id_solicitud_servicio,
      id_empleado,
      costo_extra,
      fecha,
      estado
    });

    await nuevoRegistro.addServicios(servicios);

    res.status(201).json({ mensaje: 'Registro de trabajo creado exitosamente' });
  } catch (error) {
    console.error("Error al crear registro:", error);
    res.status(500).json({ error: 'Error al crear registro' });
  }
});


app.get('/registrotrabajo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const registro = await Registrotrabajo.findByPk(id, {
      include: [
        {
          model: Servicio,
          as: 'Servicios', 
          attributes: ['id_servicio', 'nombre_servicio'],
          through: { attributes: [] }
        }
      ]
    });

    if (!registro) {
      return res.status(404).json({ error: 'Registro de trabajo no encontrado' });
    }

    res.json({
      id_solicitud_servicio: registro.id_solicitud_servicio,
      id_empleado: registro.id_empleado,
      costo_extra: registro.costo_extra,
      fecha: registro.fecha,
      estado: registro.estado,
      servicios: registro.Servicios.map(s => ({
        id_servicio: s.id_servicio,
        nombre_servicio: s.nombre_servicio
      }))
    });
  } catch (error) {
    console.error('Error al obtener registro de trabajo por ID:', error);
    res.status(500).json({ error: 'Error al obtener registro de trabajo' });
  }
});



app.put('/registrotrabajo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_solicitud_servicio, id_empleado, servicios, costo_extra, fecha, estado } = req.body;

    if (!Array.isArray(servicios) || servicios.some(s => !Number.isInteger(s))) {
      return res.status(400).json({ error: 'La lista de servicios debe ser un arreglo de IDs numéricos válidos' });
    }

    const registro = await Registrotrabajo.findByPk(id);
    if (!registro) {
      return res.status(404).json({ error: 'Registro de trabajo no encontrado' });
    }

    const solicitud = await Solicitudservicio.findByPk(id_solicitud_servicio);
    if (!solicitud) {
      return res.status(400).json({ error: 'La solicitud de servicio indicada no existe' });
    }

    const empleado = await Empleado.findByPk(id_empleado);
    if (!empleado) {
      return res.status(400).json({ error: 'El empleado indicado no existe' });
    }

    const serviciosEncontrados = await Servicio.findAll({
      where: { id_servicio: servicios }
    });

    if (serviciosEncontrados.length !== servicios.length) {
      return res.status(400).json({ error: 'Uno o más servicios no existen en la base de datos' });
    }

    await registro.update({
      id_solicitud_servicio,
      id_empleado,
      costo_extra,
      fecha,
      estado
    });

    await registro.setServicios(servicios);

    res.json({ mensaje: 'Registro de trabajo actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar registro de trabajo:', error);
    res.status(500).json({ error: 'Error al actualizar registro de trabajo' });
  }
});

app.delete('/registrotrabajo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const registro = await Registrotrabajo.findOne({ where: { id_registro_trabajo: id } });

    if (!registro) {
      return res.status(404).json({ error: 'Registro de trabajo no encontrado' });
    }

    await registro.update({ estado: 'inactivo' });

    res.json({ mensaje: 'Registro marcado como inactivo correctamente', registro });
  } catch (error) {
    console.error('Error al marcar registro como inactivo:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});




//GET PAGO
app.get('/pagos', async (req, res) => {
  try {
    const pagos = await Pago.findAll();
    res.status(200).json(pagos);
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    res.status(500).json({ error: 'Error al obtener los pagos' });
  }
});

app.post('/pagos', async (req, res) => {
  const {
    id_solicitud,
    factura_id,
    fecha_pago,
    monto,
    hora_pago,
    metodo_pago,
    estado,
    descripcion,
  } = req.body;

  const t = await Factura.sequelize.transaction();

  try {
    if (!id_solicitud || !monto) {
      return res.status(400).json({ error: 'Los campos id_solicitud y monto son obligatorios' });
    }

    // --- Calcular total real de la solicitud ---
    const solicitud = await Solicitudservicio.findByPk(id_solicitud, {
      include: [
        { model: Servicio, attributes: ['costo_base'], through: { attributes: [] } },
        { model: Registrotrabajo, attributes: ['costo_extra'] }
      ],
      transaction: t
    });

    if (!solicitud) {
      await t.rollback();
      return res.status(404).json({ error: 'Solicitud no encontrada para calcular total' });
    }

    let total = 0;
    if (solicitud.Servicios && solicitud.Servicios.length > 0) {
      total += solicitud.Servicios
        .map(s => Number(s.costo_base))
        .filter(c => !isNaN(c))
        .reduce((acc, c) => acc + c, 0);
    }
    if (solicitud.Registrotrabajos && solicitud.Registrotrabajos.length > 0) {
      total += solicitud.Registrotrabajos
        .map(r => Number(r.costo_extra))
        .filter(c => !isNaN(c))
        .reduce((acc, c) => acc + c, 0);
    }

    // --- Buscar factura ---
    let factura = null;

    if (factura_id) {
      factura = await Factura.findOne({ where: { id: factura_id }, transaction: t });
    }

    if (!factura) {
      factura = await Factura.findOne({
        where: { solicitud_id: id_solicitud, estado: 'activo' },
        transaction: t
      });
    }

    // --- Crear factura si no existe ---
    if (!factura) {
      factura = await Factura.create({
        solicitud_id: id_solicitud,
        fecha_emision: new Date(),
        monto_pagado: 0,
        monto_pendiente: total,
        total: total,
        estado: 'activo'
      }, { transaction: t });
    } else {
      // Revisar estado activo
      if (factura.estado !== 'activo') {
        await t.rollback();
        return res.status(400).json({ error: 'No se puede registrar pago para una factura inactiva' });
      }
      // Actualizar total en caso de que hayan cambiado servicios o costos extras
      await factura.update({ total }, { transaction: t });
    }

    // --- Crear nuevo pago ---
    const nuevoPago = await Pago.create({
      id_solicitud,
      factura_id: factura.id,
      fecha_pago,
      monto,
      hora_pago,
      metodo_pago,
      estado,
      descripcion,
    }, { transaction: t });

    // --- Recalcular monto pagado sumando todos los pagos ---
    const pagos = await Pago.findAll({
      where: { factura_id: factura.id },
      transaction: t
    });

    const monto_pagado = pagos.reduce((acc, pago) => {
      const m = parseFloat(pago.monto);
      return acc + (isNaN(m) ? 0 : m);
    }, 0);

    // --- Recalcular monto pendiente ---
    const monto_pendiente = total - monto_pagado < 0 ? 0 : total - monto_pagado;

    // --- Actualizar factura con montos correctos ---
    await factura.update({
      monto_pagado,
      monto_pendiente
    }, { transaction: t });

    // --- Crear detalle factura ---
    await DetalleFactura.create({
      factura_id: factura.id,
      descripcion: descripcion || 'Sin descripción',
      monto: monto,
      estado: 'activo',
    }, { transaction: t });

    await t.commit();

    // --- Retornar respuesta con pago y factura actualizados ---
    const pagoConFactura = await Pago.findOne({
      where: { id_pago: nuevoPago.id_pago },
      include: [{
        model: Factura,
        attributes: ['total', 'monto_pagado', 'monto_pendiente']
      }]
    });

    return res.status(201).json({
      message: 'Pago registrado correctamente',
      pago: pagoConFactura,
      factura: pagoConFactura ? pagoConFactura.Factura : null
    });

  } catch (error) {
    await t.rollback();
    console.error('Error al registrar el pago:', error);
    res.status(500).json({ error: 'Error al registrar el pago' });
  }
});


app.put('/pagos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_solicitud,
      factura_id,
      fecha_pago,
      monto,
      hora_pago,
      metodo_pago,
      estado,
    } = req.body;

    if (!monto) {
      return res.status(400).json({ error: 'El campo monto es obligatorio' });
    }

    const pagoExistente = await Pago.findByPk(id);
    if (!pagoExistente) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    const solicitud = await Solicitudservicio.findByPk(id_solicitud);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }


    await pagoExistente.update({
      id_solicitud,
      factura_id,
      fecha_pago,
      monto,
      hora_pago,
      metodo_pago,
      estado,
    });

    res.status(200).json({ message: 'Pago actualizado correctamente', pago: pagoExistente });

  } catch (error) {
    console.error('Error al actualizar el pago:', error);
    res.status(500).json({ error: 'Error al actualizar el pago' });
  }
});



// Obtener un pago por ID
app.get('/pagos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pago = await Pago.findOne({ where: { id_pago: id } }); 
    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    res.json(pago);
  } catch (error) {
    console.error('Error al obtener pago:', error);
    res.status(500).json({ error: 'Error al obtener pago' });
  }
});



//Eliminar pago
app.delete('/pagos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pago = await Pago.findOne({ where: { id_pago: id } });

    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    await pago.update({ estado: 'inactivo' });

    res.json({ mensaje: 'Pago marcado como inactivo correctamente', pago });
  } catch (error) {
    console.error('Error al marcar pago como inactivo:', error);h
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});
app.get('/facturas/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Buscamos la factura por PK e incluimos detalles y pagos
    const factura = await Factura.findByPk(id, {
      include: [
        {
          model: DetalleFactura,
          as: 'detalles',  // asegúrate que esta asociación esté definida en tu modelo Factura
          attributes: ['descripcion', 'monto']
        },
        {
          model: Pago,
          as: 'pagos',  // también debe existir esta asociación
          attributes: ['id_pago', 'fecha_pago', 'monto']
        },
        {
          model: Solicitudservicio,
          as: 'solicitud', // si tienes la asociación en Factura a Solicitudservicio
          include: [
            {
              model: Servicio,
              as: 'Servicios',  // esta debe estar definida en Solicitudservicio con belongsToMany
              attributes: ['nombre_servicio', 'costo_base']
            }
          ]
        }
      ]
    });

    if (!factura) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    res.json(factura);

  } catch (error) {
    console.error('Error al obtener factura por ID:', error);
    res.status(500).json({ error: 'Error al obtener la factura' });
  }
});


app.post('/facturas', async (req, res) => {
  const {
    solicitud_id,
    fecha_emision,
    monto_pendiente,
    monto_pagado,
    total,
    estado,
    detalles 
  } = req.body;

  const t = await Factura.sequelize.transaction();

  try {
    const solicitud = await Solicitudservicio.findByPk(solicitud_id);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (solicitud.estado === 'cancelada' || solicitud.estado === 'realizada') {
      console.log(`No se puede facturar solicitud ${solicitud_id} porque está ${solicitud.estado}.`);
      return res.status(400).json({ error: 'No se pueden crear facturas para solicitudes canceladas o realizadas' });
    }

    const nuevaFactura = await Factura.create({
      solicitud_id,
      fecha_emision,
      monto_pendiente,
      monto_pagado,
      total,
      estado
    }, { transaction: t });

    if (Array.isArray(detalles)) {
      for (const detalle of detalles) {
        await DetalleFactura.create({
          factura_id: nuevaFactura.id,
          descripcion: detalle.descripcion,
          monto: detalle.monto,
          estado: 'activo'
        }, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json(nuevaFactura);

  } catch (error) {
    await t.rollback();
    console.error('Error al crear factura:', error);
    res.status(500).json({ error: 'Error al crear la factura' });
  }
});


app.get('/solicitudservicio/:id/monto-total', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID solicitud recibida:', id);

    
    const solicitud = await Solicitudservicio.findByPk(id, {
      include: [
        {
          model: Servicio,
          attributes: ['id_servicio', 'nombre_servicio', 'costo_base'],
          through: { attributes: [] }  
        },
        {
          model: Registrotrabajo,
          attributes: ['id_registro_trabajo', 'costo_extra']
        }
      ]
    });

    if (!solicitud) {
      console.log('Solicitud no encontrada con id:', id);
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    
    let totalSolicitud = 0;
    if (solicitud.Servicios && solicitud.Servicios.length > 0) {
      totalSolicitud += solicitud.Servicios.reduce((acc, s) => acc + Number(s.costo_base || 0), 0);
    }

   
    if (solicitud.Registrotrabajos && solicitud.Registrotrabajos.length > 0) {
      totalSolicitud += solicitud.Registrotrabajos.reduce((acc, r) => acc + Number(r.costo_extra || 0), 0);
    }

    console.log('Total calculado de la solicitud:', totalSolicitud);

   
    let monto_pagado = 0;
    try {
      const pagos = await Pago.findAll({
        where: { id_solicitud: id }
      });

      monto_pagado = pagos.reduce((acc, pago) => {
        const monto = parseFloat(pago.monto);
        return acc + (isNaN(monto) ? 0 : monto);
      }, 0);

      console.log('Monto pagado encontrado:', monto_pagado);

    } catch (errPagos) {
      console.error('Error al obtener pagos:', errPagos.message);
      return res.status(500).json({ error: 'Error obteniendo pagos', detalle: errPagos.message });
    }

    const monto_pendiente = totalSolicitud - monto_pagado;

    return res.json({
      monto_total: Number(totalSolicitud.toFixed(2)),
      monto_pagado: Number(monto_pagado.toFixed(2)),
      monto_pendiente: Number(monto_pendiente.toFixed(2))
    });

  } catch (error) {
    console.error('Error al obtener monto total:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});



app.get('/facturas', async (req, res) => {
  try {
    const facturas = await Factura.findAll({
      attributes: [
        'id',
        'solicitud_id',
        'fecha_emision',
        'monto_pendiente',
        'total',
        'estado',
        // Agregamos la suma de pagos como campo adicional
        [conexion.fn('SUM', conexion.col('pagos.monto')), 'monto_pagado']
      ],
      include: [
        {
          model: DetalleFactura,
          as: 'detalles',
          attributes: ['descripcion', 'monto']
        },
        {
          model: Pago,
          as: 'pagos',
          attributes: [] // no traer detalles de cada pago, solo sumar
        }
      ],
      group: ['Factura.id', 'detalles.id'], // Necesario para que Sequelize agrupe correctamente
      order: [['fecha_emision', 'DESC']]
    });

    res.json(facturas);
  } catch (error) {
    console.error('Error obteniendo facturas:', error);
    res.status(500).json({ message: 'Error al obtener facturas', error: error.message });
  }
});


app.delete('/facturas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const facturas = await Factura.findOne({ where: { id: id } });

    if (!facturas) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    await facturas.update({ estado: 'inactivo' });

    res.json({ mensaje: 'Factura marcada como inactiva correctamente', facturas });
  } catch (error) {
    console.error('Error al marcar factura como inactiva:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});



app.post('/cliente', async (req, res) => {
  try {
    const { email, contrasena, rol, estado } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
    }

    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const hashedContrasena = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await Usuario.create({
      email,
      contrasena: hashedContrasena,
      rol: rol || 'cliente',
      estado: estado || 'activo',
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      id_usuario: nuevoUsuario.id_usuario,
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
});


app.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    if (usuario.estado !== 'activo') {
      return res.status(403).json({ error: 'Usuario no activo' });
    }

    if (usuario.rol === 'empleado') {
      const empleado = await Empleado.findOne({ where: { email } });

      if (!empleado) {
        return res.status(403).json({ error: 'Empleado no registrado' });
      }

      if (empleado.estado !== 'activo') {
        return res.status(403).json({ error: 'Empleado inactivo' });
      }
    }

    if (usuario.rol === 'cliente') {
      const cliente = await Cliente.findOne({ where: { email } });

      if (!cliente) {
        return res.status(403).json({ error: 'Cliente no registrado' });
      }

      if (cliente.estado !== 'activo') {
        return res.status(403).json({ error: 'Cliente inactivo' });
      }
    }

    res.json({
      id_usuario: usuario.id_usuario,
      email: usuario.email,
      rol: usuario.rol
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});




app.get('/usuario', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'El email es obligatorio' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      id_usuario: usuario.id_usuario,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado
    });

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});


app.get('/cliente', async (req, res) => {
  try {
    const clientes = await Usuario.findAll({ where: { rol: 'cliente' } });
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

app.get('/proximas-citas', async (req, res) => {
  try {
    // Obtener la fecha de hoy a las 00:00 (hora local)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // resetea a medianoche local

    const citas = await Cita.findAll({
      where: {
        fecha: {
          [Op.gte]: hoy // compara solo contra la fecha de hoy local
        }
      },
      order: [['fecha', 'ASC']],
      // Puedes dejar o quitar el limit según necesites
      // limit: 5
    });

    res.json(citas);
  } catch (error) {
    console.error('Error al obtener próximas citas:', error);
    res.status(500).json({ mensaje: 'Error al obtener próximas citas' });
  }
});



app.get('/servicios-pendientes', async (req, res) => {
  try {
    const servicios = await Solicitudservicio.findAll({
      where: { estado: 'pendiente' },
      include: [Cliente],
      order: [['fecha', 'ASC']]
    });

    console.log('Servicios pendientes fechas:', servicios.map(s => s.fecha));

    res.json(servicios);
  } catch (error) {
    console.error('Error al obtener servicios pendientes:', error);
    res.status(500).json({ mensaje: 'Error al obtener servicios pendientes' });
  }
});

app.get('/servicios-atrasados', async (req, res) => {
  try {
    const hoy = new Date();
    const servicios = await Solicitudservicio.findAll({
      where: {
        estado: 'pendiente',
        fecha: {
          [Op.lt]: hoy
        }
      },
      include: [Cliente],
      order: [['fecha', 'ASC']]
    });
    res.json(servicios);
  } catch (error) {
    console.error('Error al obtener servicios atrasados:', error);
    res.status(500).json({ mensaje: 'Error al obtener servicios atrasados' });
  }
});

app.post('/cotizaciones', async (req, res) => {
  const { id_cliente, servicios, subtotal, impuesto, descuento, total } = req.body;

  try {
    const nuevaCotizacion = await Cotizacion.create({
      id_cliente,
      fecha_emision: new Date(), 
      subtotal,
      impuestos: impuesto, 
      descuento,
      total
    });

    const detalles = servicios.map(servicio => ({
      id_cotizacion: nuevaCotizacion.id_cotizacion,
      id_servicio: servicio.id_servicio,
      costo_base: servicio.costo_base
    }));

    await DetalleCotizacion.bulkCreate(detalles);

    res.status(201).json({ message: 'Cotización guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar cotización:', error);
    res.status(500).json({ message: 'Error interno al guardar la cotización' });
  }
});

app.get('/cotizaciones', async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.findAll({
      include: [
        {
          model: DetalleCotizacion,
          as: 'detalles',
          include: [
            {
              model: Servicio,
              as: 'servicio',
              attributes: ['id_servicio', 'nombre_servicio', 'costo_base']
              
            }
          ]
        },
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['id_cliente', 'nombre'] 
        }
      ]
    });

    res.json(cotizaciones);
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    res.status(500).json({ message: 'Error interno al obtener las cotizaciones' });
  }
});

app.get('/cotizaciones/:id', async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findByPk(req.params.id, {
      include: [
        {
          model: DetalleCotizacion,
          as: 'detalles',
          include: [
            {
              model: Servicio,
              as: 'servicio',
              attributes: ['id_servicio', 'nombre_servicio', 'costo_base']
            }
          ]
        }
      ]
    });

    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }

    const servicios = cotizacion.detalles.map(det => ({
      id_servicio: det.id_servicio,
      nombre_servicio: det.servicio.nombre_servicio,
      costo_base: det.servicio.costo_base
    }));

    res.json({
      id_cliente: cotizacion.id_cliente,
      fecha: cotizacion.fecha,
      estado: cotizacion.estado,
      servicios
    });
  } catch (error) {
    console.error('Error al obtener cotización:', error);
    res.status(500).json({ message: 'Error al obtener cotización' });
  }
});


app.put('/cotizaciones/:id', async (req, res) => {
  const { id } = req.params;
  const { id_cliente, estado, servicios, subtotal, impuesto, descuento,total } = req.body;

  try {
    const cotizacion = await Cotizacion.findByPk(id);
    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }

    await cotizacion.update({
      id_cliente,
      estado, 
      fecha_emision: new Date(),
      subtotal,
      impuestos: impuesto,
      descuento,
      total
    });

    await DetalleCotizacion.destroy({ where: { id_cotizacion: id } });

    const nuevosDetalles = servicios.map(servicio => ({
      id_cotizacion: id,
      id_servicio: servicio.id_servicio,
      costo_base: servicio.costo_base
    }));
    await DetalleCotizacion.bulkCreate(nuevosDetalles);

    res.json({ message: 'Cotización actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar cotización:', error);
    res.status(500).json({ message: 'Error interno al actualizar la cotización' });
  }
});
app.delete('/cotizaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cotizacion = await Cotizacion.findOne({ where: { id_cotizacion: id } });
    if (!cotizacion) {
      return res.status(404).json({ error: 'Cotización no encontrada' });
    }
    await cotizacion.update({ estado: 'Rechazada' });

    res.json({ mensaje: 'Cotización cancelada correctamente' });
  } catch (error) {
    console.error('Error al cancelar la cotización:', error);
    res.status(500).json({ error: 'Error al cancelar la cotizacio' });
  }
});



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
