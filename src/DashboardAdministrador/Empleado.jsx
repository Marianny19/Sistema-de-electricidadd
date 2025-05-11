import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";


const Empleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    async function cargarEmpleados() {
      try {
        const response = await fetch('http://localhost:8081/empleados'); 
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Error al cargar empleados:', error);
      }
    }
  
    cargarEmpleados();
  }, []);
  const eliminarEmpleado = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este empleado?");
    if (!confirmar) return;
  
    try {
      const respuesta = await fetch(`http://localhost:8081/empleados/${id}`, {
        method: 'DELETE'
      });
  
      if (respuesta.ok) {
        setEmpleados(prevEmpleados => prevEmpleados.filter(c => c.id_empleado !== id));
        alert("Empleado eliminado correctamente");
      } else {
        alert("Error al eliminar empleado");
      }
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      alert("Error de red al eliminar empleado");
    }
  };  
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

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
          <li><Link to="/cotizacion"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
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
        <h2>Bienvenido a la sección de empleados</h2>

        <div className="main-content">
              <Link to="/crearempleado"><button className="Registro">+ Nuevo empleado</button></Link>
              <div className="input-container-wrapper">
                <div className="input-container">
                  <input id="buscar-empleado" className="Buscar" type="search" placeholder="Buscar empleado" />
                  <FontAwesomeIcon icon={faSearch} />
                </div>

            <table className='tabla-empleados'>
              <caption>Lista de empleados</caption>
              <thead>
                <tr>
                <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Cargo</th>
                  <th>Salario</th>
                  <th>Fecha ingreso</th>
                  <th>Fecha nacimiento</th>
                  <th>Direccion</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-empleados">
                              {empleados.map((empleado) => (
                              <tr key={empleado.id_empleado}>
                             <td data-label="Id empleado">{empleado.id_empleado}</td>
                            <td data-label="Nombre">{empleado.nombre}</td>
                            <td data-label="Apellido">{empleado.apellido}</td>
                            <td data-label="Teléfono">{empleado.telefono}</td>
                            <td data-label="Email">{empleado.email}</td>
                            <td data-label="Cargo">{empleado.cargo}</td>
                            <td data-label="Salario">{empleado.salario}</td>
                            <td data-label="Fecha de ingreso">{empleado.fecha_ingreso}</td>
                            <td data-label="Fecha de nacimiento">{empleado.fecha_nacimiento}</td>
                            <td data-label="Dirección">{empleado.direccion}</td>
                            <td data-label="Estado">{empleado.estado}</td>
                            <td data-label="Acciones">
                            <Link to={`/actualizarempleado/${empleado.id_empleado}`}>
                             <button className="Actualizar">Actualizar</button>
                            </Link>
                            <button
                             className="Eliminar"
                             onClick={() => eliminarEmpleado(empleado.id_empleado)}>Eliminar</button>
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
export default Empleado;
