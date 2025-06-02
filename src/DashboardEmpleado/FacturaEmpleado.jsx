import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUsers, faUser, faCalendar,
  faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
  faClipboard, faCartArrowDown, faSignOut, faChevronLeft, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import "../index.css";

const Facturaempleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [facturas, setFacturas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
 

  const emailUsuario = localStorage.getItem('email');

  useEffect(() => {
    async function cargarFacturas() {
      try {
        const response = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/facturas');
        if (!response.ok) throw new Error('Error al cargar facturas');
        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error('Error al cargar facturas:', error);
      }
    }

    cargarFacturas();
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

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  

  const facturasFiltradas = facturas.filter(f =>
    f.id.toString().includes(busqueda.toLowerCase()) ||
    f.solicitud_id?.toString().includes(busqueda.toLowerCase()) ||
    (f.estado?.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return 'N/A';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString();
  };

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
        <h2>Bienvenido a la sección de Factura</h2>

        <div className="main-content">

          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-factura"
                className="Buscar"
                type="search"
                placeholder="Buscar por ID, solicitud, pago o estado"
                value={busqueda}
                onChange={handleBusqueda}
                autoComplete="off"
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-factura'>
              <caption>Lista de facturas</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Solicitud</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {facturasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>
                      No se encontraron facturas.
                    </td>
                  </tr>
                ) : (
                  facturasFiltradas.map((factura) => {
                    const descripcionDetalles = factura.detalles && factura.detalles.length > 0
                      ? factura.detalles.map(d => d.descripcion).join(', ')
                      : 'N/A';

                    return (
                      <tr key={factura.id}>
                        <td>{factura.id}</td>
                        <td>{factura.solicitud_id}</td>
                        <td>{formatearFecha(factura.fecha_emision)}</td>
                        <td>{factura.total}</td>
                        <td>{descripcionDetalles}</td>
                        <td>{factura.estado}</td>

                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facturaempleado;
