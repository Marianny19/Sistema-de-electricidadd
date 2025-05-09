import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";


const ClienteEmpleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function cargarClientes() {
      try {
        const response = await fetch('http://localhost:8081/clientes'); 
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
      }
    }
  
    cargarClientes();
  }, []);
   
 
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");


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
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div className="dashboard-content">
        <h2>Bienvenido a la sección de Clientes</h2>

        <div className="main-content">
               <Link to="/crearclienteempleado"><button className="Registro">+ Nuevo cliente</button></Link>
              <div className="input-container-wrapper">
                <div className="input-container">
                  <input id="buscar-cliente" className="Buscar" type="search" placeholder="Buscar cliente" />
                  <FontAwesomeIcon icon={faSearch} />
                </div>

            <table className='tabla-clientes'>
              <caption>Lista de clientes</caption>
              <thead>
                <tr>
                  <th> Id cliente</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Direccion</th>
                </tr>
              </thead>
              <tbody id="tabla-clientes">
              {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
             <td data-label="Id cliente">{cliente.id_cliente}</td>
            <td data-label="Nombre">{cliente.nombre}</td>
            <td data-label="Apellido">{cliente.apellido}</td>
            <td data-label="Teléfono">{cliente.telefono}</td>
            <td data-label="Email">{cliente.email}</td>
            <td data-label="Dirección">{cliente.direccion}</td>
              </tr>
        ))}
          </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


  );
};
export default ClienteEmpleado;
