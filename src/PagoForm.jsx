import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PagoForm = () => {
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
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
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
        <h2>Bienvenido a la sección de pagos</h2>
        <Crearcitas />
      </div>
    </div>
  );
};

function Crearcitas() {
  const [formulario, setFormulario] = useState({
    id_cotizacion: '',
    monto: '',
    fecha_pago: '',
    metodo_pago: '',
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que no haya campos vacíos
    if (!formulario.id_cotizacion || !formulario.monto || !formulario.fecha_pago || !formulario.metodo_pago) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      console.log('Datos enviados:', formulario);  // Verificar qué valores estás enviando

      const respuesta = await fetch('http://localhost:8081/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario),
      });

      if (respuesta.ok) {
        alert('Pago registrado correctamente');
        setFormulario({
          id_cotizacion: '',
          monto: '',
          fecha_pago: '',
          metodo_pago: '',
        });
      } else {
        const errorData = await respuesta.json();
        console.error('Error al registrar pago:', errorData);
        alert('Error al registrar el pago');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al registrar pago');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">REGISTRAR PAGO</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input
          type="number"
          name="id_cotizacion"
          placeholder="Cotizacion"
          className="campo-cita"
          value={formulario.id_cotizacion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="monto"
          placeholder="Monto"
          className="campo-cita"
          value={formulario.monto}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha_pago"
          className="campo-cita"
          value={formulario.fecha_pago}
          onChange={handleChange}
          required
        />
        <select
          name="metodo_pago"
          className="campo-cita"
          value={formulario.metodo_pago}
          onChange={handleChange}
          required
        >
          <option value="">Metodo de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>
        <button type="submit" className="boton-cita">Generar Factura</button>
      </form>
    </div>
  );
}

export default PagoForm;
