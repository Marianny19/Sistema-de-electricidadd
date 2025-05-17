import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileText, faSignOut,
  faUsers, faHome, faClipboard
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const Solicitudservicioc = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const emailUsuario = localStorage.getItem('email');

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/iniciarsesion', { replace: true });
    window.history.pushState(null, '', '/iniciarsesion');
    window.onpopstate = () => window.history.go(1);
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido</h2>
        <p className="subtexto-email">{emailUsuario}</p>
        <ul>
          <li><Link to="/dashboardcliente"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteregistro"><FontAwesomeIcon icon={faUsers} /> <span>Cliente</span></Link></li>
          <li><Link to="/solicitudservicioc"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/notasregistro"><FontAwesomeIcon icon={faClipboard} /> <span>Notas</span></Link></li>
        </ul>
        <ul>
          <li className="Cerrarsesion">
            <button onClick={cerrarSesion} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <FontAwesomeIcon icon={faSignOut} /> <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <Link to="/dashboardcliente" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de Solicitud</h2>
        <FormRegistroSolicitud />
      </div>
    </div>
  );
};

const FormRegistroSolicitud = () => {
  const [formulario, setFormulario] = useState({
    id_cliente: '',
    servicios: [],
    direccion: '',
    via_comunicacion: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'pendiente'
  });

  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
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
    const estadoFinal = estadosValidos.includes(estado) ? estado : 'pendiente';

    if (!id_cliente || servicios.length === 0 || !direccion || !fecha) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:8081/solicitudservicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formulario, estado: estadoFinal })
      });

      if (respuesta.ok) {
        alert('Solicitud registrada correctamente');
        navigate('/solicitudservicioc');
        setFormulario({
          id_cliente: '',
          servicios: [],
          direccion: '',
          via_comunicacion: '',
          fecha: new Date().toISOString().split('T')[0],
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

        <select
          name="estado"
          className="campo-cita"
          value={formulario.estado}
          onChange={handleChange}
        >
          <option value="">Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="realizado">Realizado</option>
          <option value="atrasado">Atrasado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
};

export default Solicitudservicioc;
