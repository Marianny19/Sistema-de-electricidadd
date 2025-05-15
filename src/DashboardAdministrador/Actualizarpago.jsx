import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice,
  faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faTasks, faFileText
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import "../index.css";

const Actualizarpago = () => {
  const { id } = useParams(); // Aquí obtenemos el id de la URL
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => console.log("Cerrar sesión");

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/Dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
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
  <Link to="/pago" className="boton-retroceso" aria-label="Volver">
    <FontAwesomeIcon icon={faChevronLeft} />
  </Link>
  <h2>Bienvenido a la sección de actualizar pago</h2>
  <ActualizarPago /> 
</div>
</div>
  );
};

const ActualizarPago = () => {
  const { id } = useParams();  
  const [formulario, setFormulario] = useState({
    id_solicitud: '',
    fecha_pago: '',
    monto: '',
    hora_pago: '',
    metodo_pago: '',
    estado: 'activo',
  });

  useEffect(() => {
    fetch(`http://localhost:8081/pagos/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFormulario(data); 
        } else {
          alert('Pago no encontrado');
        }
      })
      .catch(error => {
        console.error('Error al cargar pago:', error);
        alert('No se pudo cargar la información del pago');
      });
  }, [id]);


  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(`http://localhost:8081/pagos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario),
      });

      if (respuesta.ok) {
        alert('Pago actualizado correctamente');
      } else {
        alert('Error al actualizar el pago');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error de red al actualizar pago');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">ACTUALIZAR PAGO</h1>
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
          <option value="">Método de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>
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

        <button type="submit" className="boton-cita">Actualizar Pago</button>
      </form>
    </div>
  );
};


export default Actualizarpago;  

