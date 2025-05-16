import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";

const Pago = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [busquedaPagoId, setBusquedaPagoId] = useState('');

  useEffect(() => {
    async function cargarPagos() {
      try {
        const response = await fetch('http://localhost:8081/pagos');
        const data = await response.json();
        setPagos(data);
      } catch (error) {
        console.error('Error al cargar pagos:', error);
      }
    }

    cargarPagos();
  }, []);

  const eliminarPago = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este pago?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:8081/pagos/${id}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        setPagos(prevPagos => prevPagos.filter(p => p.id_pago !== id));
        alert("Pago eliminado correctamente");
      } else {
        alert("Error al eliminar pago");
      }
    } catch (error) {
      console.error('Error al eliminar pago:', error);
      alert("Error de red al eliminar pago");
    }
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  const handleBusquedaPago = (e) => {
    setBusquedaPagoId(e.target.value);
  };

  const pagosFiltrados = pagos.filter(p =>
    p.id_pago.toString().includes(busquedaPagoId.toLowerCase())
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
          <li><Link to="/vercotizaciones"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
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
        <h2>Bienvenido a la sección de Pagos</h2>

        <div className="main-content">
          <Link to="/pagoform"><button className="Registro">+ Nuevo pago</button></Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-pago"
                className="Buscar"
                type="search"
                placeholder="Buscar pago por ID"
                value={busquedaPagoId}
                onChange={handleBusquedaPago}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-pagos'>
              <caption>Lista de pagos</caption>
              <thead>
                <tr>
                  <th>ID Pago</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Método</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pagosFiltrados.map((pago) => (
                  <tr key={pago.id_pago}>
                    <td>{pago.id_pago}</td>
                    <td>{pago.monto}</td>
                    <td>{pago.fecha_pago}</td>
                    <td>{pago.metodo_pago}</td>
                    <td>{pago.estado}</td>
                    <td>
                      <Link to={`/actualizarpago/${pago.id_pago}`}>
                        <button className="Actualizar">Actualizar</button>
                      </Link>
                      <button
                        className="Eliminar"
                        onClick={() => eliminarPago(pago.id_pago)}>
                        Eliminar
                      </button>
                    </td>
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

export default Pago;
