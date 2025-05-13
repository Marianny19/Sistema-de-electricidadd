import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers, faSearch,
  faTasks, faFileText
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";

const Solicitudservicio = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [Solicitud, setSolicitud] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    async function cargarSolicitud() {
      try {
        const response = await fetch('http://localhost:8081/solicitudservicio');
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
  const cerrarSesion = () => console.log("Cerrar sesión");

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
        <h2>Bienvenido usuario</h2>
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
        <Link to="/dashboard" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de solicitud de servicio</h2>

        <div className="main-content">
          <Link to="/crearsolicitud"><button className="Registro">+ Nueva solicitud</button></Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-empleado"
                className="Buscar"
                type="search"
                placeholder="Buscar por nombre o ID de cliente"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <table className='tabla-empleados'>
              <caption>Lista de solicitud</caption>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Dirección</th>
                  <th>Vía comunicación</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
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
                      <td data-label="Estado">{solicitud.estado}</td>
                      <td data-label="Acciones">
                        <Link to={`/actualizarsolicitud/${solicitud.id_solicitud}`}>
                          <button className="Actualizar">Actualizar</button>
                        </Link>
                        <button className='Eliminar'>Eliminar</button>
                      </td>
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

export default Solicitudservicio;
