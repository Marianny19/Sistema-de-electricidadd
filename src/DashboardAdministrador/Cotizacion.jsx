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
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState({});
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function cargarServicios() {
      try {
        const response = await fetch('http://localhost:8081/servicios');
        const data = await response.json();
        setServicios(data);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      }
    }

    cargarServicios();
  }, []);

  useEffect(() => {
    fetch('http://localhost:8081/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Error cargando clientes:', err));
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const cerrarSesion = (e) => {
    e.preventDefault();
    console.log("Cerrar sesión");
  };

  const manejarSeleccion = (id_servicio) => {
    setServiciosSeleccionados(prev => ({
      ...prev,
      [id_servicio]: !prev[id_servicio]
    }));
  };

  const subtotal = servicios
    .filter(s => serviciosSeleccionados[s.id_servicio])
    .reduce((acc, s) => acc + Number(s.costo_base || 0), 0);

  const impuesto = subtotal * 0.18;
  const total = subtotal + impuesto;

  const handleGuardar = async (e) => {
    e.preventDefault();
    const datosCotizacion = {
      id_cliente: Number(cliente),
      fecha,
      estado,
      servicios: Object.keys(serviciosSeleccionados)
        .filter(id => serviciosSeleccionados[id])
        .map(id => Number(id)),
      subtotal,
      impuesto,
      total
    };

    try {
      const response = await fetch('http://localhost:8081/cotizaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosCotizacion)
      });

      if (response.ok) {
        alert("Cotización guardada correctamente.");
        // Aquí puedes limpiar el formulario si deseas
      } else {
        alert("Error al guardar la cotización.");
      }
    } catch (error) {
      console.error('Error al guardar la cotización:', error);
      alert("Error en la conexión al guardar la cotización.");
    }
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    console.log("Enviando cotización");
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
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <Link to="/dashboard" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de cotización</h2>

        <div className="invoice-container">
          <div className="invoice-card">
            <div className="invoice-grid">
              <div className="input-group">
                <label htmlFor="id_cliente">Cliente</label>
                <select
                  name="id_cliente"
                  className="campo-cita"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  required
                >
                  <option value="">Selecciona un cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
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
                {Array.isArray(servicios) && servicios.length > 0 ? (
                  servicios.map((servicio) => (
                    <tr key={servicio.id_servicio}>
                      <td>
                        <input
                          type="checkbox"
                          id={`servicio-${servicio.id_servicio}`}
                          name={`servicio-${servicio.id_servicio}`}
                          checked={!!serviciosSeleccionados[servicio.id_servicio]}
                          onChange={() => manejarSeleccion(servicio.id_servicio)}
                        />
                      </td>
                      <td>
                        <label htmlFor={`servicio-${servicio.id_servicio}`}>
                          {servicio.nombre_servicio}
                        </label>
                      </td>
                      <td>${Number(servicio.costo_base).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3">No hay servicios disponibles</td></tr>
                )}
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
              <button onClick={handleGuardar} className="save">Guardar</button>
              <button onClick={handleEnviar} className="send">Enviar</button>
              <button className="cancel">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cotizacion;
