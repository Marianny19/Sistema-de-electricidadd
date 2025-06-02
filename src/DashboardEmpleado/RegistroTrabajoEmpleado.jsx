import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers, faFileText,
  faTasks, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const RegistroTrabajoEmpleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();
  const emailUsuario = localStorage.getItem('email');

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/iniciarsesion', { replace: true });
    window.history.pushState(null, '', '/iniciarsesion');
    window.onpopstate = () => window.history.go(1);
  };

  useEffect(() => {
    async function cargarRegistros() {
      try {
        const response = await fetch("https://sistema-de-electricidadd-production-f62b.up.railway.app/registrotrabajo");
        if (!response.ok) throw new Error("Error en la solicitud");
        const data = await response.json();
        console.log("Respuesta del backend registros:", data);
        setRegistros(data);
      } catch (error) {
        console.error("Error al cargar registros:", error);
        alert("Error al cargar registros de trabajo");
      }
    }
    cargarRegistros();
  }, []);

  const registrosFiltrados = registros.filter(r =>
    r.id_solicitud_servicio.toString().includes(filtro.toLowerCase()) ||
    r.id_empleado.toString().includes(filtro.toLowerCase())
  );

  console.log("Registros filtrados:", registrosFiltrados);

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido</h2>
        <p className="subtexto-email">{emailUsuario}</p>
            <ul>
                   <li><a href="/dashboardempleado"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></a></li>
                   <li><Link to="/clienteDempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
                   <li><Link to="/registrarservicioempleado"><FontAwesomeIcon icon={faFileText} /> <span>Solicitar Servicios</span></Link></li>
                   <li><Link to="/citaempleado"><FontAwesomeIcon icon={faCalendar} /> <span>Cita</span></Link></li>
                   <li><Link to="/registrotrabajoempleado"><FontAwesomeIcon icon={faTasks} /> <span>Registro Trabajo</span></Link></li>
                   <li><Link to="/vercotizacionempleado"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
                   <li><Link to="/facturaempleado"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
                   <li><Link to="/pagoempleado"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pago</span></Link></li>
                 </ul>
        <ul>
          <li className="Cerrarsesion">
            <button
              onClick={cerrarSesion}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}
            >
              <FontAwesomeIcon icon={faSignOut} /> <span>Cerrar sesión</span>
            </button>
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
        <h2>Bienvenido a la sección de registro de trabajo</h2>

        <div className="main-content">
          <Link to="/crearregistroempleado">
            <button className="Registro">+ Nuevo registro</button>
          </Link>

          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-registro"
                className="Buscar"
                type="search"
                placeholder="Buscar por solicitud o empleado"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-empleados'>
              <caption>Lista de registros</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Solicitud</th>
                  <th>Cliente</th>
                  <th>Empleado</th>
                  <th>Servicios</th>
                  <th>Costo extra</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {registrosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="7">No hay registros disponibles.</td>
                  </tr>
                ) : (
                  registrosFiltrados.map((registro) => (
                    <tr key={registro.id_registro_trabajo || registro.id}>
                      <td>{registro.id_registro_trabajo || registro.id}</td>
                      <td>{registro.id_solicitud_servicio}</td>
                      <td>{registro.nombre_cliente}</td>
                      <td>{registro.id_empleado}</td>
                      <td>
                        {registro.servicios && Array.isArray(registro.servicios)
                          ? registro.servicios.map(s => s.nombre_servicio).join(", ")
                          : "Sin servicios"}
                      </td>
                      <td>${registro.costo_extra}</td>
                      <td>{new Date(registro.fecha).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroTrabajoEmpleado;
