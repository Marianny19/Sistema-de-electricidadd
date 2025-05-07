import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faReceipt,
  faSignOut, faUser, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Clienteregistro = () => {
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
          <li><Link to="/cotizacionregistro"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
          <li><Link to="/recomendacion"><FontAwesomeIcon icon={faReceipt} /> <span>Recomendación</span></Link></li>
          <li><Link to="/notasregistro"><FontAwesomeIcon icon={faClipboard} /> <span>Notas</span></Link></li>

          
          
          
        
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
        <h2>Bienvenido a la sección de nuevo cliente</h2>
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
        <input type="text" placeholder="Nombre" className="campo-cita" />
        <input type="text" placeholder="Apellido" className="campo-cita" />
        <input type="text"  placeholder= "Telefono"className="campo-cita" />
        <input type="text" placeholder="Email" className="campo-cita" />
        <input type="text" placeholder="Direccion" className="campo-cita" />
        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Clienteregistro;
