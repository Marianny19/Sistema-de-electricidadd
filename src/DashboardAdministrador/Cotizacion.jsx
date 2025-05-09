import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft, faSignOut, faHome, faUsers, faUser, faCalendar,
  faFileInvoice, faFileText, faTasks, faFileInvoiceDollar,
  faMoneyCheck
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../index.css";

const Cotizacion = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const [servicios, setServicios] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  useEffect(() => {
    fetch("/api/servicios")
      .then(res => res.json())
      .then(data => setServicios(data))
      .catch(err => console.error("Error al cargar servicios:", err));
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  const manejarSeleccion = (id) => {
    if (serviciosSeleccionados.includes(id)) {
      setServiciosSeleccionados(serviciosSeleccionados.filter(s => s !== id));
    } else {
      setServiciosSeleccionados([...serviciosSeleccionados, id]);
    }
  };

  const subtotal = servicios
    .filter(s => serviciosSeleccionados.includes(s.id))
    .reduce((acc, s) => acc + s.precioBase, 0);

  const impuesto = subtotal * 0.18;
  const total = subtotal + impuesto;

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido cliente</h2>
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
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <h2>Cotización</h2>
        <div className="invoice-container">
          <div className="invoice-card">
            <div className="invoice-grid">
              <div className="input-group">
                <label>Cliente</label>
                <input
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Estado</label>
                <select
                  className="campo-cita"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="">Selecciona estado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="aceptada">Aceptada</option>
                  <option value="rechazada">Rechazada</option>
                </select>
              </div>
            </div>

            <h3>Servicios disponibles</h3>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Seleccionar</th>
                  <th>Servicio</th>
                  <th>Precio base</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((servicio) => (
                  <tr key={servicio.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={serviciosSeleccionados.includes(servicio.id)}
                        onChange={() => manejarSeleccion(servicio.id)}
                      />
                    </td>
                    <td>{servicio.nombre}</td>
                    <td>${servicio.precioBase.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
          </div>

          <div className="invoice-summary">
            <h2>Suma</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Imp (18%)</span>
              <span>${impuesto.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
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
