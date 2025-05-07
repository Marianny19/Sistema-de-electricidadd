import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './index.css';
import Iniciosesion from './Iniciosesion.jsx';
import Identificacion from './Identificacion.jsx'; 
import Dashboard from './Dashboard.jsx';
import Clienteempleado from './Clienteempleado.jsx';
import Empleado from './Empleado.jsx';
import FormularioCita from './FormularioCitas.jsx'; 
import Crearcita from './Crearcita.jsx';
import CrearCliente from './CrearCliente.jsx';
import Factura from './Factura.jsx';
import Dashboardcliente from './Dashboardcliente.jsx';
import Clienteregistro from './Clienteregistro.jsx';
import Citaregistro from './Citaregistro.jsx';
import Notasregistro from './Notasregistro.jsx';
import Recomendacion from './recomendacion.jsx';
import Pago from './Pago.jsx';
import PagoForm from './PagoForm.jsx';
import Cotizacionregisto from './Cotizacionregistro.jsx';
import Cotizacion from './Cotizacion.jsx';
import Crearempleado from './Crearempleado.jsx';
import Iniciosesioncliente from './Iniciosesioncliente.jsx';
import Registratecliente from './Registratecliente.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Identificacion />} />
        <Route path="/dashboardcliente" element={<Dashboardcliente />} /> {}
        <Route path="/dashboard" element={<Dashboard />} /> {}
        <Route path='/clienteempleado' element={<Clienteempleado />} /> {}
        <Route path='/empleado' element={<Empleado />} /> {}
        <Route path="/Iniciosesion" element={<Iniciosesion />} /> {}
        <Route path='/formulariocita' element={<FormularioCita />} /> {}
        <Route path='/crearcita' element={<Crearcita />} /> {}
        <Route path='/crearcliente' element={<CrearCliente />} /> {}
        <Route path='/factura' element={<Factura />} /> {}
        <Route path='/clienteregistro' element={<Clienteregistro />} /> {}
        <Route path='/citaregistro' element={<Citaregistro />} /> {}
        <Route path='/notasregistro' element={<Notasregistro />} /> {}
        <Route path='/recomendacion' element={<Recomendacion />} /> {}
        <Route path='/pago' element={<Pago />} /> {}
        <Route path='/pagoform' element={<PagoForm />} /> {}
        <Route path='/cotizacionregistro' element={<Cotizacionregisto />} /> {}
        <Route path='/cotizacion' element={<Cotizacion />} /> {}
        <Route path='/crearempleado' element={<Crearempleado />} /> {}
        <Route path='/iniciosesioncliente' element={<Iniciosesioncliente />} /> {}
        <Route path='/registratecliente' element={<Registratecliente />} /> {}







      </Routes>
    </Router>
  </StrictMode>
);