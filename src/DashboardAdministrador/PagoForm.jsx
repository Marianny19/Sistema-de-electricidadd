import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";


const PagoForm = () => {
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
        <Link to="/pago" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de pagos</h2>
        <Crearcitas />
      </div>
    </div>
  );
};

function Crearcitas() {
  const [formulario, setFormulario] = useState({
    id_solicitud: '',
    factura_id: '',
    fecha_pago: new Date().toISOString().split('T')[0],
    monto: '',
    hora_pago: new Date().toTimeString().split(' ')[0],
    metodo_pago: 'efectivo',
    estado: 'activo',
    descripcion: '',
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
      const respuesta = await fetch('http://localhost:8081/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
        alert('Pago registrado correctamente');
        setFormulario({
          id_solicitud: '',
          factura_id: '',
          fecha_pago: new Date().toISOString().split('T')[0],
          monto: '',
          hora_pago: new Date().toTimeString().split(' ')[0],
          metodo_pago: 'efectivo',
          estado: 'activo',
          descripcion: '',
        });
      } else {
        alert('Error al registrar el pago');
      }
    } catch (error) {
      console.error('Error en el pago: ', error);
      alert('Error de red al registrar pago');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">REGISTRAR PAGO</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input
          type="number"
          name="id_solicitud"
          placeholder="Solicitud"
          className="campo-cita"
          value={formulario.id_solicitud}
          onChange={handleChange}
        />

         <input
          type="number"
          name="factura_id"
          placeholder="Factura"
          className="campo-cita"
          value={formulario.factura_id}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha_pago"
          placeholder="Fecha"
          className="campo-cita"
          value={formulario.fecha_pago}
          onChange={handleChange}
        />
        <input
          type="time"
          name="hora_pago"
          placeholder="Hora"
          className="campo-cita"
          value={formulario.hora_pago}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="monto"
          placeholder="Monto"
          className="campo-cita"
          value={formulario.monto}
          onChange={handleChange}
        />
        <select
          name="metodo_pago"
          className="campo-cita"
          value={formulario.metodo_pago}
          onChange={handleChange}
        >
          <option value="efectivo">Efectivo</option>
        </select>


        <input
          type="text"
          name="descripcion"
          placeholder="Descripcion"
          className="campo-cita"
          value={formulario.descripcion}
          onChange={handleChange}
        />

        <button type="submit" className="boton-cita">Registrar Pago</button>
      </form>
    </div>
  );
}


export default PagoForm;
