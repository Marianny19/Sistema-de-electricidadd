import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './imagenes/logo.jpg';
import iniciosesion from './imagenes/Inicio_sesion.png';
import { FaArrowLeft } from "react-icons/fa"; 

const Registratecliente = () => {
  const [cliente, setCliente] = useState({
    email: '',
    contrasena: '',
    rol: 'cliente',
    estado: 'activo'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cliente.email || !cliente.contrasena) {
      alert('El email y la contraseña son obligatorios');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8081/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al registrar el cliente');
      }

      alert('Cliente registrado con éxito!');
      navigate('/iniciarsesion');
    } catch (error) {
      alert('Error al registrar el cliente: ' + error.message);
    }
  };

  return (
    <>
      <Link to="/iniciarsesion" className="boton-volver-icono" aria-label="Volver">
        <FaArrowLeft />
      </Link>
      <div className="foto_inicial">
        <div className="contenedor">
          <div className="logo-dashboard">
            <img src={logo} alt="Logo" />
          </div>
          <h1>Registrate</h1>
          <form className='formulario' onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="email" 
              placeholder="Email" 
              value={cliente.email} 
              onChange={handleChange} 
            />
            <div className="contrasena">
              <input 
                type="password" 
                name="contrasena" 
                placeholder="Contraseña" 
                value={cliente.contrasena} 
                onChange={handleChange} 
              />
              <button type="submit">Registrar</button>
            </div>
          </form>
        </div>

        <div className="contenedor-imagen">
          <img className="img_inicio" src={iniciosesion} alt="foto inicio" />
        </div>
      </div>
    </>
  );
};

export default Registratecliente;
