import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Crearempleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/cotizacion"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
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
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <h2>Bienvenido a la sección de crear usuario</h2>
        <Crearcitas />
      </div>
    </div>
  );
};


function Crearcitas() {
  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">CREAR NUEVO EMPLEADO</h1>
      <form className="formulario-cita">
        <input type="number" placeholder="Codigo" className="campo-cita" />
        <input type="text" placeholder="Nombre" className="campo-cita" />
        <input type="text" placeholder = "Apellido" className="campo-cita" />
        <input type="text" placeholder="Email" className="campo-cita" />
        <input type="text" placeholder = "Cargo" className="campo-cita" />
        <input type="number" placeholder = "Salario" className="campo-cita" />
        <input type="date" placeholder = "Fecha ingreso" className="campo-cita" />
        <input type="date" placeholder = "Fecha nacimiento" className="campo-cita" />
        <input type="text" placeholder = "Direccion" className="campo-cita" />
        <select className="campo-cita">
      <option value="">Estado</option>
      <option value="activo">activo</option>
      <option value="inactivo">inactivo</option>

    </select>

        <button type="submit" className="boton-cita">Realizar cita</button>
      </form>
    </div>
  );
}

export default Crearempleado;
