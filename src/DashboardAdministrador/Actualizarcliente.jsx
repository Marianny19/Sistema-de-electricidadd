import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import "../index.css";


const Actualizarcliente = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
                   <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
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
        <h2>Bienvenido a la sección de actualizar cliente</h2>
        <FormularioCliente />
      </div>
    </div>
  );
};

function FormularioCliente() {
  const { id } = useParams();
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  useEffect(() => {
    // Cargar los datos existentes del cliente
    fetch(`http://localhost:8081/clientes/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormulario(data);
      })
      .catch(error => {
        console.error('Error al cargar cliente:', error);
        alert('No se pudo cargar la información del cliente');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(`http://localhost:8081/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
        alert('Cliente actualizado correctamente');
      } else {
        alert('Error al actualizar el cliente');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error de red al actualizar cliente');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">MODIFICA LOS CAMPOS NECESARIOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" className="campo-cita" value={formulario.nombre} onChange={handleChange} />
        <input type="text" name="apellido" placeholder="Apellido" className="campo-cita" value={formulario.apellido} onChange={handleChange} />
        <input type="text" name="telefono" placeholder="Telefono" className="campo-cita" value={formulario.telefono} onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" className="campo-cita" value={formulario.email} onChange={handleChange} />
        <input type="text" name="direccion" placeholder="Direccion" className="campo-cita" value={formulario.direccion} onChange={handleChange} />
        <button type="submit" className="boton-cita">ACTUALIZAR</button>
      </form>
    </div>
  );
}

export default Actualizarcliente;
