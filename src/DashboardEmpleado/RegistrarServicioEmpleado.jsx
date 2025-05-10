import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faTasks,
  faFileText
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots';
import "../index.css";


const RegistrarServicioEmpleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
           <li><a href="/dashboardempleado"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></a></li>
                  <li><Link to="/clienteDempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
                  <li><Link to="/registrarservicioempleado"><FontAwesomeIcon icon={faFileText} /> <span>Solicitar Servicios</span></Link></li>
                  <li><Link to="/citaempleado"><FontAwesomeIcon icon={faCalendar} /> <span>Cita</span></Link></li>
                  <li><Link to="/registrotrabajoempleado"><FontAwesomeIcon icon={faTasks} /> <span>Registro Trabajo</span></Link></li>
                  <li><Link to="/cotizacionempleado"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
                  <li><Link to="/facturaempleado"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
                  <li><Link to="/pagoempleado"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pago</span></Link></li>
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
           <Link to="/dashboardempleado" className="boton-retroceso" aria-label="Volver">
                                          <FontAwesomeIcon icon={faChevronLeft} />
                                        </Link>
        <h2>Bienvenido a la sección de solicitud de servicio</h2>

        <div className="main-content">
        <Link to="/crearservicioempleado"><button className="Registro">+ Nueva solicitud</button></Link>
              <div className="input-container-wrapper">
                <div className="input-container">
                  <input id="buscar-empleado" className="Buscar" type="search" placeholder="Buscar cita" />
                  <FontAwesomeIcon icon={faSearch} />
                </div>
            <table className='tabla-empleados'>
              <caption>Lista de solicitud</caption>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Cliente</th>
                  <th>Servicio </th>
                  <th>Direccion</th>
                  <th>Via comunicacion</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-empleados">
                {}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistrarServicioEmpleado;
