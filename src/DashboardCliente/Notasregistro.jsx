import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faClipboard, faFileText,
  faHome, faSignOut, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const Notasregistro = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const emailUsuario = localStorage.getItem('email');

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

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido</h2>
        <p className="subtexto-email">{emailUsuario}</p>

        <ul>
          <li><Link to="/dashboardcliente"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteregistro"><FontAwesomeIcon icon={faUsers} /> <span>Cliente</span></Link></li>
          <li><Link to="/solicitudservicioc"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/notasregistro"> <FontAwesomeIcon icon={faClipboard} /> <span>Notas</span></Link></li>
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
        <Link to="/dashboardcliente" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de notas o sugerencias</h2>
        <FormularioNota />
      </div>
    </div>
  );
};

function FormularioNota() {
  const [formulario, setFormulario] = useState({
    id_cliente: '', // Guardamos como string para el select
    comentario: '',
    fecha_creacion: '',
    estado: 'activo',
  });

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const response = await fetch('http://localhost:8081/clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
      }
    };
    cargarClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value, // Guardamos siempre como string
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id_cliente, comentario, fecha_creacion, estado } = formulario;

    if (!id_cliente || !comentario || !fecha_creacion || !estado) {
      alert('Todos los campos son requeridos');
      return;
    }

    // Convertir id_cliente a número antes de enviar al backend
    const payload = {
      ...formulario,
      id_cliente: Number(id_cliente),
    };

    try {
      const respuesta = await fetch('http://localhost:8081/notas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (respuesta.ok) {
        alert('Nota registrada correctamente');
        setFormulario({
          id_cliente: '',
          comentario: '',
          fecha_creacion: '',
          estado: 'activo',
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
        <select
          name="id_cliente"
          className="campo-cita"
          value={formulario.id_cliente}
          onChange={handleChange}
        >
          <option value="">Selecciona tu nombre</option>
          {clientes.map(cliente => (
            <option key={cliente.id_cliente} value={String(cliente.id_cliente)}>
              {cliente.nombre}
            </option>
          ))}
        </select>

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
          className="campo-cita"
          value={formulario.fecha_creacion}
          onChange={handleChange}
        />
        <select
          name="estado"
          className="campo-cita"
          value={formulario.estado}
          onChange={handleChange}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Notasregistro;
