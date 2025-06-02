import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";


const CrearEmpleadoPage = () => {
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
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
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
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    cargo: '',
    salario: '',
    fecha_ingreso: '',
    fecha_nacimiento: '',
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
      const respuesta = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/empleados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
        alert('Empleado registrado correctamente');
        navigate('/empleado');

        setFormulario({
          nombre: '',
          apellido: '',
          cedula: '',
          telefono: '',
          email: '',
          cargo: '',
          salario: '',
          fecha_ingreso: '',
          fecha_nacimiento: '',
          direccion: '',
          estado: 'activo'
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
        <input type="text" name="cedula" placeholder="Cédula" className="campo-cita" value={formulario.cedula} onChange={handleChange} />
        <input type="text" name="telefono" placeholder="Teléfono" className="campo-cita" value={formulario.telefono} onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" className="campo-cita" value={formulario.email} onChange={handleChange} />
        <input type="text" name="cargo" placeholder="Cargo" className="campo-cita" value={formulario.cargo} onChange={handleChange} />
        <input type="number" name="salario" placeholder="Salario" className="campo-cita" value={formulario.salario} onChange={handleChange} />
        <input type="date" name="fecha_ingreso" placeholder="Fecha ingreso" className="campo-cita" value={formulario.fecha_ingreso} onChange={handleChange} />
        <input type="date" name="fecha_nacimiento" placeholder="Fecha nacimiento" className="campo-cita" value={formulario.fecha_nacimiento} onChange={handleChange} />
        <input type="text" name="direccion" placeholder="Dirección" className="campo-cita" value={formulario.direccion} onChange={handleChange} />
        <button type="submit" className="boton-cita">Registrar empleado</button>
      </form>
    </div>
  );
}

export default CrearEmpleadoPage;
