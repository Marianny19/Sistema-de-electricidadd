import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faReceipt,
  faSignOut, faUser, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Notasregistro = () => {
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
        <h2>Bienvenido a la sección de notas o sugerencias</h2>
        <FormularioCliente />
      </div>
    </div>
  );
};

function FormularioCliente() {
  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">DEJANOS UNA NOTA O SUGERENCIA</h1>
      <form className="formulario-cita">
      <input type="number" placeholder="Codigo servicio" className="campo-cita" />
        <input type="text" placeholder="Comentario" className="campo-cita" />
        <input type="date" placeholder="Fecha" className="campo-cita" />
        <select className="campo-cita">
      <option value="">Estrellas</option>
      <option value="uno">1/5</option>
      <option value="dos">2/5</option>
      <option value="tres">3/5</option>
      <option value="cuatro">4/5</option>
      <option value="cinco">5/5</option>
    </select>
        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Notasregistro;
