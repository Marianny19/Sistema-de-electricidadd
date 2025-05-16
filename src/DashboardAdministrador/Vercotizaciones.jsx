import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, faHome, faUsers, faUser, faFileText, faCalendar,
  faTasks, faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
  faSignOut, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";

const Vercotizaciones = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');

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
  const eliminarCotizacion = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas actualizar el estado de esta cotización?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:8081/cotizaciones/${id}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        setCotizaciones(prev => prev.filter(C => C.id_cotizacion !== id));
        alert("Estado de la cotización actualizada correctamente");
        window.location.reload();
      } else {
        alert("Error al actualizar el estado de la cotización");
      }
    } catch (error) {
      console.error('Error al actualizar el estado de  la cotización:', error);
      alert("Error de red al actualizar el estado de la cotización");
    }
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

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
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="/vercotizaciones"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
          <li><Link to="/factura"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
          <li><Link to="/pago"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pagos</span></Link></li>
        </ul>
        <ul>
          <li className="Cerrarsesion">
            <a href="#" onClick={cerrarSesion}>
              <Link to="/iniciarsesion">
                <FontAwesomeIcon icon={faSignOut} /> <span>Cerrar sesión</span>
              </Link>
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
        <h2>Bienvenido a la sección de Cotizaciones</h2>

        <div className="main-content">
            <Link to="/Cotizacion"><button className="Registro">+ Nueva cotizacion </button></Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                className="Buscar"
                type="search"
                placeholder="Buscar por ID o estado"
                value={busqueda}
                onChange={handleBusquedaChange}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className="tabla-empleados">
              <caption>Lista de cotizaciones</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Servicios</th>
                  <th>Subtotal</th>
                  <th>Impuestos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
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
                    <td>{c.estado}</td>
                    <td>
                      <Link to={`/Actualizarcotizacion/${c.id_cotizacion}`}>
                                               <button className="Actualizar">Actualizar</button>
                     </Link> 
                      <button
                        className="Eliminar"
                        onClick={() => eliminarCotizacion(c.id_cotizacion)}>Eliminar</button>
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

export default Vercotizaciones;
