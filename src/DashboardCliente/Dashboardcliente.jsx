import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../imagenes/logo.jpg'
import {
  faCalendar, faCartArrowDown, faChevronLeft, faClipboard,
  faFileInvoice, faFileInvoiceDollar, faFileText, faHome, faMoneyCheck,
  faReceipt,
  faSignOut, faUser, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";


const MiComponente = () => (
  <div>
    <FontAwesomeIcon icon={faHome} />
    Inicio
  </div>
);
const Dashboardcliente = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  return (

    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <h2>Bienvenido</h2>
        <p className="subtexto-email">{emailUsuario}</p>

        <ul>
          <li><Link to="/dashboardcliente"><FontAwesomeIcon icon={faHome} /> <span>Inicio</span></Link></li>
          <li><Link to="/clienteregistro"><FontAwesomeIcon icon={faUsers} /> <span>Cliente</span></Link></li>
          <li><Link to="/solicitudservicioc"><FontAwesomeIcon icon={faFileText} /> <span>Solicitud servicio</span></Link></li>
          <li><Link to="/citaregistro"><FontAwesomeIcon icon={faCalendar} /> <span>Citas</span></Link></li>
          <li><Link to="/notasregistro"> <FontAwesomeIcon icon={faClipboard} /> <span>Notas</span></Link></li>
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
        <button className="toggle-btn" onClick={toggleSidebar}><FontAwesomeIcon icon={faChevronLeft} /></button>
      </div>
      <div className="dashboard-content">
        <div className="logo-dashboard">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Bienvenido a Servicios Múltiples Pérez</h2>
        <div className="widgets">
          <div className="widget cita">

            <h3>MISIÓN</h3>
            <div id="lista-citas">
              <p>Brindar soluciones integrales en electricidad residencial, comercial e industrial con altos estándares de c
                alidad, seguridad y responsabilidad, satisfaciendo las necesidades de nuestros clientes mediante un servicio
                eficiente, innovador y confiable.</p>
            </div>
          </div>

          <div className="widget">
            <h3>VISIÓN</h3>
            <div id="lista-servicios">
              <p>Ser la empresa destacada en servicios eléctricos, reconocida por su compromiso con la excelencia, la innovación
                tecnológica y la satisfacción del cliente, contribuyendo al desarrollo sostenible de la comunidad.</p>
            </div>
          </div>

          <div className="widget">
            <h3>VALORES</h3>
            <div id="lista-servicios-atrasados">
              <p>Responsabilidad, honestidad, compromiso, calidad, innovacion y trabajo en equipo.</p>
            </div>
          </div>

          <div className="widget">
            <h3>¿QUIÉNES SOMOS?</h3>
            <p>En Servicios Múltiples Pérez somos una empresa dedicada a ofrecer soluciones eléctricas confiables, seguras y
              eficientes para hogares, negocios e industrias. Contamos con un equipo de técnicos capacitados y comprometidos
              con brindar un servicio de alta calidad, cumpliendo con las normas eléctricas vigentes y adaptándonos a las
              necesidades de cada cliente. </p>

            <p>Desde nuestros inicios, nos hemos enfocado en construir relaciones de confianza, ofreciendo atención personalizada,
              asesoría experta y respuestas rápidas ante cualquier requerimiento eléctrico. Nuestro objetivo es garantizar la
              tranquilidad y satisfacción de quienes confían en nosotros, siendo su aliado en cada proyecto, mantenimiento o
              emergencia eléctrica.</p>
          </div>
        </div>
        <br />
        <div className="widget">
          <h3>NUESTROS SERVICIOS</h3>
          <p>
            <ul>Instalaciones eléctricas residenciales, comerciales e industriales</ul>
            <ul>Reparaciones eléctricas</ul>
            <ul>Instalación y programación de temporizadores y sistemas automatizados</ul>
            <ul>Instalación de lámparas e inversores</ul>
            <ul>Mantenimiento eléctrico</ul>
            <ul>Servicios de plomeria</ul>
            <ul>Instalacion y mantenimiento de aires/ac</ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboardcliente;
