import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,faHome,
  faSignOut, faUsers, 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";


const CrearClienteEmpleado = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

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
        <h2>Bienvenido a la sección de citas</h2>
        <FormularioCliente />
      </div>
    </div>
  );
};

function FormularioCliente() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:8081/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
        alert('Cliente registrado correctamente');
        setFormulario({
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
          direccion: ''
        });
      } else {
        alert('Error al registrar el cliente');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error de red al registrar cliente');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" className="campo-cita" value={formulario.nombre} onChange={handleChange} />
        <input type="text" name="apellido" placeholder="Apellido" className="campo-cita" value={formulario.apellido} onChange={handleChange} />
        <input type="text" name="telefono" placeholder="Telefono" className="campo-cita" value={formulario.telefono} onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" className="campo-cita" value={formulario.email} onChange={handleChange} />
        <input type="text" name="direccion" placeholder="Direccion" className="campo-cita" value={formulario.direccion} onChange={handleChange} />
        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default CrearClienteEmpleado;


