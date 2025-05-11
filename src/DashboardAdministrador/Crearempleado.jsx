import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";


const CrearEmpleadoPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
           <Link to="/empleado" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de crear usuario</h2>
        <FormularioEmpleado />
      </div>
    </div>
  );
};

function FormularioEmpleado() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    cargo: '',
    salario: '',
    fecha_ingreso: '',
    fecha_nacimiento: '',
    direccion: '',
    estado: ''
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
      const respuesta = await fetch('http://localhost:8081/empleados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
        alert('Empleado registrado correctamente');
        setFormulario({
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
          cargo: '',
          salario: '',
          fecha_ingreso: '',
          fecha_nacimiento: '',
          direccion: '',
          estado: ''
        });
      } else {
        alert('Error al registrar el empleado');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error de red al registrar empleado');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">CREAR NUEVO EMPLEADO</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" className="campo-cita" value={formulario.nombre} onChange={handleChange} />
        <input type="text" name="apellido" placeholder="Apellido" className="campo-cita" value={formulario.apellido} onChange={handleChange} />
        <input type="text" name="telefono" placeholder="Telefono" className="campo-cita" value={formulario.telefono} onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" className="campo-cita" value={formulario.email} onChange={handleChange} />
        <input type="text" name="cargo" placeholder="Cargo" className="campo-cita" value={formulario.cargo} onChange={handleChange} />
        <input type="number" name="salario" placeholder="Salario" className="campo-cita" value={formulario.salario} onChange={handleChange} />
        <input type="date" name="fecha_ingreso" placeholder="Fecha ingreso" className="campo-cita" value={formulario.fecha_ingreso} onChange={handleChange} />
        <input type="date" name="fecha_nacimiento" placeholder="Fecha nacimiento" className="campo-cita" value={formulario.fecha_nacimiento} onChange={handleChange} />
        <input type="text" name="direccion" placeholder="Direccion" className="campo-cita" value={formulario.direccion} onChange={handleChange} />
        <select name="estado" className="campo-cita" value={formulario.estado} onChange={handleChange}>
          <option value="">Estado</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <button type="submit" className="boton-cita">Registrar empleado</button>
      </form>
    </div>
  );
}

export default CrearEmpleadoPage;
