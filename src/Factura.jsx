import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faUsers, faUser, faCalendar,
    faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
    faClipboard, faCartArrowDown, faSignOut, faChevronLeft, faSearch
  } from '@fortawesome/free-solid-svg-icons';
import './index.css';


const cerrarSesion = () => alert('Sesión cerrada');
const toggleSidebar = () => alert('Toggle sidebar');

const Factura = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
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
        <button className="toggle-btn" onClick={handleToggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <h2>Bienvenido a la sección de Factura</h2>
        <div className="main-content">
        <button className="Registro" onClick={() => console.log("Generar reporte")}> Generar reporte </button>
                     <div className="input-container-wrapper">
                       <div className="input-container">
                         <input id="buscar-factura" className="Buscar" type="search" placeholder="Buscar facturas" />
                         <FontAwesomeIcon icon={faSearch} />
                       </div>
       
                   <table className='tabla-factura'>
                     <caption>Lista de facturas</caption>
                     <thead>
                       <tr>
                         <th>Numero de factura</th>
                         <th>Fecha</th>
                         <th>Hora</th>
                         <th>Monto</th>
                         <th>Cliente</th>
                       </tr>
                     </thead>
                     <tbody id="tabla-factura">
                       {}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           </div>
         );
       }
export default Factura;
