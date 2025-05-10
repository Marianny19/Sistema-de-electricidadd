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

const   PagoEmpleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
            <li><a href="/dashboardempleado"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></a></li>
                   <li><Link to="/clienteDempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
                   <li><Link to="/registrarservicioempleado"><FontAwesomeIcon icon={faFileText} /> <span>Solicitar Servicios</span></Link></li>
                   <li><Link to="/citaempleado"><FontAwesomeIcon icon={faCalendar} /> <span>Cita</span></Link></li>
                   <li><Link to="/registrotrabajoempleado"><FontAwesomeIcon icon={faTasks} /> <span>Registro Trabajo</span></Link></li>
                   <li><Link to="/cotizacionempleado"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
                   <li><Link to="/facturaempleado"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
                   <li><Link to="/pagoempleado"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pago</span></Link></li>
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
           <Link to="/dashboardempleado" className="boton-retroceso" aria-label="Volver">
                                          <FontAwesomeIcon icon={faChevronLeft} />
                                        </Link>
        <h2>Bienvenido a la sección de pagos</h2>
        <div className="main-content">
                      <Link to="/crearpagoempleado"><button className="Registro">+ Nuevo Pago</button></Link>
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
                         <th>Metodo pago</th>
                         <th>Estado</th>
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
export default PagoEmpleado;
