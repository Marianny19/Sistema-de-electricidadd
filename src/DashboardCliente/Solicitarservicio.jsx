import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faClipboard,faHome,
  faSignOut, faUsers, faSearch,
  faFileText
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots';
import "../index.css";


const Solicitudservicio = () => {
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
                  <li><Link to="/notasregistro"> <FontAwesomeIcon icon={faClipboard}/> <span>Notas</span></Link></li>
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
        <h2>Bienvenido a la sección de solicitud</h2>
        <Crearcitas />
      </div>
    </div>
  );
};


function Crearcitas() {
 const [formulario, setFormulario] = useState({
     id_cliente: '',
     id_servicio: '',
     direccion: '',
     via_comunicacion: '',
     fecha: '',
     estado: 'pendiente'
   });
 
   const handleChange = (e) => {
     setFormulario({
       ...formulario,
       [e.target.name]: e.target.value
     });
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     const estadosValidos = ['pendiente', 'realizado', 'atrasado', 'cancelado'];
 
     if (!formulario.id_cliente || !formulario.id_servicio || !formulario.direccion || !formulario.via_comunicacion || !formulario.fecha || !formulario.estado) {
       alert('Todos los campos son obligatorios.');
       return;
     }
 
     if (!estadosValidos.includes(formulario.estado)) {
       alert('Por favor selecciona un estado válido.');
       return;
     }
 
     try {
       const respuesta = await fetch('http://localhost:8081/solicitudservicio', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formulario)
       });
 
       if (respuesta.ok) {
         alert('Solicitud registrada correctamente');
         setFormulario({
           id_cliente: '',
           id_servicio: '',
           direccion: '',
           via_comunicacion: '',
           fecha: '',
           estado: 'pendiente'
         });
       } else {
         alert('Error al registrar solicitud');
       }
     } catch (error) {
       console.error('Error en el registro', error);
       alert('Error de red al registrar solicitud');
     }
   };
 
   return (
     <div className="contenedor-cita">
       <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
       <form className="formulario-cita" onSubmit={handleSubmit}>
         <input type="number" name="id_cliente" placeholder="Cliente" className="campo-cita" value={formulario.id_cliente} onChange={handleChange} />
         <input type="number" name="id_servicio" placeholder="Servicio" className="campo-cita" value={formulario.id_servicio} onChange={handleChange} />
         <input type="text" name="direccion" placeholder="Dirección" className="campo-cita" value={formulario.direccion} onChange={handleChange} />
         <input type="text" name="via_comunicacion" placeholder="Vía de comunicación" className="campo-cita" value={formulario.via_comunicacion} onChange={handleChange} />
         <input type="date" name="fecha" className="campo-cita" value={formulario.fecha} onChange={handleChange} />
         <select name="estado" className="campo-cita" value={formulario.estado} onChange={handleChange}>
           <option value="">Estado</option>
           <option value="pendiente">Pendiente</option>
           <option value="realizado">Realizado</option>
           <option value="atrasado">Atrasado</option>
           <option value="cancelado">Cancelado</option>
         </select>
         <button type="submit" className="boton-cita">REGISTRAR</button>
       </form>
     </div>
   );
 }
 


export default Solicitudservicio;
