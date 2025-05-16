// src/components/Iniciosesion.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iniciosesion from './imagenes/Inicio_sesion.png';
import { FaArrowLeft } from "react-icons/fa";

const Iniciosesion = () => {
  const [credenciales, setCredenciales] = useState({ email: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!credenciales.email.trim() || !credenciales.contrasena.trim()) {
      setError('Email y contraseña son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al iniciar sesión');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      if (data.rol === 'administrador') {
        navigate('/dashboard', { replace: true });
      } else {
        setError('Rol no autorizado');
      }
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="foto_inicial">
      <div className="contenedor">
        <div className="inicio-sesion">
          <Link to="/" className="boton-volver-icono" aria-label="Volver">
            <FaArrowLeft />
          </Link>
          <h1>Iniciar sesión</h1>
        </div>

        <form className="formulario" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Usuario"
            className="campo"
            value={credenciales.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            className="campo"
            value={credenciales.contrasena}
            onChange={handleChange}
            required
          />
          <button type="submit" className="boton-principal">
            Iniciar sesión
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p className="texto-registro">¿Aún no tienes cuenta?</p>
          <Link to="/registratecliente">
            <button type="button" className="boton-secundario">
              Regístrate
            </button>
          </Link>
        </form>
      </div>

      <div className="contenedor-imagen">
        <img className="img_inicio" src={iniciosesion} alt="foto inicio" />
      </div>
    </div>
  );
};

export default Iniciosesion;
