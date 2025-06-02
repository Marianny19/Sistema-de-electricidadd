import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  faHome,
  faUsers,
  faUser,
  faFileText,
  faCalendar,
  faTasks,
  faFileInvoice,
  faFileInvoiceDollar,
  faMoneyCheck,
  faChevronLeft,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../index.css";

const Actualizarregistrotrabajo = () => {
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
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="/cotizacion"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
          <li><Link to="/factura"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
          <li><Link to="/pago"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pagos</span></Link></li>
        </ul>

        <ul>
          <li className="Cerrarsesion">
            <button
              onClick={cerrarSesion}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="dashboard-content">
        <Link to="/registrotrabajo" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenidos a actualizar registro de trabajo</h2>
        <FormRegistroTrabajo />
      </div>
    </div>
  );
};

const FormRegistroTrabajo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    id_solicitud_servicio: null,
    id_empleado: null,
    servicios: [],
    costo_extra: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'activo',
  });

  const [solicitudes, setSolicitudes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);

  useEffect(() => {
    fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/solicitudservicio')
      .then(res => res.json())
      .then(data => setSolicitudes(data))
      .catch(err => console.error('Error cargando solicitudes:', err));

    fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/empleados')
      .then(res => res.json())
      .then(data => setEmpleados(data))
      .catch(err => console.error('Error cargando empleados:', err));

    fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/servicios')
      .then(res => res.json())
      .then(data => setServiciosLista(data))
      .catch(err => console.error('Error cargando servicios:', err));
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/registrotrabajo/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se encontró el registro');
        return res.json();
      })
      .then(data => {
        setFormulario({
          id_solicitud_servicio: data.id_solicitud_servicio || null,
          id_empleado: data.id_empleado || null,
          servicios: data.servicios ? data.servicios.map(s => s.id_servicio) : [],
          costo_extra: data.costo_extra !== null ? data.costo_extra : '',
          fecha: data.fecha ? data.fecha.split('T')[0] : new Date().toISOString().split('T')[0],
          estado: data.estado || 'activo',
        });
      })
      .catch(err => {
        console.error('Error cargando registro:', err);
        alert('Error cargando el registro para actualizar');
        navigate('/registrotrabajo');
      });
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleServiciosChange = selectedOptions => {
    const idsSeleccionados = selectedOptions ? selectedOptions.map(op => op.value) : [];
    setFormulario(prev => ({ ...prev, servicios: idsSeleccionados }));
  };

  const handleSolicitudChange = selectedOption => {
    setFormulario(prev => ({ ...prev, id_solicitud_servicio: selectedOption ? selectedOption.value : null }));
  };

  const handleEmpleadoChange = selectedOption => {
    setFormulario(prev => ({ ...prev, id_empleado: selectedOption ? selectedOption.value : null }));
  };
  const opcionesSolicitudes = solicitudes
    .filter(sol => sol.id_solicitud_servicio === formulario.id_solicitud_servicio)
    .map(sol => ({
      value: sol.id_solicitud_servicio,
      label: sol.descripcion || `Solicitud #${sol.id_solicitud_servicio}`
    }));


  const opcionesEmpleados = empleados
    .filter(emp => emp.id_empleado === formulario.id_empleado)
    .map(emp => ({
      value: emp.id_empleado,
      label: emp.nombre
    }));


  const opcionesServicios = serviciosLista.map(serv => ({
    value: serv.id_servicio,
    label: serv.nombre_servicio
  }));

  const valorSolicitud = opcionesSolicitudes.find(opt => opt.value === formulario.id_solicitud_servicio) || null;
  const valorEmpleado = opcionesEmpleados.find(opt => opt.value === formulario.id_empleado) || null;
  const valorServicios = opcionesServicios.filter(opt => formulario.servicios.includes(opt.value));

  const handleSubmit = async e => {
    e.preventDefault();

    const { id_solicitud_servicio, id_empleado, servicios, costo_extra, fecha, estado } = formulario;

    if (!id_solicitud_servicio || !id_empleado || servicios.length === 0 || costo_extra === '' || !fecha || !estado) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      const respuesta = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/registrotrabajo/${id}`, {
        method: 'PUT',
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
        alert('Registro de trabajo actualizado correctamente');
        navigate('/registrotrabajo');
      } else {
        alert('Error al actualizar el registro de trabajo');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error de red al actualizar el registro');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <div className="campo-cita">
          <label>Solicitud de servicio:</label>
          <Select
            options={opcionesSolicitudes}
            value={valorSolicitud}
            onChange={handleSolicitudChange}
            placeholder="Seleccionar solicitud"
            isClearable
          />
        </div>

        <div className="campo-cita">
          <label>Empleado:</label>
          <Select
            options={opcionesEmpleados}
            value={valorEmpleado}
            onChange={handleEmpleadoChange}
            placeholder="Seleccionar empleado"
            isClearable
          />
        </div>

        <div className="campo-cita">
          <label>Servicios:</label>
          <Select
            isMulti
            options={opcionesServicios}
            value={valorServicios}
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
          step="0.01"
          min="0"
          required
        />

        <input
          type="date"
          name="fecha"
          className="campo-cita"
          value={formulario.fecha}
          onChange={handleChange}
          required
        />


        <button type="submit" className="boton-cita">ACTUALIZAR</button>
      </form>
    </div>
  );
};

export default Actualizarregistrotrabajo;
