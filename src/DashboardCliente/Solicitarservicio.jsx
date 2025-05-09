import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faClipboard,faHome,
  faSignOut, faUsers, faSearch,
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
                  <li><Link to="/dashboardcliente"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
                  <li><Link to="/clienteregistro"><FontAwesomeIcon icon={faUsers} /> <span>Cliente</span></Link></li>
                 <li><Link to="/solicitarservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
                  <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
                  <li><Link to="/notasregistro"> <FontAwesomeIcon icon={faClipboard}/> <span>Notas</span></Link></li>
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
        <h2>Bienvenido a la sección de solicitud</h2>
        <Crearcitas />
      </div>
    </div>
  );
};


function Crearcitas() {
  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita">
      <input type="number" placeholder="Cliente" className="campo-cita" />
      <input type="number" placeholder="Servicio" className="campo-cita" />
       <input type="text" placeholder="Direccion" className="campo-cita" />
      <input type="text" placeholder="Via comunicacion" className="campo-cita" />
      <input type="date" placeholder="Fecha" className="campo-cita" />
      <select className="campo-cita">
      <option value="">Estado</option>
      <option value="pendiente">Pendiente</option>
      <option value="realizada">Realizada</option>
      <option value="cancelada">Cancelada</option>
    </select>
        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}


export default Solicitudservicio;
