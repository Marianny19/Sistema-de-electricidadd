import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers,
  faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const CitaEmpelado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [citas, setCitas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  const emailUsuario = localStorage.getItem('email');

  useEffect(() => {
    async function cargarCitas() {
      try {
        const response = await fetch('http://localhost:8081/citas');
        const data = await response.json();
        setCitas(data);
      } catch (error) {
        console.error('Error al cargar citas:', error);
      }
    }

    cargarCitas();
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/iniciarsesion', { replace: true });
    window.history.pushState(null, '', '/iniciarsesion');
    window.onpopstate = () => {
      window.history.go(1);
    };
  };

  const citasFiltradas = citas.filter(cita =>
    cita.id_cita.toString().includes(filtro.toLowerCase()) ||
    cita.nombre_cliente.toLowerCase().includes(filtro.toLowerCase())
  );

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
        <Link to="/dashboardempelado" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de citas</h2>

        <div className="main-content">
          <Link to="/crearcitaempleado">
            <button className="Registro">+ Nueva cita</button>
          </Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-empleado"
                className="Buscar"
                type="search"
                placeholder="Buscar por id o cliente"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-empleados'>
              <caption>Lista de citas</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Empleado</th>
                  <th>Solicitud</th>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citasFiltradas.length === 0 ? (
                  <tr><td colSpan="7">No hay citas que coincidan.</td></tr>
                ) : (
                  citasFiltradas.map((cita) => (
                    <tr key={cita.id_cita}>
                      <td data-label="Id cita">{cita.id_cita}</td>
                      <td data-label="Cliente">{cita.nombre_cliente}</td>
                      <td data-label="Empleado">{cita.nombre_empleado}</td>
                      <td data-label="Solicitud">{cita.id_solicitud}</td>

                      <td data-label="Servicio">
                        {cita.servicios ? cita.servicios : 'No hay servicios'}
                      </td>
                      <td data-label="Fecha">{cita.fecha}</td>
                      <td data-label="Hora">{cita.hora}</td>
                      <td data-label="Estado">{cita.estado}</td>
                      <td data-label="Acciones"></td>
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

export default CitaEmpelado;
