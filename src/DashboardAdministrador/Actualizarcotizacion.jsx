import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft, faSignOut, faHome, faUsers, faUser, faCalendar,
  faFileInvoice, faFileText, faTasks, faFileInvoiceDollar, faMoneyCheck
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../index.css";

const ActualizarCotizacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState({});

  const emailUsuario = localStorage.getItem("email") || "usuario@ejemplo.com";

  useEffect(() => {
    if (!id) return;

    async function cargarCotizacion() {
      try {
        const response = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/cotizaciones/${id}`);
        const data = await response.json();

        if (response.ok) {
          setCliente(String(data.id_cliente));
          setFecha(data.fecha ? data.fecha.split("T")[0] : "");
          setEstado(data.estado);

          const serviciosIds = {};
          (data.servicios || []).forEach(servicio => {
            serviciosIds[servicio.id_servicio] = true;
          });
          setServiciosSeleccionados(serviciosIds);
        } else {
          alert(data.message || "Error al cargar cotización");
        }
      } catch (error) {
        console.error("Error al cargar cotización:", error);
      }
    }

    cargarCotizacion();
  }, [id]);

  useEffect(() => {
    fetch("https://sistema-de-electricidadd-production-f62b.up.railway.app/clientes")
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error("Error cargando clientes:", err));
  }, []);

  useEffect(() => {
    fetch("https://sistema-de-electricidadd-production-f62b.up.railway.app/servicios")
      .then(res => res.json())
      .then(data => setServicios(data))
      .catch(err => console.error("Error cargando servicios:", err));
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/iniciarsesion', { replace: true });
    window.history.pushState(null, '', '/iniciarsesion');
    window.onpopstate = () => window.history.go(1);
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

  const handleActualizar = async (e) => {
    e.preventDefault();

    const datosActualizados = {
      id_cliente: Number(cliente),
      fecha,
      estado,
      servicios: Object.keys(serviciosSeleccionados)
        .filter(id => serviciosSeleccionados[id])
        .map(id => {
          const servicio = servicios.find(s => s.id_servicio === Number(id));
          return {
            id_servicio: Number(id),
            costo_base: Number(servicio.costo_base)
          };
        }),
      subtotal,
      impuesto,
      total
    };

    try {
      const response = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/cotizaciones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados)
      });

      if (response.ok) {
        alert("Cotización actualizada correctamente.");
        navigate("/vercotizaciones");
      } else {
        alert("Error al actualizar la cotización.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo actualizar la cotización.");
    }
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido</h2>
        <p className="subtexto-email">{emailUsuario}</p>

        <ul>
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="/vercotizaciones"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
          <li><Link to="/factura"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
          <li><Link to="/pago"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pagos</span></Link></li>
        </ul>

        <ul>
          <li className="Cerrarsesion">
            <button onClick={cerrarSesion} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}>
              <FontAwesomeIcon icon={faSignOut} /> <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>

        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <Link to="/vercotizaciones" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección actualizar cotización</h2>

        <div className="invoice-container">
          <div className="invoice-card">
            <div className="invoice-grid">
              <div className="input-group">
                <label htmlFor="cliente">Cliente</label>
                <select
                  id="cliente"
                  className="campo-cita"
                  value={cliente}
                  onChange={e => setCliente(e.target.value)}
                  required
                >
                  <option value="">Selecciona un cliente</option>
                  {clientes.map(c => (
                    <option key={c.id_cliente} value={c.id_cliente}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  className="campo-cita"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  className="campo-cita"
                  value={estado}
                  onChange={e => setEstado(e.target.value)}
                  required
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
                {servicios.length > 0 ? (
                  servicios.map(servicio => (
                    <tr key={servicio.id_servicio}>
                      <td>
                        <input
                          type="checkbox"
                          checked={!!serviciosSeleccionados[servicio.id_servicio]}
                          onChange={() => manejarSeleccion(servicio.id_servicio)}
                        />
                      </td>
                      <td>{servicio.nombre_servicio}</td>
                      <td>${Number(servicio.costo_base).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3">Cargando servicios...</td></tr>
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
              <button className="save" onClick={handleActualizar}>Actualizar</button>
              <button className="cancel" onClick={() => navigate("/vercotizaciones")}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualizarCotizacion;
