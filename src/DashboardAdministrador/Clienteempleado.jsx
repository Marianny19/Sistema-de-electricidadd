import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faFileText, faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../index.css";


const Clienteempleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [busquedaId, setBusquedaId] = useState('');
  const navigate = useNavigate();

  const emailUsuario = localStorage.getItem('email');




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
    const confirmar = window.confirm("¿Estás seguro de que deseas cambiar el estado de este cliente a inactivo?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:8081/clientes/${id}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        setClientes(prevClientes => prevClientes.filter(c => c.id_cliente !== id));
        alert("Estado del cliente modificado correctamente");
        window.location.reload();
      } else {
        alert("Error al modificar el estado cliente");
      }
    } catch (error) {
      console.error('Error al modificar el estado del cliente:', error);
      alert("Error de red al cambiar el estado del cliente");
    }
  };

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
    setBusquedaId(e.target.value);
  };

  const clientesFiltrados = clientes.filter(c =>
    c.id_cliente.toString().includes(busquedaId.toLowerCase()) ||
    c.nombre.toLowerCase().includes(busquedaId.toLowerCase())
  );


  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido</h2>
        <p className="subtexto-email">{emailUsuario}</p>
        <ul>
          <li><Link to="/Dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
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
        <h2>Bienvenido a la sección de Clientes</h2>

        <div className="main-content">
          <Link to="/crearcliente"><button className="Registro">+ Nuevo cliente</button></Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-cliente"
                className="Buscar"
                type="search"
                placeholder="Buscar por id y nombre"
                value={busquedaId}
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
                  <th>Cédula</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-clientes">
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id_cliente}>
                    <td data-label="Id cliente">{cliente.id_cliente}</td>
                    <td data-label="Nombre">{cliente.nombre}</td>
                    <td data-label="Apellido">{cliente.apellido}</td>
                    <td data-label="Cedula">{cliente.cedula}</td>
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
                        onClick={() => eliminarCliente(cliente.id_cliente)}>
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
