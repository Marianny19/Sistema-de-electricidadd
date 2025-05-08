import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faReceipt,
  faSignOut, faUser, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Citaregistro = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/dashboardcliente"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteregistro"><FontAwesomeIcon icon={faUsers} /> <span>Cliente</span></Link></li>
          <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><a href="/cotizacionregistro"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></a></li>
          <li><a href="/recomendacion"><FontAwesomeIcon icon={faReceipt} /> <span>Recomendación</span></a></li>
          <li><a href="/notasregistro"> <FontAwesomeIcon icon={faClipboard} /><span>Notas</span></a></li>

          
        
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
        <h2>Bienvenido a la sección de agendar citas</h2>
        <FormularioCliente />
      </div>
    </div>
  );
};

function FormularioCliente() {
  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita">
      <select className="campo-cita">
      <option value="">Selecciona un servicio</option>
      <option value="electricidad">Instalacion electrica</option>
      <option value="reparacion">Reparacion electrica</option>
      <option value="lampara">Instalacion de lampara u inversor</option>
      <option value="mantenimiento">Mantenimiento electrico</option>
      <option value="plomeria">Plomeria</option>
      <option value="aire">Aire/ac</option>
    </select>
        <input type="datetime-local" placeholder="Fecha" className="campo-cita" />
        <select className="campo-cita">
      <option value="">Estado</option>
      <option value="agendada">agendada</option>
      <option value="programada">programada</option>
      <option value="cancelada">cancelada</option>
    </select>
        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Citaregistro;
