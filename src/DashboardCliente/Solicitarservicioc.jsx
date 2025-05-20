import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import {
  faCalendar, faClipboard, faChevronLeft, faFileText,
  faHome, faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";

const Solicitudservicioc = () => {
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
          <li><Link to="/dashboardcliente"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/solicitudservicioc"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/notasregistro"><FontAwesomeIcon icon={faClipboard} /> <span>Notas</span></Link></li>
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
        <Link to="/dashboardcliente" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de solicitudes de servicio</h2>
        <FormRegistroSolicitud />
      </div>
    </div>
  );
};

function FormRegistroSolicitud() {
  const [clientes, setClientes] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);
  const [formulario, setFormulario] = useState({
    id_cliente: '',
    descripcion: '',
    direccion: '',
    servicios: []
  });

  useEffect(() => {
    const emailUsuario = localStorage.getItem('email')?.toLowerCase();

    fetch('http://localhost:8081/clientes')
      .then(res => res.json())
      .then(data => {
        const clienteActivo = data.find(
          cliente => cliente.email.toLowerCase() === emailUsuario && cliente.estado === 'activo'
        );
        if (clienteActivo) {
          setClientes([clienteActivo]);
          setFormulario(f => ({ ...f, id_cliente: clienteActivo.id_cliente }));
        } else {
          console.warn('No se encontró cliente activo con ese email');
        }
      })
      .catch(err => console.error('Error al cargar cliente:', err));

    fetch('http://localhost:8081/servicios')
      .then(res => res.json())
      .then(data => setServiciosLista(data))
      .catch(err => console.error('Error cargando servicios:', err));
  }, []);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleServiciosChange = (selectedOptions) => {
    const idsSeleccionados = selectedOptions ? selectedOptions.map(op => op.value) : [];
    setFormulario({ ...formulario, servicios: idsSeleccionados });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id_cliente, descripcion, direccion, servicios } = formulario;

    if (!id_cliente || !descripcion || !direccion || servicios.length === 0) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8081/solicitudservicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      if (res.ok) {
        alert('Solicitud registrada correctamente');
        setFormulario({
          id_cliente: clientes[0]?.id_cliente || '',
          descripcion: '',
          direccion: '',
          servicios: []
        });
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al registrar solicitud');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>

        <input
          type="text"
          className="campo-cita"
          value={clientes.length > 0 ? clientes[0].nombre : ''}
          readOnly
        />

         <div className="campo-cita">
          <label>Servicios:</label>
          <Select
            isMulti
            className="react-select-custom"
            classNamePrefix="react-select"
            options={serviciosLista.map(servicio => ({
              value: servicio.id_servicio,
              label: servicio.nombre_servicio
            }))}
            value={serviciosLista
              .filter(serv => formulario.servicios.includes(serv.id_servicio))
              .map(serv => ({ value: serv.id_servicio, label: serv.nombre_servicio }))}
            onChange={handleServiciosChange}
            placeholder="Buscar y seleccionar servicios"
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

        <input
          type="text"
          name="via_comunicacion"
          placeholder="Vía de comunicación"
          className="campo-cita"
          value={formulario.via_comunicacion}
          onChange={handleChange}
        />

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


        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Solicitudservicioc;


