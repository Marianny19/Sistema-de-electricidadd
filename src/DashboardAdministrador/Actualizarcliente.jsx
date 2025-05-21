import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../index.css";

const ActualizarCliente = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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
        <Link to="/clienteempleado" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Actualizar cliente</h2>
        <FormularioActualizarCliente id={id} />
      </div>
    </div>
  );
};

function FormularioActualizarCliente({ id }) {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: 'activo'
  });

  // Cargar datos del cliente al montar el componente
  useEffect(() => {
    fetch(`http://localhost:8081/clientes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener cliente');
        return res.json();
      })
      .then(data => {
        setFormulario({
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          cedula: data.cedula || '',
          telefono: data.telefono || '',
          email: data.email || '',
          direccion: data.direccion || '',
          estado: data.estado || 'activo'
        });
      })
      .catch(err => {
        console.error(err);
        alert('Error al cargar datos del cliente');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(`http://localhost:8081/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
        alert('Cliente actualizado correctamente');
        navigate('/clienteempleado');
      } else {
        alert('Error al actualizar cliente');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error de red al actualizar cliente');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">EDITA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="campo-cita"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className="campo-cita"
          value={formulario.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          className="campo-cita"
          value={formulario.cedula}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          className="campo-cita"
          value={formulario.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="campo-cita"
          value={formulario.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          className="campo-cita"
          value={formulario.direccion}
          onChange={handleChange}
          required
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
        <button type="submit" className="boton-cita">ACTUALIZAR</button>
      </form>
    </div>
  );
}

export default ActualizarCliente;
