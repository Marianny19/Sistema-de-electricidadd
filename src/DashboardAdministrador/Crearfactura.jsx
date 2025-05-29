import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers,
  faFileText, faTasks, faTrash
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

  const [detalles, setDetalles] = useState([]);
  const [cargandoTotal, setCargandoTotal] = useState(false);

  const obtenerMontos = async (solicitud_id) => {
    try {
      const response = await fetch(`http://localhost:8081/solicitudservicio/${solicitud_id}/monto-total`);
      if (!response.ok) throw new Error('Solicitud no encontrada');
      const data = await response.json();
      return {
        monto_total: Number(data.monto_total) || 0,
        monto_pagado: Number(data.monto_pagado) || 0,
        monto_pendiente: Number(data.monto_pendiente) || 0
      };
    } catch (error) {
      throw error;
    }
  };

  const handleSolicitudIdChange = async (e) => {
    const solicitud_id = e.target.value.trim();
    setFactura((prev) => ({ ...prev, solicitud_id }));

    if (!solicitud_id || isNaN(solicitud_id) || Number(solicitud_id) <= 0) {
      setFactura((prev) => ({
        ...prev,
        total: '',
        monto_pagado: '',
        monto_pendiente: '',
      }));
      return;
    }

    setCargandoTotal(true);
    try {
      const montos = await obtenerMontos(solicitud_id);

      setFactura((prev) => ({
        ...prev,
        total: montos.monto_total.toFixed(2),
        monto_pagado: montos.monto_pagado.toFixed(2),
        monto_pendiente: montos.monto_pendiente.toFixed(2)
      }));
    } catch (error) {
      alert('No se pudo cargar el monto total para la solicitud: ' + error.message);
      setFactura((prev) => ({
        ...prev,
        total: '',
        monto_pagado: '',
        monto_pendiente: ''
      }));
    } finally {
      setCargandoTotal(false);
    }
  };

  const handleFacturaChange = (e) => {
    const { name, value } = e.target;
    if (name === 'solicitud_id') {
      handleSolicitudIdChange(e);
    } else if (!['total', 'monto_pendiente', 'monto_pagado'].includes(name)) {
      setFactura((prev) => ({ ...prev, [name]: value }));
    }
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

  if (detalles.length === 0) {
    alert('Debe agregar al menos un detalle');
    return;
  }

  try {
    const res = await fetch('http://localhost:8081/facturas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        solicitud_id: factura.solicitud_id,
        fecha_emision: factura.fecha_emision,
        estado: factura.estado,

        monto_pendiente: Number(factura.monto_pendiente) || 0,
        monto_pagado: Number(factura.monto_pagado) || 0,
        total: Number(factura.total) || 0,

        detalles: detalles.map(d => ({
          descripcion: d.descripcion,
          monto: Number(d.monto)
        }))
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error al registrar factura');
    }

    alert('Factura registrada correctamente');
    navigate('/factura');
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al registrar la factura: ' + error.message);
  }
};

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">REGISTRO DE FACTURA</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input
          type="number"
          name="solicitud_id"
          placeholder="ID de solicitud"
          className="campo-cita"
          value={factura.solicitud_id}
          onChange={handleFacturaChange}
          required
          min="1"
        />
        <input
          type="date"
          name="fecha_emision"
          className="campo-cita"
          value={factura.fecha_emision}
          onChange={handleFacturaChange}
          required
        />
        <input
          type="number"
          name="monto_pendiente"
          placeholder="Monto pendiente"
          className="campo-cita"
          value={factura.monto_pendiente}
          readOnly
          style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
        />
        <input
          type="number"
          name="monto_pagado"
          placeholder="Monto pagado"
          className="campo-cita"
          value={factura.monto_pagado}
          readOnly
          style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
        />
        <input
          type="text"
          name="total"
          placeholder={cargandoTotal ? 'Cargando total...' : 'Total'}
          className="campo-cita"
          value={factura.total}
          readOnly
          style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
          required
        />

        <button type="button" className="boton-cita" onClick={agregarDetalle} style={{ margin: '15px 0' }}>
          Agregar detalle
        </button>

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
              min="0"
              step="0.01"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="boton-eliminar"
              onClick={() => eliminarDetalle(index)}
              aria-label={`Eliminar detalle ${index + 1}`}
              style={{ flex: '0 0 auto' }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}

        <button type="submit" className="boton-cita">
          Guardar factura
        </button>
      </form>
    </div>
  );
}

export default Crearfactura;
