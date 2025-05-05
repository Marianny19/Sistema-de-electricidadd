import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Clienteempleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/Dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
          <li><Link to="/factura"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pagos</span></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faClipboard} /> <span>Inventario</span></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faCartArrowDown} /> <span>Tienda</span></Link></li>
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
        <h2>Bienvenido a la sección de Clientes</h2>

        <div className="main-content">
               <Link to="/crearcliente"><button className="Registro">+ Nuevo cliente</button></Link>
              <div className="input-container-wrapper">
                <div className="input-container">
                  <input id="buscar-cliente" className="Buscar" type="search" placeholder="Buscar cliente" />
                  <FontAwesomeIcon icon={faSearch} />
                </div>

            <table className='tabla-clientes'>
              <caption>Lista de clientes</caption>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Cédula</th>
                  <th>Dirección</th>
                  <th>Correo electrónico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-clientes">
                {}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clienteempleado;
