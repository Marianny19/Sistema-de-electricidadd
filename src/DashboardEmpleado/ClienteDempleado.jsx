import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";

const Clienteempleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    async function cargarClientes() {
      try {
        const response = await fetch('http://localhost:8081/clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
      }
    }

    cargarClientes();
  }, []);

  const eliminarCliente = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:8081/clientes/${id}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        setClientes(prev => prev.filter(c => c.id_cliente !== id));
        alert("Cliente eliminado correctamente");
      } else {
        alert("Error al eliminar cliente");
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      alert("Error de red al eliminar cliente");
    }
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const clientesFiltrados = clientes.filter(cliente => {
    const term = busqueda.toLowerCase();
    return (
      cliente.id_cliente.toString().includes(term) ||
      cliente.nombre.toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><a href="/dashboardempleado"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></a></li>
                 <li><Link to="/clienteDempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
                 <li><Link to="/registrarservicioempleado"><FontAwesomeIcon icon={faFileText} /> <span>Solicitar Servicios</span></Link></li>
                 <li><Link to="/citaempleado"><FontAwesomeIcon icon={faCalendar} /> <span>Cita</span></Link></li>
                 <li><Link to="/registrotrabajoempleado"><FontAwesomeIcon icon={faTasks} /> <span>Registro Trabajo</span></Link></li>
                 <li><Link to="/cotizacionempleado"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
                 <li><Link to="/facturaempleado"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
                 <li><Link to="/pagoempleado"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pago</span></Link></li>
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
        <h2>Bienvenido a la sección de Clientes</h2>

        <div className="main-content">
          <Link to="/crearcliente"><button className="Registro">+ Nuevo cliente</button></Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-cliente"
                className="Buscar"
                type="search"
                placeholder="Buscar por ID y nombre"
                value={busqueda}
                onChange={handleBusquedaChange}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-clientes'>
              <caption>Lista de clientes</caption>
              <thead>
                <tr>
                  <th>Id cliente</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Cedula</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Direccion</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id_cliente}>
                    <td>{cliente.id_cliente}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.apellido}</td>
                    <td>{cliente.cedula}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.direccion}</td>
                    <td>{cliente.estado}</td>
                    <td>
                      <Link to={`/actualizarcliente/${cliente.id_cliente}`}>
                        <button className="Actualizar">Actualizar</button>
                      </Link>
                      <button className="Eliminar" onClick={() => eliminarCliente(cliente.id_cliente)}>
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

export default Clienteempleado;
