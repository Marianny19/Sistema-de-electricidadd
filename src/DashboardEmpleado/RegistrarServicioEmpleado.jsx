import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers, faSearch,
  faTasks, faFileText
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const RegistrarServicioEmpleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [Solicitud, setSolicitud] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const emailUsuario = localStorage.getItem('email');

  useEffect(() => {
    async function cargarSolicitud() {
      try {
        const response = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/solicitudservicio');
        if (!response.ok) throw new Error('Error en la solicitud');
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setSolicitud(data);
      } catch (error) {
        console.error('Error al cargar solicitud:', error);
      }
    }

    cargarSolicitud();
  }, []);

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

  const solicitudesFiltradas = Solicitud.filter(solicitud => {
    const termino = busqueda.toLowerCase();

    const cliente = solicitud.cliente;
    let idCliente = '';
    let nombreCliente = '';

    if (typeof cliente === 'object' && cliente !== null) {
      idCliente = String(cliente.id_cliente || '');
      nombreCliente = cliente.nombre || '';
    } else {
      idCliente = String(cliente || '');
    }

    return idCliente.toLowerCase().includes(termino) || nombreCliente.toLowerCase().includes(termino);
  });

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
        <Link to="/dashboardempleado" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de solicitud de servicio</h2>

        <div className="main-content">
          <Link to="/crearservicioempleado"><button className="Registro">+ Nueva solicitud</button></Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-empleado"
                className="Buscar"
                type="search"
                placeholder="Buscar por nombre o id de cliente"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <table className='tabla-empleados'>
              <caption>Lista de solicitud</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Dirección</th>
                  <th>Vía comunicación</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody id="tabla-empleados">
                {solicitudesFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="8">No hay solicitudes disponibles.</td>
                  </tr>
                ) : (
                  solicitudesFiltradas.map((solicitud) => (
                    <tr key={solicitud.id_solicitud}>
                      <td data-label="ID Solicitud">{solicitud.id_solicitud}</td>
                      <td data-label="Cliente">
                        {solicitud.cliente?.nombre || solicitud.cliente}
                      </td>
                      <td data-label="Servicio">
                        {solicitud.servicios ? solicitud.servicios : 'No hay servicios'}
                      </td>
                      <td data-label="Dirección">{solicitud.direccion}</td>
                      <td data-label="Vía de Comunicación">{solicitud.via_comunicacion}</td>
                      <td data-label="Fecha">{solicitud.fecha}</td>
                      <td data-label="Hora">{solicitud.hora}</td>
                      <td data-label="Estado">{solicitud.estado}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarServicioEmpleado;
