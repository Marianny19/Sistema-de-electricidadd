import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import {
  faCalendar, faChevronLeft, faFileInvoice,
  faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import "../index.css";

const Actualizarcita = () => {
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
    servicios: [],
    fecha: '',
    hora: '',
    estado: 'activo'
  });

  useEffect(() => {
    // Cargar clientes, empleados y servicios
    fetch('http://localhost:8081/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Error al cargar clientes:', err));

    fetch('http://localhost:8081/empleados')
      .then(res => res.json())
      .then(data => setEmpleados(data))
      .catch(err => console.error('Error al cargar empleados:', err));

    fetch('http://localhost:8081/servicios')
      .then(res => res.json())
      .then(data => setServiciosLista(data))
      .catch(err => console.error('Error cargando servicios:', err));

    // Cargar los datos de la cita actual
    fetch(`http://localhost:8081/citas/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFormulario({
            id_cliente: data.id_cliente,
            id_empleado: data.id_empleado,
            servicios: data.servicios,
            fecha: data.fecha,
            hora: data.hora,
            estado: data.estado
          });
        } else {
          alert("Cita no encontrada");
        }
      })
      .catch(error => {
        console.error('Error al cargar cita:', error);
        alert('No se pudo cargar la información de la cita');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleServiciosChange = (selectedOptions) => {
    const idsSeleccionados = selectedOptions.map(op => op.value);
    setFormulario({ ...formulario, servicios: idsSeleccionados });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(`http://localhost:8081/citas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
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
        <select name="id_cliente" className="campo-cita" value={formulario.id_cliente} onChange={handleChange} required>
          <option value="">Selecciona un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.nombre}</option>
          ))}
        </select>

        <select name="id_empleado" className="campo-cita" value={formulario.id_empleado} onChange={handleChange} required>
          <option value="">Selecciona un empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id_empleado} value={empleado.id_empleado}>{empleado.nombre}</option>
          ))}
        </select>

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

        <input type="date" name="fecha" className="campo-cita" value={formulario.fecha} onChange={handleChange} required />
        <input type="time" name="hora" className="campo-cita" value={formulario.hora} onChange={handleChange} required />

        <select name="estado" className="campo-cita" value={formulario.estado} onChange={handleChange} required>
          <option value="">Estado</option>
          <option value="agendada">Agendada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <button type="submit" className="boton-cita">ACTUALIZAR</button>
      </form>
    </div>
  );
}

export default Actualizarcita;
