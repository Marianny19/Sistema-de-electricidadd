import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Solicitarservicio from './DashboardCliente/Solicitarservicio.jsx';
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
import Actualizarcita  from './DashboardAdministrador/Actualizarcita.jsx';
import Actualizarpago from './DashboardAdministrador/Actualizarpago.jsx';
import Vercotizaciones from './DashboardAdministrador/Vercotizaciones.jsx';
import Actualizarcotizacion from './DashboardAdministrador/Actualizarcotizacion.jsx';
import Actualizarregistrotrabajo from './DashboardAdministrador/Actualizarregistrotrabajo.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Identificate />} />
        <Route path="/iniciarsesion" element={<Iniciosesion />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clienteempleado" element={<Clienteempleado />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/formulariocita" element={<FormularioCita />} />
        <Route path="/crearcita" element={<Crearcita />} />
        <Route path="/crearcliente" element={<CrearCliente />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/dashboardcliente" element={<Dashboardcliente />} />
        <Route path="/clienteregistro" element={<Clienteregistro />} />
        <Route path="/citaregistro" element={<Citaregistro />} />
        <Route path="/notasregistro" element={<Notasregistro />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/pagoform" element={<PagoForm />} />
        <Route path="/cotizacion" element={<Cotizacion />} />
        <Route path="/crearempleado" element={<Crearempleado />} />
        <Route path="/registratecliente" element={<Registratecliente />} />
        <Route path="/actualizarcliente/:id" element={<Actualizarcliente />} />
        <Route path="/actualizarempleado/:id" element={<Actualizarempleado />} />
        <Route path="/solicitudservicio" element={<Solicitudservicio />} />
        <Route path="/crearsolicitud" element={<Crearsolicitud />} />
        <Route path="/registrotrabajo" element={<Registrotrabajo />} />
        <Route path="/creartrabajo" element={<Crearregistrotrabajo />} />
        <Route path="/dashboardempleado" element={<Dashboardempleado />} />
        <Route path="/solicitarservicio" element={<Solicitarservicio />} />
        <Route path="/clienteDempleado" element={<ClienteDempleado />} />
        <Route path="/crearclienteempleado" element={<CrearClienteEmpleado />} />
        <Route path="/registrarservicioempleado" element={<RegistrarServicioEmpleado />} />
        <Route path="/crearservicioempleado" element={<CrearServicioEmpleado />} />
        <Route path="/citaempleado" element={<CitaEmpleado />} />
        <Route path="/crearcitaempleado" element={<CrearCitaEmpleado />} />
        <Route path="/registrotrabajoempleado" element={<RegistroTrabajoEmpleado />} />
        <Route path="/crearregistroempleado" element={<CrearRegistroEmpleado />} />
        <Route path="/facturaempleado" element={<FacturaEmpleado />} />
        <Route path="/pagoempleado" element={<PagoEmpleado />} />
        <Route path="/crearpagoempleado" element={<CrearPagoEmpleado />} />
        <Route path="/cotizacionempleado" element={<CotizacionEmpleado />} /> 
        <Route path="/actualizarsolicitud/:id" element={<Actualizarsolicitud />} />
        <Route path="/actualizarcitas/:id" element={<Actualizarcita />} />
        <Route path="/actualizarpago/:id" element={<Actualizarpago />} />  
        <Route path="/vercotizaciones" element={<Vercotizaciones />} />
        <Route path="/actualizarcotizacion/:id" element={<Actualizarcotizacion />} />
        

        <Route path="/actualizarpago/:id" element={<Actualizarpago />} />
        <Route path="/actualizarregistrotrabajo/:id" element={<Actualizarregistrotrabajo />} />
      </Routes>
    </Router>
  </StrictMode>
);
