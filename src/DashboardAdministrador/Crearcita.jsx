import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const Crearcita = () => {
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
            <a href="#" onClick={cerrarSesion}>
              <FontAwesomeIcon icon={faSignOut} /> <span>Cerrar sesión</span>
            </a>
          </li>
        </ul>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <Link to="/formulariocita" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de citas</h2>
        <Crearcitas />
      </div>
    </div>
  );
};

function Crearcitas() {
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  const [formulario, setFormulario] = useState({
    id_cliente: '',
    id_empleado: '',
    id_solicitud: '',
    servicios: [],
    fecha: '',
    hora: '',
    estado: 'agendada'
  });

useEffect(() => {
  fetch('http://localhost:8081/clientes')
    .then(res => res.json())
    .then(data => {
      const clientesActivos = data.filter(cliente => cliente.estado === 'activo');
      setClientes(clientesActivos);
    })
    .catch(err => console.error('Error al cargar clientes:', err));

fetch('http://localhost:8081/empleados')
  .then(res => res.json())
  .then(data => {
    const empleadosActivos = data.filter(empleado => empleado.estado === 'activo');
    setEmpleados(empleadosActivos);
  })
  .catch(err => console.error('Error al cargar empleados:', err));


  fetch('http://localhost:8081/servicios')
    .then(res => res.json())
    .then(data => setServiciosLista(data))
    .catch(err => console.error('Error cargando servicios:', err));
}, []);


  useEffect(() => {
    const { fecha, id_empleado } = formulario;
    if (fecha && id_empleado) {
      fetch(`http://localhost:8081/validar-fecha?fecha=${fecha}&id_empleado=${id_empleado}`)
        .then(res => {
          if (!res.ok) throw new Error('No hay horas disponibles');
          return res.json();
        })
        .then(data => {
          console.log('Horas disponibles backend:', data.horasDisponibles);
          setHorasDisponibles(data.horasDisponibles);
          setFormulario(f => ({ ...f, hora: '' }));
        })
        .catch(() => {
          setHorasDisponibles([]);
          setFormulario(f => ({ ...f, hora: '' }));
        });
    } else {
      setHorasDisponibles([]);
      setFormulario(f => ({ ...f, hora: '' }));
    }
  }, [formulario.fecha, formulario.id_empleado]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleServiciosChange = (selectedOptions) => {
    const idsSeleccionados = selectedOptions ? selectedOptions.map(op => op.value) : [];
    setFormulario({ ...formulario, servicios: idsSeleccionados });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { id_cliente, id_empleado, id_solicitud, servicios, fecha, hora, estado } = formulario;

  if (!id_cliente || !id_empleado || servicios.length === 0 || !fecha || !hora || !estado) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const horaFormateada = hora.length === 5 ? `${hora}:00` : hora;

  try {
    const res = await fetch('http://localhost:8081/citas', {  
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formulario,
        hora: horaFormateada
      })
    });

    if (res.ok) {
      alert('Cita registrada correctamente');
      setFormulario({
        id_cliente: '',
        id_empleado: '',
        id_solicitud: '',
        servicios: [],
        fecha: '',
        hora: '',
        estado: 'agendada'
      });
      setHorasDisponibles([]);
    } else {
      const error = await res.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error('Error de red:', error);
    alert('La fecha y la hora que seleccionaste no estan disponibles, intenta con otra');
  }
};

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>

        <select
          name="id_cliente"
          className="campo-cita"
          value={formulario.id_cliente}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.nombre}</option>
          ))}
        </select>

        <select
          name="id_empleado"
          className="campo-cita"
          value={formulario.id_empleado}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un empleado</option>
          {empleados.map(empleado => (
            <option key={empleado.id_empleado} value={empleado.id_empleado}>{empleado.nombre}</option>
          ))}
        </select>

         <input
          type="number"
          name="id_solicitud"
          placeholder='Solicitud'
          className="campo-cita"
          value={formulario.id_solicitud}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />

    <div className="campo-cita">
  <label>Servicios:</label>
  <Select
    isMulti
    options={serviciosLista.map(servicio => ({
      value: servicio.id_servicio,
      label: servicio.nombre_servicio
    }))}
    value={serviciosLista
      .filter(serv => formulario.servicios.includes(serv.id_servicio))
      .map(serv => ({ value: serv.id_servicio, label: serv.nombre_servicio }))}
    onChange={handleServiciosChange}
    placeholder="Selecciona uno o más servicios"
    classNamePrefix="custom-select"
  />
</div>


        <input
          type="date"
          name="fecha"
          className="campo-cita"
          value={formulario.fecha}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />

        <select
          name="hora"
          className="campo-cita"
          value={formulario.hora}
          onChange={handleChange}
          required
          disabled={horasDisponibles.length === 0}
        >
          <option value="">Selecciona una hora</option>
          {horasDisponibles.map(hora => (
            <option key={hora} value={hora}>{hora.slice(0, 5)}</option>
          ))}
        </select>

        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Crearcita;
