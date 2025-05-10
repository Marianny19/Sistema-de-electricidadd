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


const Solicitudservicio = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

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
          <li><Link to="/cotizacion"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
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
export default Solicitudservicio;
