import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faClipboard,
  faFileInvoice, faFileText, faHome, faReceipt, faSignOut,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";


const Clienteregistro = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/dashboardcliente"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteregistro"><FontAwesomeIcon icon={faUsers} /> <span>Cliente</span></Link></li>
          <li><Link to="/solicitarservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/notasregistro"><FontAwesomeIcon icon={faClipboard} /> <span>Notas</span></Link></li>
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
           <Link to="/dashboardcliente" className="boton-retroceso" aria-label="Volver">
                                  <FontAwesomeIcon icon={faChevronLeft} />
                                </Link>
        <h2>Bienvenido a la sección de nuevo cliente</h2>
        <FormularioCliente />
      </div>
    </div>
  );
};

function FormularioCliente() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: 'activo'
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
          cedula: '',
          telefono: '',
          email: '',
          direccion: '',
          estado:'activo'
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
        <input type="text" name="cedula" placeholder="Cedula" className="campo-cita" value={formulario.apellido} onChange={handleChange} />
        <input type="text" name="telefono" placeholder="Telefono" className="campo-cita" value={formulario.telefono} onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" className="campo-cita" value={formulario.email} onChange={handleChange} />
        <input type="text" name="direccion" placeholder="Direccion" className="campo-cita" value={formulario.direccion} onChange={handleChange} />
          <select name="estado" className="campo-cita" value={formulario.estado} onChange={handleChange} required>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Clienteregistro;
