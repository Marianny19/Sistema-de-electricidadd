import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText,
  faTasksAlt,
  faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";


const MiComponente = () => (
  <div>
    <FontAwesomeIcon icon={faHome} />
    Inicio
  </div>
);
const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const cerrarSesion = () => {
    console.log("Cerrar sesión");
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><a href=""><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></a></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><a href="/cotizacion"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></a></li>
          <li><Link to="/factura"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
          <li><a href="/pago"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pagos</span></a></li>
        </ul>
        <ul>
          <li className="Cerrarsesion"><a href="#" onClick={cerrarSesion}><FontAwesomeIcon icon={faSignOut} /><span>Cerrar sesión</span></a></li>
        </ul>
        <button className="toggle-btn" onClick={toggleSidebar}><FontAwesomeIcon icon={faChevronLeft} /></button>
      </div>

      <div className="dashboard-content">
        <h2>Bienvenido al sistema de gestión de electricidad</h2>
        <div className="widgets">
          <div className="widget cita">
            <h3>Próximas citas</h3>
            <div id="lista-citas">
              <p>Cargando...</p>
            </div>
          </div>

          <div className="widget">
            <h3>Servicios pendientes</h3>
            <div id="lista-servicios">
              <p>Cargando...</p>
            </div>
          </div>

          <div className="widget">
            <h3>Servicios atrasados</h3>
            <div id="lista-servicios-atrasados">
              <p>Cargando...</p>
            </div>
          </div>

          <div className="widget">
            <h3>Estadísticas de servicios</h3>
            <canvas id="graficoTareas"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
