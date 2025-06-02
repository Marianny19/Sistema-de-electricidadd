import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faHome,
  faUsers,
  faUser,
  faFileText,
  faCalendar,
  faTasks,
  faFileInvoice,
  faFileInvoiceDollar,
  faMoneyCheck,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';

function Editarsolicitud() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const emailUsuario = localStorage.getItem('email');

  // Estado inicial con hora incluida
  const [formulario, setFormulario] = useState({
    id_cliente: '',
    nombreCliente: '',
    servicios: [],
    direccion: '',
    via_comunicacion: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '',
    estado: ''
  });

  const [serviciosLista, setServiciosLista] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Traemos la solicitud
        const resSolicitud = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/solicitudservicio/${id}`);
        const data = await resSolicitud.json();

        // Traemos el cliente para obtener su nombre
        const resCliente = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/clientes/${data.id_cliente}`);
        const clienteData = await resCliente.json();

        // Traemos lista de servicios
        const resServicios = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/servicios');
        const serviciosData = await resServicios.json();

        setFormulario({
          id_cliente: data.id_cliente,
          nombreCliente: clienteData.nombre,
          servicios: data.servicios.map(s => s.id_servicio),
          direccion: data.direccion,
          via_comunicacion: data.via_comunicacion,
          fecha: data.fecha ? data.fecha.split('T')[0] : '',
          hora: data.hora || '',
          estado: data.estado || ''
        });

        setServiciosLista(serviciosData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };

    obtenerDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleServiciosChange = (selectedOptions) => {
    const idsSeleccionados = selectedOptions ? selectedOptions.map(op => op.value) : [];
    setFormulario({ ...formulario, servicios: idsSeleccionados });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const estadosValidos = ['pendiente', 'cancelada', 'realizada'];
    const { id_cliente, servicios, direccion, via_comunicacion, fecha, estado, hora } = formulario;
    const estadoFinal = estado && estadosValidos.includes(estado) ? estado : 'pendiente';

    if (!id_cliente || servicios.length === 0 || !direccion || !fecha || !estado) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      const respuesta = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/solicitudservicio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_cliente,
          servicios,
          direccion,
          via_comunicacion,
          fecha,
          hora,
          estado: estadoFinal
        })
      });

      if (respuesta.ok) {
        alert('Solicitud actualizada correctamente');
        navigate('/solicitudservicio');
      } else {
        const error = await respuesta.json();
        console.error('Error del servidor:', error);
        alert('Error al actualizar solicitud');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error de red al actualizar solicitud');
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

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
          <li><Link to="/Dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="/vercotizaciones"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
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
        <Link to="/solicitudservicio" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de actualizar solicitud</h2>
        <div className="contenedor-cita">
          <h1 className="titulo-cita">EDITAR SOLICITUD</h1>
          <form className="formulario-cita" onSubmit={handleSubmit}>
            <input
              type="text"
              className="campo-cita"
              value={formulario.nombreCliente}
              readOnly
            />

            <div className="campo-cita">
              <label>Servicios:</label>
              <Select
                isMulti
                options={serviciosLista.map(servicio => ({
                  value: servicio.id_servicio,
                  label: servicio.nombre_servicio
                }))}
                value={serviciosLista
                  .filter(serv => formulario.servicios.includes(serv.id_servicio))
                  .map(serv => ({
                    value: serv.id_servicio,
                    label: serv.nombre_servicio
                  }))}
                onChange={handleServiciosChange}
                placeholder="Selecciona uno o más servicios"
              />
            </div>

            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              className="campo-cita"
              value={formulario.direccion}
              onChange={handleChange}
            />

            <select
              name="via_comunicacion"
              className="campo-cita"
              value={formulario.via_comunicacion}
              onChange={handleChange}
            >
              <option value="">Seleccione la vía de comunicación</option>
              <option value="Teléfonica">Teléfonica</option>
              <option value="Email">Email</option>
              <option value="APP">App</option>
            </select>

            <input
              type="date"
              name="fecha"
              className="campo-cita"
              value={formulario.fecha}
              onChange={handleChange}
            />

            <input
              type="time"
              name="hora"
              className="campo-cita"
              value={formulario.hora}
              onChange={handleChange}
            />

            <select
              name="estado"
              className="campo-cita"
              value={formulario.estado}
              onChange={handleChange}
            >
              <option value="">Estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="cancelada">Cancelada</option>
              <option value="realizada">Realizada</option>
            </select>

            <button type="submit" className="boton-cita">ACTUALIZAR</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editarsolicitud;
