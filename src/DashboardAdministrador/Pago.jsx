import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faUsers, faUser, faCalendar,
    faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
   faSignOut, faChevronLeft, faSearch, faFileText, faTasks
  } from '@fortawesome/free-solid-svg-icons';
import "../index.css";


const cerrarSesion = () => alert('Sesión cerrada');

const Pago = () => {
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
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="/cotizacion"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
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
        <h2>Bienvenido a la sección de pagos</h2>
        <div className="main-content">
                      <Link to="/pagoform"><button className="Registro">+ Nuevo Pago</button></Link>
                     <div className="input-container-wrapper">
                       <div className="input-container">
                         <input id="buscar-factura" className="Buscar" type="search" placeholder="Buscar facturas" />
                         <FontAwesomeIcon icon={faSearch} />
                       </div>
       
                   <table className='tabla-factura'>
                     <caption>Lista de Pagos</caption>
                     <thead>
                       <tr>
                         <th>Codigo</th>
                         <th>Solicitud</th>
                         <th>Fecha</th>
                         <th>Hora</th>
                         <th>Monto</th>
                         <th>metodo pago</th>
                         <th>Acciones</th>
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
export default Pago;
