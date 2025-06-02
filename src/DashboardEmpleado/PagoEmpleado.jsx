import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const PagoEmpleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [busquedaPagoId, setBusquedaPagoId] = useState('');
  const navigate = useNavigate();
  const emailUsuario = localStorage.getItem('email');

  useEffect(() => {
    async function cargarPagos() {
      try {
        const response = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/pagos');
        const data = await response.json();
        setPagos(data);
      } catch (error) {
        console.error('Error al cargar pagos:', error);
      }
    }

    cargarPagos();
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

  const handleBusquedaPago = (e) => {
    setBusquedaPagoId(e.target.value);
  };

  const pagosFiltrados = pagos.filter(p =>
    p.id_pago.toString().includes(busquedaPagoId.toLowerCase())
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
        <Link to="/dashboardempleado" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de Pagos</h2>

        <div className="main-content">
          <Link to="/crearpagoempleado"><button className="Registro">+ Nuevo pago</button></Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-pago"
                className="Buscar"
                type="search"
                placeholder="Buscar por id"
                value={busquedaPagoId}
                onChange={handleBusquedaPago}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-pagos'>
              <caption>Lista de pagos</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Solicitud</th>
                  <th>Factura</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Método</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pagosFiltrados.map((pago) => (
                  <tr key={pago.id_pago}>
                    <td>{pago.id_pago}</td>
                    <td>{pago.id_solicitud}</td>
                    <td>{pago.factura_id}</td>
                    <td>{pago.monto}</td>
                    <td>{pago.fecha_pago}</td>
                    <td>{pago.metodo_pago}</td>
                    <td>{pago.estado}</td>

                    
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

export default PagoEmpleado;
