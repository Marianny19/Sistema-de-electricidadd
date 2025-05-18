import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faClipboard, faFileInvoice,
  faFileInvoiceDollar, faHome, faMoneyCheck, faSignOut,
  faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";
import { Chart } from "chart.js/auto";


const Dashboardempleado = () => {
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
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
          <li><a href="/dashboardempleado"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></a></li>
          <li><Link to="/clienteDempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/registrarservicioempleado"><FontAwesomeIcon icon={faFileText} /> <span>Solicitar Servicios</span></Link></li>
          <li><Link to="/citaempleado"><FontAwesomeIcon icon={faCalendar} /> <span>Cita</span></Link></li>
          <li><Link to="/registrotrabajoempleado"><FontAwesomeIcon icon={faTasks} /> <span>Registro Trabajo</span></Link></li>
          <li><Link to="/vercotizacionempleado"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotización</span></Link></li>
          <li><Link to="/facturaempleado"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
          <li><Link to="/pagoempleado"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pago</span></Link></li>
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
                    <strong>{formatearFecha(cita.fecha)}</strong> a las <strong>{cita.hora}</strong> – Estado: <em>{cita.estado}</em>
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

export default Dashboardempleado;
