import React from 'react';
import { Navigate } from 'react-router-dom';

//ruta con inicio sesion
export const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/iniciarsesion" replace />;
  }
  return children;
};

//ruta por si no he iniciado sesion
export const RutaPublicaSoloParaNoLogueados = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

//ruta para controlar los roles
export const RutaProtegidaPorRol = ({ children, rolesPermitidos = [] }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token) {
    return <Navigate to="/iniciarsesion" replace />;
  }
  if (!rolesPermitidos.includes(rol)) {
    switch (rol) {
      case 'administrador':
        return <Navigate to="/dashboard" replace />;
      case 'cliente':
        return <Navigate to="/dashboardcliente" replace />;
      case 'empleado':
        return <Navigate to="/dashboardempleado" replace />;
      default:
        return <Navigate to="/iniciarsesion" replace />;
    }
  }
    return children;
};
