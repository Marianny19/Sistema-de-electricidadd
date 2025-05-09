import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faClipboard, faFileInvoice,
  faHome, faReceipt, faSignOut, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Notasregistro = () => {
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
          <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/recomendacion"><FontAwesomeIcon icon={faReceipt} /> <span>Recomendación</span></Link></li>
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
        <h2>Bienvenido a la sección de notas o sugerencias</h2>
        <FormularioCliente />
      </div>
    </div>
  );
};

function FormularioCliente() {
  const [formulario, setFormulario] = useState({
    id_cita: '',
    comentario: '',
    fecha_creacion: '',
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.id_cita || !formulario.comentario || !formulario.fecha_creacion) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:8081/notas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario),
      });

      if (respuesta.ok) {
        alert('Nota registrada correctamente');
        setFormulario({
          id_cita: '',
          comentario: '',
          fecha_creacion: '',
        });
      } else {
        const errorData = await respuesta.json();
        console.error('Error al registrar nota:', errorData);
        alert('Error al registrar la nota');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al registrar nota');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">DEJANOS UNA NOTA O SUGERENCIA</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input
          type="number"
          name="id_cita"
          placeholder="Código de cita"
          className="campo-cita"
          value={formulario.id_cita}
          onChange={handleChange}
        />
        <input
          type="text"
          name="comentario"
          placeholder="Comentario"
          className="campo-cita"
          value={formulario.comentario}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="fecha_creacion"
          placeholder="Fecha y hora"
          className="campo-cita"
          value={formulario.fecha_creacion}
          onChange={handleChange}
        />
        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Notasregistro;
