import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './index.css';
import Iniciosesion from './Iniciosesion.jsx';
import Identificacion from './Identificacion.jsx'; 
import Dashboard from './Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Dashboard />} /> {}
        <Route path="/Iniciosesion" element={<Iniciosesion />} /> {}
      </Routes>
    </Router>
  </StrictMode>
);