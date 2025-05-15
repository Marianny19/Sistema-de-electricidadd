import React from 'react';
import { Link } from 'react-router-dom';

import logo from './imagenes/logo.jpg'


const Identificate = () => {
  return (
    <div className="welcome-container">
          <div className="logo-dashboard">
              <img src={logo} alt="Logo" />
            </div>
      <h1 className="title">Bienvenidos a Servicios Multiples Perez</h1>
      <p className="subtitle">Continua para entrar:</p>
      <Link to = "/iniciarsesion">
      <button className="login-button">Continuar</button>
      </Link>
    </div>
  );
};

export default Identificate;
