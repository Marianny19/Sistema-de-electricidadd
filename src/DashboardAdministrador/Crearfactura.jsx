import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks, faTrash
} from '@fortawesome/free-solid-svg-icons';
import "../index.css";

const Crearfactura = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const emailUsuario = localStorage.getItem('email');

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/iniciarsesion', { replace: true });
    window.history.pushState(null, '', '/iniciarsesion');
    window.onpopstate = () => window.history.go(1);
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
            <button onClick={cerrarSesion} className="cerrar-btn">
              <FontAwesomeIcon icon={faSignOut} /> <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <Link to="/factura" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Registrar nueva factura</h2>
        <FormularioFactura />
      </div>
    </div>
  );
};

function FormularioFactura() {
  const navigate = useNavigate();
  const [factura, setFactura] = useState({
    solicitud_id: '',
    fecha_emision: '',
    monto_pendiente: '',
    monto_pagado: '',
    total: '',
    estado: 'activo'
  });

  const [detalles, setDetalles] = useState([]); // Empieza vacío

  const handleFacturaChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value });
  };

  const handleDetalleChange = (index, e) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index][e.target.name] = e.target.value;
    setDetalles(nuevosDetalles);
  };

  const agregarDetalle = () => {
    setDetalles([...detalles, { descripcion: '', monto: '' }]);
  };

  const eliminarDetalle = (index) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles.splice(index, 1);
    setDetalles(nuevosDetalles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resFactura = await fetch('http://localhost:8081/factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(factura)
      });

      if (!resFactura.ok) throw new Error('Error al registrar factura');

      const nuevaFactura = await resFactura.json();
      const facturaId = nuevaFactura.id;

      for (const detalle of detalles) {
        await fetch('http://localhost:8081/detallefactura', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            factura_id: facturaId,
            descripcion: detalle.descripcion,
            monto: detalle.monto
          })
        });
      }

      alert('Factura registrada correctamente');
      navigate('/factura');

    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al registrar la factura');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">REGISTRO DE FACTURA</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input type="number" name="solicitud_id" placeholder="ID de solicitud" className="campo-cita" value={factura.solicitud_id} onChange={handleFacturaChange} required />
        <input type="date" name="fecha_emision" className="campo-cita" value={factura.fecha_emision} onChange={handleFacturaChange} required />
        <input type="number" name="monto_pendiente" placeholder="Monto pendiente" className="campo-cita" value={factura.monto_pendiente} onChange={handleFacturaChange} required />
        <input type="number" name="monto_pagado" placeholder="Monto pagado" className="campo-cita" value={factura.monto_pagado} onChange={handleFacturaChange} required />
        <input type="number" name="total" placeholder="Total" className="campo-cita" value={factura.total} onChange={handleFacturaChange} required />

        {/* Botón para agregar detalle */}
        <button type="button" className="boton-cita" onClick={agregarDetalle} style={{ margin: '15px 0' }}>
          Agregar detalle
        </button>

        {/* Mostrar los campos solo si hay detalles */}
        {detalles.length > 0 && detalles.map((detalle, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              className="campo-cita"
              value={detalle.descripcion}
              onChange={(e) => handleDetalleChange(index, e)}
              required
              style={{ flex: 3 }}
            />
            <input
              type="number"
              name="monto"
              placeholder="Monto"
              className="campo-cita"
              value={detalle.monto}
              onChange={(e) => handleDetalleChange(index, e)}
              required
              style={{ flex: 1 }}
            />
            {index > 0 && (
              <button
                type="button"
                className="boton-eliminar-detalle"
                onClick={() => eliminarDetalle(index)}
                title="Eliminar detalle"
                style={{
                  backgroundColor: '#e74c3c',
                  border: 'none',
                  color: 'white',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        ))}

        <button type="submit" className="boton-cita">REGISTRAR FACTURA</button>
      </form>
    </div>
  );
}

export default Crearfactura;
