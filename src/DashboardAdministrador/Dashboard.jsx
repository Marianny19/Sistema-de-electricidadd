import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faClipboard, faFileInvoice,
  faFileInvoiceDollar, faHome, faMoneyCheck, faSignOut,
  faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import "../index.css";
import { Chart } from "chart.js/auto";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [citas, setCitas] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [atrasados, setAtrasados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const emailUsuario = localStorage.getItem('email');

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

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const fechaLocal = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
    return fechaLocal.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatearHora = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const fechaLocal = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
    return fechaLocal.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const fetchDatosDashboard = async () => {
      try {
        const [resCitas, resPendientes, resAtrasados] = await Promise.all([
          axios.get('http://localhost:8081/proximas-citas'),
          axios.get('http://localhost:8081/servicios-pendientes'),
          axios.get('http://localhost:8081/servicios-atrasados'),
        ]);

        setCitas(Array.isArray(resCitas.data) ? resCitas.data : []);
        setPendientes(Array.isArray(resPendientes.data) ? resPendientes.data : []);
        setAtrasados(Array.isArray(resAtrasados.data) ? resAtrasados.data : []);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchDatosDashboard();
  }, []);

  useEffect(() => {
    const graficoExistente = Chart.getChart("graficoTareas");
    if (graficoExistente) {
      graficoExistente.destroy();
    }

    const ctx = document.getElementById("graficoTareas")?.getContext("2d");
    if (!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Completados", "Pendientes", "Atrasados"],
        datasets: [
          {
            label: "Cantidad",
            data: [
              15,
              pendientes.length,
              atrasados.length
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }, [pendientes, atrasados]);

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido</h2>
        <p className="subtexto-email">{emailUsuario}</p>

        <ul>
          <li><Link to="/"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
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
        <h2>Bienvenido al sistema de gestión de electricidad</h2>

        <div className="widgets">
          <div className="widget tarjeta">
            <h3><FontAwesomeIcon icon={faCalendar} /> Próximas citas</h3>
            <ul className="lista-personalizada">
              {cargando ? (
                <li>Cargando...</li>
              ) : citas.length === 0 ? (
                <li>No hay próximas citas.</li>
              ) : (
                citas.map((cita) => (
                  <li key={cita.id_cita}>
                    <strong>{formatearFecha(cita.fecha)}</strong> a las <strong>{formatearHora(cita.fecha)}</strong> – Estado: <em>{cita.estado}</em>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="widget tarjeta">
            <h3><FontAwesomeIcon icon={faClipboard} /> Servicios pendientes</h3>
            <ul className="lista-personalizada">
              {cargando ? (
                <li>Cargando...</li>
              ) : pendientes.length === 0 ? (
                <li>No hay servicios pendientes.</li>
              ) : (
                pendientes.map((servicio) => (
                  <li key={servicio.id_solicitud}>
                    <strong>{servicio.direccion}</strong> – {formatearFecha(servicio.fecha)} – Estado: <em>{servicio.estado}</em>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="widget tarjeta">
            <h3><FontAwesomeIcon icon={faClipboard} /> Servicios atrasados</h3>
            <ul className="lista-personalizada">
              {cargando ? (
                <li>Cargando...</li>
              ) : atrasados.length === 0 ? (
                <li>No hay servicios atrasados.</li>
              ) : (
                atrasados.map((servicio) => (
                  <li key={servicio.id_solicitud}>
                    <strong>{servicio.direccion}</strong> – {formatearFecha(servicio.fecha)} – Estado: <em>{servicio.estado}</em>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="widget tarjeta grafico-tarjeta">
            <h3>Estadísticas de servicios</h3>
            <canvas id="graficoTareas" className="grafico-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
