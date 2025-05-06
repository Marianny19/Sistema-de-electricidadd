import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSignOut, faHome, faUsers, faCalendar, faFileInvoice, faReceipt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Cotizacion = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");


  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido cliente</h2>
        <ul>
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faCalendar} /> <span>Empleados</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faFileInvoice} /> <span>Citas</span></Link></li>
          <li><Link to="/cotizacion"><FontAwesomeIcon icon={faReceipt} /> <span>Cotizacion</span></Link></li>
          <li><Link to="/factura"><FontAwesomeIcon icon={faClipboard} /> <span>Factura</span></Link></li>
          <li><Link to="/pago"><FontAwesomeIcon icon={faClipboard} /> <span>Pago</span></Link></li>

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
        <h2>Cotizacion</h2>
        <div className="invoice-container">
          <div className="invoice-card">
            <div className="invoice-grid">
              <div className="input-group">
                <label>Cliente</label>
                <input type="text"/>
              </div>
              <div className="input-group">
                <label>Correo</label>
                <input type="email" />
              </div>
              <div className="input-group">
                <label>Telefono</label>
                <input type="tel"/>
              </div>
              <div className="input-group">
                <label>Fecha</label>
                <input type="date" />
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
             
            </table>
            <div className="subtotal">Subtotal:</div>
          </div>

          <div className="invoice-summary">
            <h2>Suma</h2>
            <div className="summary-row">
              <span>Subtotal</span>
            </div>
            <div className="summary-row">
              <span>Imp</span>
            </div>
            <div className="summary-row">
              <span>Descuento</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
            </div>

            <div className="button-group">
              <button className="save">Guardar</button>
              <button className="send">Enviar</button>
              <button className="cancel">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cotizacion;
