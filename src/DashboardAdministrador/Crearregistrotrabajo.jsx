import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const Crearregistrotrabajo = () => {
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
        <Link to="/registrotrabajo" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de registro trabajo</h2>
        <FormRegistroTrabajo />
      </div>
    </div>
  );
};

const FormRegistroTrabajo = () => {
  const [formulario, setFormulario] = useState({
    id_solicitud_servicio: '',
    id_empleado: '',
    servicios: [],
    costo_extra: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'activo'
  });
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/solicitudservicio')
      .then(res => res.json())
      .then(data => setSolicitudes(data))
      .catch(err => console.error('Error cargando solicitudes:', err));

   fetch('http://localhost:8081/empleados')
  .then(res => res.json())
  .then(data => {
    const empleadosActivos = data.filter(empleado => empleado.estado === 'activo');
    setEmpleados(empleadosActivos);
  })
  .catch(err => console.error('Error cargando empleados:', err));

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

  const handleSolicitudChange = (selectedOption) => {
    setFormulario({ ...formulario, id_solicitud_servicio: selectedOption ? selectedOption.value : '' });
  };

  const handleEmpleadoChange = (selectedOption) => {
    setFormulario({ ...formulario, id_empleado: selectedOption ? selectedOption.value : '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id_solicitud_servicio, id_empleado, servicios, costo_extra, fecha, estado } = formulario;

    if (!id_solicitud_servicio || !id_empleado || servicios.length === 0 || !costo_extra || !fecha || !estado) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:8081/registrotrabajo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_solicitud_servicio: parseInt(id_solicitud_servicio),
          id_empleado: parseInt(id_empleado),
          costo_extra: parseFloat(costo_extra),
          fecha,
          estado,
          servicios
        })
      });

      if (respuesta.ok) {
        alert('Registro de trabajo registrado correctamente');
        navigate('/registrotrabajo');
        setFormulario({
          id_solicitud_servicio: '',
          id_empleado: '',
          servicios: [],
          costo_extra: '',
          fecha: new Date().toISOString().split('T')[0],
          estado: 'activo'
        });
      } else {
        alert('La solicitud seleccionada ya se ha cerrado');
      }
    } catch (error) {
      console.error('La solicitud seleccionada ya se ha cerrado:', error);
      alert('La solicitud seleccionada ya se ha cerrado');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input
          type="number"
          name="id_solicitud_servicio"
          placeholder="Solicitud"
          className="campo-cita"
          value={formulario.id_solicitud_servicio}
          onChange={handleChange}
        />

        <div className="campo-cita">
          <label>Empleado:</label>
          <Select
            className="react-select-custom"
            classNamePrefix="react-select"
            options={empleados.map(emp => ({
              value: emp.id_empleado,
              label: emp.nombre
            }))}
            value={
              empleados
                .filter(e => e.id_empleado === formulario.id_empleado)
                .map(e => ({ value: e.id_empleado, label: e.nombre }))[0] || null
            }
            onChange={handleEmpleadoChange}
            placeholder="Seleccionar empleado"
            isClearable
          />
        </div>

        <div className="campo-cita">
          <label>Servicios:</label>
          <Select
            isMulti
            className="react-select-custom"
            classNamePrefix="react-select"
            options={serviciosLista.map(serv => ({
              value: serv.id_servicio,
              label: serv.nombre_servicio
            }))}
            value={serviciosLista
              .filter(serv => formulario.servicios.includes(serv.id_servicio))
              .map(serv => ({ value: serv.id_servicio, label: serv.nombre_servicio }))}
            onChange={handleServiciosChange}
            placeholder="Seleccionar servicios"
          />
        </div>

        <input
          type="number"
          name="costo_extra"
          placeholder="Costo Extra"
          className="campo-cita"
          value={formulario.costo_extra}
          onChange={handleChange}
        />

        <input
          type="date"
          name="fecha"
          className="campo-cita"
          value={formulario.fecha}
          onChange={handleChange}
        />

        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
};

export default Crearregistrotrabajo;
