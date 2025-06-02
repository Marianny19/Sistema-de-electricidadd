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
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);

  useEffect(() => {
    fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/clientes')
      .then(res => res.json())
      .then(data => {
        const clientesActivos = data.filter(cliente => cliente.estado === 'activo');
        setClientes(clientesActivos);
      })
      .catch(err => console.error('Error cargando clientes:', err));

    fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/servicios')
      .then(res => res.json())
      .then(data => setServiciosLista(data))
      .catch(err => console.error('Error cargando servicios:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
    setErrores(prev => ({ ...prev, [name]: '' }));
  };

  const handleClienteChange = (selectedOption) => {
    setFormulario(prev => ({
      ...prev,
      id_cliente: selectedOption ? selectedOption.value : ''
    }));
    setErrores(prev => ({ ...prev, id_cliente: '' }));
  };

  const handleServiciosChange = (selectedOptions) => {
    setFormulario(prev => ({
      ...prev,
      servicios: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
    setErrores(prev => ({ ...prev, servicios: '' }));
  };

  const validarFormulario = () => {
    let valid = true;
    let nuevosErrores = {};

    if (!formulario.id_cliente) {
      nuevosErrores.id_cliente = 'Debe seleccionar un cliente';
      valid = false;
    }
    if (formulario.servicios.length === 0) {
      nuevosErrores.servicios = 'Debe seleccionar al menos un servicio';
      valid = false;
    }
    const direccion = formulario.direccion.trim();
    const direccionValida = /^[a-zA-Z0-9\s,#]+$/.test(direccion);
    const direccionSinEspacios = direccion.replace(/\s/g, '');
    if (direccionSinEspacios.length < 10) {
      nuevosErrores.direccion = 'La dirección debe tener al menos 10 caracteres (sin contar espacios)';
      valid = false;
    }
    if (!direccion) {
      nuevosErrores.direccion = 'La dirección es requerida';
      valid = false;
    } else if (direccion.length < 2) {
      nuevosErrores.direccion = 'La dirección debe tener al menos 2 caracteres';
      valid = false;
    } else if (!direccionValida) {
      nuevosErrores.direccion = 'La dirección solo puede contener letras, números, espacios, "," y "#"';
      valid = false;
    }
    if (!formulario.via_comunicacion.trim()) {
      nuevosErrores.via_comunicacion = 'La vía de comunicación es requerida';
      valid = false;
    }
    if (!formulario.fecha) {
      nuevosErrores.fecha = 'Debe seleccionar una fecha';
      valid = false;
    } else {
      const hoy = new Date().toISOString().split('T')[0];
      if (formulario.fecha < hoy) {
        nuevosErrores.fecha = 'La fecha no puede ser anterior a hoy';
        valid = false;
      }
    }
    if (!formulario.hora) {
      nuevosErrores.hora = 'Debe seleccionar una hora';
      valid = false;
    }
    setErrores(nuevosErrores);
    setErrorValidacion('');
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const respuesta = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/solicitudservicio', {
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
        setErrores({});
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
          {errores.id_cliente && <span className="error-validacion">{errores.id_cliente}</span>}
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
          {errores.servicios && <span className="error-validacion">{errores.servicios}</span>}
        </div>

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          className="campo-cita"
          value={formulario.direccion}
          onChange={handleChange}
        />
        {errores.direccion && <span className="error-validacion">{errores.direccion}</span>}

        <select
          name="via_comunicacion"
          className="campo-cita"
          value={formulario.via_comunicacion}
          onChange={handleChange}
        >
          <option value="">Seleccione la vía de comunicación</option>
          <option value="Teléfonica">Teléfonica</option>
          <option value="Email">Email</option>
          <option value="APP">App</option>
        </select>
        {errores.via_comunicacion && <span className="error-validacion">{errores.via_comunicacion}</span>}

        <input
          type="date"
          name="fecha"
          className="campo-cita"
          value={formulario.fecha}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
        />
        {errores.fecha && <span className="error-validacion">{errores.fecha}</span>}

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
        {errores.hora && <span className="error-validacion">{errores.hora}</span>}

        {errorValidacion && <p className="error-validacion">{errorValidacion}</p>}

        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
};

export default Crearsolicitud;
