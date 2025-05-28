import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RutaProtegida, RutaPublicaSoloParaNoLogueados, RutaProtegidaPorRol } from './RutaProtegida.jsx';
import './index.css';

import Iniciosesion from './Iniciosesion.jsx';
import Dashboard from './DashboardAdministrador/Dashboard.jsx';
import Clienteempleado from './DashboardAdministrador/Clienteempleado.jsx';
import Empleado from './DashboardAdministrador/Empleado.jsx';
import FormularioCita from './DashboardAdministrador/FormularioCitas.jsx';
import Crearcita from './DashboardAdministrador/Crearcita.jsx';
import CrearCliente from './DashboardAdministrador/CrearCliente.jsx';
import Factura from './DashboardAdministrador/Factura.jsx';
import Dashboardcliente from './DashboardCliente/Dashboardcliente.jsx';
import Clienteregistro from './DashboardCliente/Clienteregistro.jsx';
import Citaregistro from './DashboardCliente/Citaregistro.jsx';
import Notasregistro from './DashboardCliente/Notasregistro.jsx';
import Pago from './DashboardAdministrador/Pago.jsx';
import PagoForm from './DashboardAdministrador/PagoForm.jsx';
import Cotizacion from './DashboardAdministrador/Cotizacion.jsx';
import Crearempleado from './DashboardAdministrador/Crearempleado.jsx';
import Registratecliente from './Registratecliente.jsx';
import Actualizarcliente from './DashboardAdministrador/Actualizarcliente.jsx';
import Actualizarempleado from './DashboardAdministrador/Actualizarempleado.jsx';
import Solicitudservicio from './DashboardAdministrador/Solicitudservicio.jsx';
import Crearsolicitud from './DashboardAdministrador/Crearsolicitud.jsx';
import Registrotrabajo from './DashboardAdministrador/Registrotrabajo.jsx';
import Crearregistrotrabajo from './DashboardAdministrador/Crearregistrotrabajo.jsx';
import Dashboardempleado from './DashboardEmpleado/Dashboardempleado.jsx';
import Solicitarservicio from './DashboardCliente/Solicitarservicioc.jsx';
import ClienteDempleado from './DashboardEmpleado/ClienteDempleado.jsx';
import CrearClienteEmpleado from './DashboardEmpleado/CrearClienteEmpleado.jsx';
import RegistrarServicioEmpleado from './DashboardEmpleado/RegistrarServicioEmpleado.jsx';
import CrearServicioEmpleado from './DashboardEmpleado/CrearServicioEmpleado.jsx';
import CitaEmpleado from './DashboardEmpleado/CitaEmpleado.jsx';
import CrearCitaEmpleado from './DashboardEmpleado/CrearCitaEmpleado.jsx';
import RegistroTrabajoEmpleado from './DashboardEmpleado/RegistroTrabajoEmpleado.jsx';
import CrearRegistroEmpleado from './DashboardEmpleado/CrearRegistroEmpleado.jsx';
import FacturaEmpleado from './DashboardEmpleado/FacturaEmpleado.jsx';
import PagoEmpleado from './DashboardEmpleado/PagoEmpleado.jsx';
import CrearPagoEmpleado from './DashboardEmpleado/CrearPagoEmpleado.jsx';
import CotizacionEmpleado from './DashboardEmpleado/CotizacionEmpleado.jsx';
import Identificate from './Identificate.jsx';
import Actualizarsolicitud from './DashboardAdministrador/Actualizarsolicitud.jsx';
import Actualizarcita from './DashboardAdministrador/Actualizarcita.jsx';
import Actualizarpago from './DashboardAdministrador/Actualizarpago.jsx';
import Vercotizaciones from './DashboardAdministrador/Vercotizaciones.jsx';
import Actualizarcotizacion from './DashboardAdministrador/Actualizarcotizacion.jsx';
import Actualizarregistrotrabajo from './DashboardAdministrador/Actualizarregistrotrabajo.jsx';
import CrearRegistroTrabajo from './DashboardEmpleado/CrearRegistroEmpleado.jsx';
import Vercotizacionempleado from './DashboardEmpleado/Vercotizacionempleado.jsx';
import Solicitarservicioc from './DashboardCliente/Solicitarservicioc.jsx';
import Crearfactura from './DashboardAdministrador/Crearfactura.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Identificate />} />
        <Route path="/dashboard" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Dashboard /></RutaProtegidaPorRol>} />
        <Route path="/dashboardcliente" element={<RutaProtegidaPorRol rolesPermitidos={['cliente']}><Dashboardcliente /></RutaProtegidaPorRol>} />
        <Route path="/dashboardempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><Dashboardempleado /></RutaProtegidaPorRol>} />
        <Route path="/iniciarsesion" element={<RutaPublicaSoloParaNoLogueados><Iniciosesion /></RutaPublicaSoloParaNoLogueados>} />
        <Route path="/registratecliente" element={<RutaPublicaSoloParaNoLogueados><Registratecliente /></RutaPublicaSoloParaNoLogueados>} />
        <Route path="/clienteempleado" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Clienteempleado /></RutaProtegidaPorRol>} />
        <Route path="/empleado" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Empleado /></RutaProtegidaPorRol>} />
        <Route path="/formulariocita" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><FormularioCita /></RutaProtegidaPorRol>} />
        <Route path="/crearcita" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Crearcita /></RutaProtegidaPorRol>} />
        <Route path="/crearcliente" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><CrearCliente /></RutaProtegidaPorRol>} />
        <Route path="/factura" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Factura /></RutaProtegidaPorRol>} />
        <Route path="/clienteregistro" element={<RutaProtegidaPorRol rolesPermitidos={['cliente']}><Clienteregistro /></RutaProtegidaPorRol>} />
        <Route path="/solicitudservicioc" element={<RutaProtegidaPorRol rolesPermitidos={['cliente']}><Solicitarservicioc /></RutaProtegidaPorRol>} />

        <Route path="/citaregistro" element={<RutaProtegidaPorRol rolesPermitidos={['cliente']}><Citaregistro /></RutaProtegidaPorRol>} />
        <Route path="/notasregistro" element={<RutaProtegidaPorRol rolesPermitidos={['cliente']}><Notasregistro /></RutaProtegidaPorRol>} />
        <Route path="/pago" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Pago /></RutaProtegidaPorRol>} />
        <Route path="/pagoform" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><PagoForm /></RutaProtegidaPorRol>} />
        <Route path="/cotizacion" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Cotizacion /></RutaProtegidaPorRol>} />
        <Route path="/crearempleado" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Crearempleado /></RutaProtegidaPorRol>} />
        <Route path="/actualizarcliente/:id" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Actualizarcliente /></RutaProtegidaPorRol>} />
        <Route path="/actualizarempleado/:id" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Actualizarempleado /></RutaProtegidaPorRol>} />
        <Route path="/solicitudservicio" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Solicitudservicio /></RutaProtegidaPorRol>} />
        <Route path="/crearsolicitud" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Crearsolicitud /></RutaProtegidaPorRol>} />
        <Route path="/registrotrabajo" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Registrotrabajo /></RutaProtegidaPorRol>} />
        <Route path="/crearregistrotrabajo" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Crearregistrotrabajo /></RutaProtegidaPorRol>} />
        <Route path="/crearfactura" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Crearfactura /></RutaProtegidaPorRol>} />


        <Route path="/creartrabajo" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><CrearRegistroTrabajo /></RutaProtegidaPorRol>} />
        <Route path="/solicitarservicio" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Solicitarservicio /></RutaProtegidaPorRol>} />
        <Route path="/clienteDempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><ClienteDempleado /></RutaProtegidaPorRol>} />
        <Route path="/crearclienteempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><CrearClienteEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/registrarservicioempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><RegistrarServicioEmpleado /></RutaProtegidaPorRol>} />
        
        <Route path="/crearservicioempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><CrearServicioEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/citaempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><CitaEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/crearcitaempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><CrearCitaEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/registrotrabajoempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><RegistroTrabajoEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/crearregistroempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><CrearRegistroEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/facturaempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><FacturaEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/pagoempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><PagoEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/crearpagoempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><CrearPagoEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/vercotizacionempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><Vercotizacionempleado /></RutaProtegidaPorRol>} />

        <Route path="/cotizacionempleado" element={<RutaProtegidaPorRol rolesPermitidos={['empleado']}><CotizacionEmpleado /></RutaProtegidaPorRol>} />
        <Route path="/actualizarsolicitud/:id" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Actualizarsolicitud /></RutaProtegidaPorRol>} />
        <Route path="/actualizarcitas/:id" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Actualizarcita /></RutaProtegidaPorRol>} />
        <Route path="/actualizarpago/:id" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Actualizarpago /></RutaProtegidaPorRol>} />
        <Route path="/vercotizaciones" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Vercotizaciones /></RutaProtegidaPorRol>} />
        <Route path="/actualizarcotizacion/:id" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Actualizarcotizacion /></RutaProtegidaPorRol>} />
        <Route path="/actualizarpago/:id" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Actualizarpago /></RutaProtegidaPorRol>} />
        <Route path="/actualizarregistrotrabajo/:id" element={<RutaProtegidaPorRol rolesPermitidos={['administrador']}><Actualizarregistrotrabajo /></RutaProtegidaPorRol>} />
      </Routes>
    </Router>
  </StrictMode>
);
