import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";


const CrearRegistroTrabajo = () => {
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
         <Link to="/registrotrabajoempleado" className="boton-retroceso" aria-label="Volver">
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
       id_solicitud_servicio: '',
       id_empleado: '',
       id_servicio: '',
       costo_extra: '',
       fecha: '',
       estado: ''
     });
   
     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormulario({ ...formulario, [name]: value });
     };
   
     const handleSubmit = async (e) => {
       e.preventDefault();
   
       // Validación simple
       const camposRequeridos = Object.values(formulario).every(field => field !== '');
       if (!camposRequeridos) {
         alert("Todos los campos son obligatorios.");
         return;
       }
   
       try {
         const respuesta = await fetch('http://localhost:8081/registrotrabajo', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(formulario)
         });
   
         if (respuesta.ok) {
           alert('Registro de trabajo registrado correctamente');
           setFormulario({
             id_solicitud_servicio: '',
             id_empleado: '',
             id_servicio: '',
             costo_extra: '',
             fecha: '',
             estado: ''
           });
         } else {
           alert('Error al registrar el trabajo');
         }
       } catch (error) {
         console.error('Error en el registro', error);
         alert('Error de red al registrar el trabajo');
       }
     };
   
     return (
       <div className="contenedor-cita">
         <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
         <form className="formulario-cita" onSubmit={handleSubmit}>
           <input
             type="number"
             name="id_solicitud_servicio"
             placeholder="Solicitud"
             className="campo-cita"
             value={formulario.id_solicitud_servicio}
             onChange={handleChange}
           />
           <input
             type="number"
             name="id_empleado"
             placeholder="Empleado"
             className="campo-cita"
             value={formulario.id_empleado}
             onChange={handleChange}
           />
           <input
             type="number"
             name="id_servicio"
             placeholder="Servicio"
             className="campo-cita"
             value={formulario.id_servicio}
             onChange={handleChange}
           />
           <input
             type="number"
             name="costo_extra"
             placeholder="Costo Extra"
             className="campo-cita"
             value={formulario.costo_extra}
             onChange={handleChange}
           />
           <input
             type="date"
             name="fecha"
             className="campo-cita"
             value={formulario.fecha}
             onChange={handleChange}
           />
           <select
             name="estado"
             className="campo-cita"
             value={formulario.estado}
             onChange={handleChange}
           >
             <option value="">Estado</option>
             <option value="activo">Activo</option>
             <option value="inactivo">Inactivo</option>
           </select>
           <button type="submit" className="boton-cita">REGISTRAR</button>
         </form>
       </div>
     );
   }

export default CrearRegistroTrabajo;
