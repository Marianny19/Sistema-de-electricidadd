import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice, faFileInvoiceDollar,
  faHome, faMoneyCheck, faSignOut, faUser, faUsers, faFileText,
  faTasks, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const Registrotrabajo = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("");
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

  useEffect(() => {
    async function cargarRegistros() {
      try {
        const response = await fetch("http://localhost:8081/registrotrabajo");
        if (!response.ok) throw new Error("Error en la solicitud");
        const data = await response.json();
        setRegistros(data);
      } catch (error) {
        alert("Error al cargar registros de trabajo");
        console.error(error);
      }
    }
    cargarRegistros();
  }, []);

  const desactivarRegistro = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas marcar este registro como inactivo?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:8081/registrotrabajo/${id}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        alert("Registro marcado como inactivo correctamente");
        setRegistros(prev =>
          prev.map(r =>
            r.id_registro_trabajo === id ? { ...r, estado: 'inactivo' } : r
          )
        );
      } else {
        alert("Error al marcar registro como inactivo");
      }
    } catch (error) {
      console.error("Error al desactivar registro:", error);
      alert("Error de red al marcar registro como inactivo");
    }
  };

  const registrosFiltrados = registros.filter(r =>
    r.id_solicitud_servicio.toString().includes(filtro.toLowerCase()) ||
    r.id_empleado.toString().includes(filtro.toLowerCase())
  );

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
        <Link to="/dashboard" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de registro de trabajo</h2>

        <div className="main-content">
          <Link to="/crearregistrotrabajo">
            <button className="Registro">+ Nuevo registro</button>
          </Link>

          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-registro"
                className="Buscar"
                type="search"
                placeholder="Buscar por solicitud o empleado"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-empleados'>
              <caption>Lista de registros</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Solicitud</th>
                  <th>Empleado</th>
                  <th>Servicios</th>
                  <th>Costo extra</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
             <tbody>
  {registrosFiltrados.length === 0 ? (
    <tr>
      <td colSpan="8">No hay registros disponibles.</td>
    </tr>
  ) : (
    registrosFiltrados.map((registro) => (
      <tr key={registro.id_registro_trabajo || registro.id}>
        <td>{registro.id_registro_trabajo || registro.id}</td>
        <td>{registro.id_solicitud_servicio}</td>
        <td>{registro.empleado ? registro.empleado.nombre : registro.id_empleado}</td> 
        <td>
          {registro.servicios && Array.isArray(registro.servicios)
            ? registro.servicios.map(s => s.nombre_servicio).join(", ")
            : "Sin servicios"}
        </td>
        <td>${registro.costo_extra}</td>
        <td>{new Date(registro.fecha).toLocaleDateString()}</td>
        <td>{registro.estado}</td>
        <td data-label="Acciones">
          <Link to={`/actualizarregistrotrabajo/${registro.id_registro_trabajo}`}>
            <button className="Actualizar">Actualizar</button>
          </Link>
          <button
            className="Eliminar"
            onClick={() => desactivarRegistro(registro.id_registro_trabajo)}
            disabled={registro.estado !== 'activo'}
          >
            Eliminar
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrotrabajo;
