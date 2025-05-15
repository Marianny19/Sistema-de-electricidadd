import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faClipboard, faFileInvoice,
  faFileInvoiceDollar, faHome, faMoneyCheck, faSignOut,
  faUser, faUsers, faFileText, faTasks
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../index.css";
import { Chart } from "chart.js/auto";


const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [citas, setCitas] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [atrasados, setAtrasados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const cerrarSesion = () => {
    console.log("Cerrar sesión");
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
    graficoExistente.destroy(); // Evita duplicados al actualizar
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
        <h2>Bienvenido usuario</h2>
        <ul>
          <li><Link to="/"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteempleado"><FontAwesomeIcon icon={faUsers} /> <span>Clientes</span></Link></li>
          <li><Link to="/empleado"><FontAwesomeIcon icon={faUser} /> <span>Empleados</span></Link></li>
          <li><Link to="/solicitudservicio"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/formulariocita"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/registrotrabajo"><FontAwesomeIcon icon={faTasks} /> <span>Registro trabajo</span></Link></li>
          <li><Link to="/cotizacion"><FontAwesomeIcon icon={faFileInvoice} /> <span>Cotizacion</span></Link></li>
          <li><Link to="/factura"><FontAwesomeIcon icon={faFileInvoiceDollar} /> <span>Factura</span></Link></li>
          <li><Link to="/pago"><FontAwesomeIcon icon={faMoneyCheck} /> <span>Pagos</span></Link></li>
        </ul>
        <ul>
          <li className="Cerrarsesion">
            <Link to="/iniciarsesion" onClick={cerrarSesion}>
              <FontAwesomeIcon icon={faSignOut} /> <span>Cerrar sesión</span>
            </Link>
          </li>
        </ul>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="dashboard-content">
        <h2>Bienvenido al sistema de gestión de electricidad</h2>
        <div className="widgets">
          {/* Próximas citas */}
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

          {/* Servicios pendientes */}
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

          {/* Servicios atrasados */}
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
