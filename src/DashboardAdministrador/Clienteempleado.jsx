import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faFileText, faTasks, 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";


const Clienteempleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clientes, setClientes] = useState([]);

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
        // Eliminar visualmente de la lista
        setClientes(prevClientes => prevClientes.filter(c => c.id_cliente !== id));
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


  return (
    
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/Dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
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
        <h2>Bienvenido a la sección de Clientes</h2>

        <div className="main-content">
               <Link to="/crearcliente"><button className="Registro">+ Nuevo cliente</button></Link>
              <div className="input-container-wrapper">
                <div className="input-container">
                  <input id="buscar-cliente" className="Buscar" type="search" placeholder="Buscar cliente" />
                  <FontAwesomeIcon icon={faSearch} />
                </div>

            <table className='tabla-clientes'>
              <caption>Lista de clientes</caption>
              <thead>
                <tr>
                  <th> Id cliente</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Direccion</th>
                   <th>Estado</th>
                  <th>Acciones</th>
                  
                </tr>
              </thead>
              <tbody id="tabla-clientes">
              {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
             <td data-label="Id cliente">{cliente.id_cliente}</td>
            <td data-label="Nombre">{cliente.nombre}</td>
            <td data-label="Apellido">{cliente.apellido}</td>
            <td data-label="Teléfono">{cliente.telefono}</td>
            <td data-label="Email">{cliente.email}</td>
            <td data-label="Dirección">{cliente.direccion}</td>
              <td data-label="Estado">{cliente.estado}</td>
            <td data-label="Acciones">
            <Link to={`/actualizarcliente/${cliente.id_cliente}`}>
             <button className="Actualizar">Actualizar</button>
            </Link>
            <button
             className="Eliminar"
             onClick={() => eliminarCliente(cliente.id_cliente)}>Eliminar</button>
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
