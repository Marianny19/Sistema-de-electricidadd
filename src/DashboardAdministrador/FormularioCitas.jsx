import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const FormularioCitas = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [citas, setCitas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const emailUsuario = localStorage.getItem('email');


  useEffect(() => {
    async function cargarCitas() {
      try {
        const response = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/citas');
        const data = await response.json();
        setCitas(data);
      } catch (error) {
        console.error('Error al cargar citas:', error);
      }
    }

    cargarCitas();
  }, []);

  const eliminarCita = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas actualizar el estado de esta cita?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/citas/${id}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        setCitas(prev => prev.filter(c => c.id_cita !== id));
        alert("Estado de la cita actualizado correctamente");
        window.location.reload();
      } else {
        alert("Error al actualizar el estado de la cita");
      }
    } catch (error) {
      console.error('Error al actualizar el estado de la cita:', error);
      alert("Error de red al actualizar el estado de la cita");
    }
  };

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
  const citasFiltradas = citas.filter(cita =>
    cita.id_cita.toString().includes(busqueda.toLowerCase()) ||
    cita.nombre_cliente.toLowerCase().includes(busqueda.toLowerCase())
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
        <h2>Bienvenido a la sección de citas</h2>

        <div className="main-content">
          <Link to="/crearcita">
            <button className="Registro">+ Nueva cita</button>
          </Link>
          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-empleado"
                className="Buscar"
                type="search"
                placeholder="Buscar por id o cliente"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-empleados'>
              <caption>Lista de citas</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Empleado</th>
                  <th>Solicitud</th>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-empleados">
                {citasFiltradas.map((cita) => (
                  <tr key={cita.id_cita}>
                    <td data-label="Id cita">{cita.id_cita}</td>
                    <td data-label="Cliente">{cita.nombre_cliente}</td>
                    <td data-label="Empleado">{cita.nombre_empleado}</td>
                    <td data-label="Solicitud">{cita.id_solicitud}</td>
                    <td data-label="Servicio">
                      {cita.servicios ? cita.servicios : 'No hay servicios'}
                    </td>
                    <td data-label="Fecha">{cita.fecha}</td>
                    <td data-label="Hora">{cita.hora}</td>
                    <td data-label="Estado">{cita.estado}</td>
                    <td data-label="Acciones">
                      <Link to={`/actualizarcitas/${cita.id_cita}`}>
                        <button className="Actualizar">Actualizar</button>
                      </Link>
                      <button
                        className="Eliminar"
                        onClick={() => eliminarCita(cita.id_cita)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioCitas;
