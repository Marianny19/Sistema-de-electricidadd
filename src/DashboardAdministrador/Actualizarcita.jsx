import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import {
  faCalendar, faChevronLeft, faFileInvoice,
  faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Actualizarcita = () => {
  const { id } = useParams();
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
          <li><Link to="/Dashboard"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
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
        <Link to="/formulariocita" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de actualizar cita</h2>
        <FormularioActualizarCita />
      </div>
    </div>
  );
};

function FormularioActualizarCita() {
  const { id } = useParams();
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);

  const [formulario, setFormulario] = useState({
    id_cliente: '',
    id_empleado: '',
    id_solicitud: '',
    servicios: [],
    fecha: '',
    hora: '',
    estado: 'activo'
  });

  const [nombreCliente, setNombreCliente] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Carga clientes activos
        const resClientes = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/clientes');
        const clientesData = await resClientes.json();
        setClientes(clientesData.filter(c => c.estado === 'activo'));

        // Carga empleados activos
        const resEmpleados = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/empleados');
        const empleadosData = await resEmpleados.json();
        setEmpleados(empleadosData.filter(e => e.estado === 'activo'));

        // Carga servicios
        const resServicios = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/servicios');
        const serviciosData = await resServicios.json();
        setServiciosLista(serviciosData);

        // Carga cita
        const resCita = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/citas/${id}`);
        const citaData = await resCita.json();

        if (citaData) {
          setFormulario({
            id_cliente: citaData.id_cliente,
            id_empleado: citaData.id_empleado,
            id_solicitud: citaData.id_solicitud,
            servicios: citaData.servicios.map(s => s.id_servicio),
            fecha: citaData.fecha.split('T')[0], // Para input date
            hora: citaData.hora,
            estado: citaData.estado
          });

          // Obtener nombre cliente
          const cliente = clientesData.find(c => c.id_cliente === citaData.id_cliente);
          setNombreCliente(cliente ? cliente.nombre : '');

          // Obtener nombre empleado
          const empleado = empleadosData.find(e => e.id_empleado === citaData.id_empleado);
          setNombreEmpleado(empleado ? empleado.nombre : '');
        } else {
          alert("Cita no encontrada");
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        alert('Error al cargar la información de la cita');
      }
    };

    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleServiciosChange = (selectedOptions) => {
    const ids = selectedOptions.map(op => op.value);
    setFormulario({ ...formulario, servicios: ids });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/citas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (res.ok) {
        alert('Cita actualizada correctamente');
      } else {
        alert('Error al actualizar la cita');
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error de red al actualizar cita');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">MODIFICA LOS CAMPOS NECESARIOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input
          type="text"
          className="campo-cita"
          value={nombreCliente}
          readOnly
          placeholder="Cliente asignado"
        />

        <input
          type="text"
          className="campo-cita"
          value={nombreEmpleado}
          readOnly
          placeholder="Empleado asignado"
        />

        <input
          type="number"
          name="id_solicitud"
          placeholder="Solicitud"
          className="campo-cita"
          value={formulario.id_solicitud}
          onChange={handleChange}
          required
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
              .map(serv => ({ value: serv.id_servicio, label: serv.nombre_servicio }))}
            onChange={handleServiciosChange}
            placeholder="Selecciona uno o más servicios"
          />
        </div>

        <input
          type="date"
          name="fecha"
          className="campo-cita"
          value={formulario.fecha}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="hora"
          className="campo-cita"
          value={formulario.hora}
          onChange={handleChange}
          required
        />


        <button type="submit" className="boton-cita">ACTUALIZAR</button>
      </form>
    </div>
  );
}

export default Actualizarcita;
