import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUsers, faUser, faCalendar,
  faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
  faClipboard, faCartArrowDown, faSignOut, faChevronLeft,
  faReceipt
} from '@fortawesome/free-solid-svg-icons';


const Recomendacion = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido cliente</h2>
        <ul>
          <li><Link to="/dashboardcliente"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteregistro"><FontAwesomeIcon icon={faUsers} /> <span>Cliente</span></Link></li>
          <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
         <li><Link to=""><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
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
        <h2>Asistente virtual para materiales</h2>
        <div className="copilot-container">
          <div className="copilot-chat">
            <div className="chat-header">Asistente Eléctrico</div>

            <div className="chat-body">
              <div className="message bot">Hola, ¿en qué puedo ayudarte hoy?</div>
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="chat-input"
              />
              <button className="send-button">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomendacion;
