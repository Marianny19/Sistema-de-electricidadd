import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const Crearsolicitud = () => {
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
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="/vercotizaciones"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
          <li><Link to="/factura"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
          <li><Link to="/pago"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pagos</span></Link></li>
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
        <Link to="/solicitudservicio" className="boton-retroceso" aria-label="Volver">
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
    fecha: '',
    hora: '',
    estado: 'pendiente'
  });
  const [errorValidacion, setErrorValidacion] = useState('');
  const navigate = useNavigate();
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
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleClienteChange = (selectedOption) => {
    setFormulario(prev => ({
      ...prev,
      id_cliente: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleServiciosChange = (selectedOptions) => {
    setFormulario(prev => ({
      ...prev,
      servicios: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  const validarFormulario = () => {
    if (!formulario.id_cliente) {
      setErrorValidacion('Debe seleccionar un cliente');
      return false;
    }
    if (formulario.servicios.length === 0) {
      setErrorValidacion('Debe seleccionar al menos un servicio');
      return false;
    }
    if (!formulario.direccion.trim()) {
      setErrorValidacion('La dirección es requerida');
      return false;
    }
    if (!formulario.via_comunicacion.trim()) {
      setErrorValidacion('La vía de comunicación es requerida');
      return false;
    }
    if (!formulario.fecha) {
      setErrorValidacion('Debe seleccionar una fecha');
      return false;
    }
    if (!formulario.hora) {
      setErrorValidacion('Debe seleccionar una hora');
      return false;
    }
    if (!formulario.estado) {
      setErrorValidacion('Debe seleccionar un estado');
      return false;
    }
    setErrorValidacion('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const respuesta = await fetch('http://localhost:8081/solicitudservicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
        alert('Solicitud registrada correctamente');
        setFormulario({
          id_cliente: '',
          servicios: [],
          direccion: '',
          via_comunicacion: '',
          fecha: '',
          hora: '',
          estado: 'pendiente'
        });
        navigate('/solicitudservicio');
      } else {
        const error = await respuesta.json();
        console.error('Error del servidor:', error);
        alert('La fecha y la hora que seleccionaste no estan disponibles, intenta con otra');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('La fecha y la hora que seleccionaste no estan disponibles, intenta con otra');
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
          min={new Date().toISOString().split('T')[0]}
        />

        <select
          name="hora"
          className="campo-cita"
          value={formulario.hora}
          onChange={handleChange}
        >
          <option value="">Seleccione una hora</option>
          <option value="08:00">08:00</option>
          <option value="10:00">10:00</option>
          <option value="13:00">13:00</option>
          <option value="15:00">15:00</option>
          <option value="18:00">18:00</option>
        </select>
        {errorValidacion && <p className="error-validacion">{errorValidacion}</p>}

        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
};

export default Crearsolicitud;
