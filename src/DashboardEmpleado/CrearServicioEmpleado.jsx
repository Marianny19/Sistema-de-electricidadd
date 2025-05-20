import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const CrearServicioEmpleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const emailUsuario = localStorage.getItem('email');

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();

    navigate('/iniciarsesion', { replace: true });

    window.history.pushState(null, '', '/iniciarsesion');
    window.onpopstate = () => {
      window.history.go(1);
    };
  };
  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido</h2>
        <p className="subtexto-email">{emailUsuario}</p>

          <ul>
                 <li><a href="/dashboardempleado"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></a></li>
                 <li><Link to="/clienteDempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
                 <li><Link to="/registrarservicioempleado"><FontAwesomeIcon icon={faFileText} /> <span>Solicitar Servicios</span></Link></li>
                 <li><Link to="/citaempleado"><FontAwesomeIcon icon={faCalendar} /> <span>Cita</span></Link></li>
                 <li><Link to="/registrotrabajoempleado"><FontAwesomeIcon icon={faTasks} /> <span>Registro Trabajo</span></Link></li>
                 <li><Link to="/vercotizacionempleado"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
                 <li><Link to="/facturaempleado"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
                 <li><Link to="/pagoempleado"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pago</span></Link></li>
               </ul>
        <ul>
          <li className="Cerrarsesion">
            <button
              onClick={cerrarSesion}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}
            >
              <FontAwesomeIcon icon={faSignOut} /> <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <Link to="/registrarservicioempleado" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de Solicitud</h2>
        <FormRegistroTrabajo />
      </div>
    </div>
  );
};

const FormRegistroTrabajo = () => {
  const [formulario, setFormulario] = useState({
    id_cliente: '',
    servicios: [],
    direccion: '',
    via_comunicacion: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '',
    estado: 'pendiente'
  });

  const [clientes, setClientes] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);

 useEffect(() => {
  fetch('http://localhost:8081/clientes')
    .then(res => res.json())
    .then(data => {
      const clientesActivos = data.filter(cliente => cliente.estado === 'activo');
      setClientes(clientesActivos);
    })
    .catch(err => console.error('Error cargando clientes:', err));

  fetch('http://localhost:8081/servicios')
    .then(res => res.json())
    .then(data => setServiciosLista(data))
    .catch(err => console.error('Error cargando servicios:', err));
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleServiciosChange = (selectedOptions) => {
    const idsSeleccionados = selectedOptions.map(op => op.value);
    setFormulario({ ...formulario, servicios: idsSeleccionados });
  };

  const handleClienteChange = (selectedOption) => {
    setFormulario({ ...formulario, id_cliente: selectedOption ? selectedOption.value : '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const estadosValidos = ['pendiente', 'realizado', 'atrasado', 'cancelado'];
    const { id_cliente, servicios, direccion, via_comunicacion, fecha, estado } = formulario;

    const estadoFinal = estado && estadosValidos.includes(estado) ? estado : 'pendiente';

    if (!id_cliente || servicios.length === 0 || !direccion || !fecha) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:8081/solicitudservicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formulario,
          estado: estadoFinal
        })
      });

      if (respuesta.ok) {
        alert('Solicitud registrada correctamente');
        setFormulario({
          id_cliente: '',
          servicios: [],
          direccion: '',
          via_comunicacion: '',
          fecha: new Date().toISOString().split('T')[0],
          hora: '',
          estado: 'pendiente'
        });
      } else {
        const error = await respuesta.json();
        console.error('Error del servidor:', error);
        alert('Error al registrar solicitud');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error de red al registrar solicitud');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <div className="campo-cita">
          <label>Cliente:</label>
          <Select
            className="react-select-custom"
            classNamePrefix="react-select"
            options={clientes.map(cliente => ({
              value: cliente.id_cliente,
              label: cliente.nombre
            }))}
            value={
              clientes
                .filter(c => c.id_cliente === formulario.id_cliente)
                .map(c => ({ value: c.id_cliente, label: c.nombre }))[0] || null
            }
            onChange={handleClienteChange}
            placeholder="Buscar cliente por nombre"
            isClearable
          />
        </div>

        <div className="campo-cita">
          <label>Servicios:</label>
          <Select
            isMulti
            className="react-select-custom"
            classNamePrefix="react-select"
            options={serviciosLista.map(servicio => ({
              value: servicio.id_servicio,
              label: servicio.nombre_servicio
            }))}
            value={serviciosLista
              .filter(serv => formulario.servicios.includes(serv.id_servicio))
              .map(serv => ({ value: serv.id_servicio, label: serv.nombre_servicio }))}
            onChange={handleServiciosChange}
            placeholder="Buscar y seleccionar servicios"
          />
        </div>

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          className="campo-cita"
          value={formulario.direccion}
          onChange={handleChange}
        />

        <input
          type="text"
          name="via_comunicacion"
          placeholder="Vía de comunicación"
          className="campo-cita"
          value={formulario.via_comunicacion}
          onChange={handleChange}
        />

        <input
          type="date"
          name="fecha"
          className="campo-cita"
          value={formulario.fecha}
          onChange={handleChange}
        />

          <input
          type="time"
          name="hora"
          className="campo-cita"
          value={formulario.fecha}
          onChange={handleChange}
        />
        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
};

export default CrearServicioEmpleado;
