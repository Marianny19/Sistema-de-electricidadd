import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUsers, faUser, faCalendar,
  faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
  faClipboard, faCartArrowDown, faSignOut, faChevronLeft, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import "../index.css";

const Factura = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [facturas, setFacturas] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    async function cargarFacturas() {
      try {
        const response = await fetch('http://localhost:8081/facturas');
        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error('Error al cargar facturas:', error);
      }
    }

    cargarFacturas();
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const facturasFiltradas = facturas.filter(f =>
    f.id.toString().includes(busqueda.toLowerCase())
  );

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
        <h2>Bienvenido a la sección de Factura</h2>
        <div className="main-content">
          <button className="Registro" onClick={() => console.log("Generar reporte")}> Generar reporte </button>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-factura"
                className="Buscar"
                type="search"
                placeholder="Buscar facturas"
                value={busqueda}
                onChange={handleBusqueda}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-factura'>
              <caption>Lista de facturas</caption>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Solicitud</th>
                  <th>Pago</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facturasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>
                      No se encontraron facturas.
                    </td>
                  </tr>
                ) : (
                  facturasFiltradas.map((factura) => (
                    <tr key={factura.id}>
                      <td>{factura.id}</td> 
                      <td>{factura.solicitud_id}</td>
                      <td>{factura.pago_id}</td>
                      <td>{factura.fecha_emision}</td>
                      <td>{factura.total}</td>
                      <td>{factura.descripcion || 'N/A'}</td>
                      <td>{factura.estado}</td>
                      <td>
                          <button
                        className="Eliminar"
                        onClick={() => eliminarPago(pago.id_pago)}>
                        Eliminar
                      </button>
                      </td>
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

export default Factura;
