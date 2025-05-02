import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './index.css';
import Iniciosesion from './Iniciosesion.jsx';
import Identificacion from './Identificacion.jsx'; 
import Dashboard from './Dashboard.jsx';
import Clienteempleado from './Clienteempleado.jsx';
import Empleado from './Empleado.jsx';
import FormularioCita from './FormularioCitas.jsx'; // Importa el componente FormularioCita
import Crearcita from './Crearcita.jsx';
import CrearCliente from './CrearCliente.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {}
        <Route path="/dashboard" element={<Dashboard />} /> {}
        <Route path='/clienteempleado' element={<Clienteempleado />} /> {}
        <Route path='/empleado' element={<Empleado />} /> {}
        <Route path="/Iniciosesion" element={<Iniciosesion />} /> {}
        <Route path='/formulariocita' element={<FormularioCita />} /> {/* Ruta para el formulario de citas */}
        <Route path='/crearcita' element={<Crearcita />} /> {/* Ruta para crear una cita */}
        <Route path='/crearcliente' element={<CrearCliente />} /> {/* Ruta para crear un cliente */}
        
      </Routes>
    </Router>
  </StrictMode>
);