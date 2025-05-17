import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, faHome, faUsers, faUser, faFileText, faCalendar,
  faTasks, faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
  faSignOut, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const Vercotizacionempleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const emailUsuario = localStorage.getItem('email');


  useEffect(() => {
    async function cargarCotizaciones() {
      try {
        const response = await fetch('http://localhost:8081/cotizaciones');
        const data = await response.json();
        setCotizaciones(data);
      } catch (error) {
        console.error('Error al cargar cotizaciones:', error);
      }
    }

    cargarCotizaciones();
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

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const cotizacionesFiltradas = cotizaciones.filter(c =>
    c.id_cotizacion.toString().includes(busqueda.toLowerCase()) ||
    c.estado.toLowerCase().includes(busqueda.toLowerCase())
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
        <Link to="/dashboard" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de Cotizaciones</h2>

        <div className="main-content">
          <Link to="/cotizacionempleado"><button className="Registro">+ Nueva cotizacion </button></Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                className="Buscar"
                type="search"
                placeholder="Buscar por id o estado"
                value={busqueda}
                onChange={handleBusquedaChange}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className="tabla-empleados">
              <caption>Lista de cotizaciones</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Servicios</th>
                  <th>Subtotal</th>
                  <th>Impuestos</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {cotizacionesFiltradas.map((c) => (
                  <tr key={c.id_cotizacion}>
                    <td>{c.id_cotizacion}</td>
                    <td>{c.cliente?.nombre || 'Sin nombre'}</td>
                    <td>{c.fecha_emision}</td>
                    <td>
                      {c.detalles && c.detalles.length > 0
                        ? c.detalles.map((d) => d.servicio?.nombre_servicio).join(', ')
                        : 'Sin servicios'}
                    </td>

                    <td>{c.subtotal}</td>
                    <td>{c.impuestos}</td>
                    <td>{c.total}</td>
                    <td>{c.estado}</td>                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Vercotizacionempleado;
