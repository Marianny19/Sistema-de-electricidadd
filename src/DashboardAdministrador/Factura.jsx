import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUsers, faUser, faCalendar,
  faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
  faClipboard, faCartArrowDown, faSignOut, faChevronLeft, faSearch, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import "../index.css";

const Factura = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [facturas, setFacturas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
 const desactivarfactura = async (id) => {
  const confirmar = window.confirm("¿Estás seguro de que deseas desactivar este pago?");
  if (!confirmar) return;

  try {
    const respuesta = await fetch(`http://localhost:8081/facturas/${id}`, {
      method: 'DELETE'
    });

    if (respuesta.ok) {
      setFacturas(prevFacturas =>
        prevFacturas.map(f =>
          f.id === id ? { ...f, estado: 'inactivo' } : f
        )
      );
      alert("Factura marcada como inactiva");
    } else {
      alert("Error al desactivar factura");
    }
  } catch (error) {
    console.error('Error al desactivar factura:', error);
    alert("Error de red al desactivar factura");
  }
};


  const emailUsuario = localStorage.getItem('email');

  useEffect(() => {
    async function cargarFacturas() {
      try {
        const response = await fetch('http://localhost:8081/facturas');
        if (!response.ok) throw new Error('Error al cargar facturas');
        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error('Error al cargar facturas:', error);
      }
    }

    cargarFacturas();
  }, []);

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

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const eliminarFactura = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta factura?")) return;

    try {
      const response = await fetch(`http://localhost:8081/facturas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFacturas(facturas.filter(factura => factura.id !== id));
        alert('Factura eliminada correctamente');
      } else {
        alert('Error al eliminar la factura');
      }
    } catch (error) {
      console.error('Error eliminando factura:', error);
      alert('Error al eliminar la factura');
    }
  };

  const facturasFiltradas = facturas.filter(f =>
    f.id.toString().includes(busqueda.toLowerCase()) ||
    f.solicitud_id?.toString().includes(busqueda.toLowerCase()) ||
    (f.estado?.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return 'N/A';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString();
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
        <Link to="/dashboard" className="boton-retroceso" aria-label="Volver">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h2>Bienvenido a la sección de Factura</h2>

        <div className="main-content">
          <Link to="/crearfactura"><button className="Registro">+ Nueva factura</button></Link>

          <div className="input-container-wrapper">
            <div className="input-container">
              <input
                id="buscar-factura"
                className="Buscar"
                type="search"
                placeholder="Buscar por ID, solicitud, pago o estado"
                value={busqueda}
                onChange={handleBusqueda}
                autoComplete="off"
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <table className='tabla-factura'>
              <caption>Lista de facturas</caption>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Solicitud</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facturasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>
                      No se encontraron facturas.
                    </td>
                  </tr>
                ) : (
                  facturasFiltradas.map((factura) => {
                    const descripcionDetalles = factura.detalles && factura.detalles.length > 0
                      ? factura.detalles.map(d => d.descripcion).join(', ')
                      : 'N/A';

                    return (
                      <tr key={factura.id}>
                        <td>{factura.id}</td>
                        <td>{factura.solicitud_id}</td>
                        <td>{formatearFecha(factura.fecha_emision)}</td>
                        <td>{factura.total}</td>
                        <td>{descripcionDetalles}</td>
                        <td>{factura.estado}</td>
                        <td>
                          <button
                            className="Eliminar"
                            disabled={factura.estado === 'inactivo'}
                            onClick={() => desactivarfactura(factura.id)}>
                            Eliminar
                          </button>

                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factura;
