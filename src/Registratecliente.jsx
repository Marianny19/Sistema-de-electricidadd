import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from './imagenes/logo.jpg'
import iniciosesion from './imagenes/Inicio_sesion.png'
import { FaArrowLeft } from "react-icons/fa"; 


function Registratecliente() {
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
        <form className='formulario'>
        <input type="text" placeholder="Email" />
          <div className="contrasena">
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Registrar</button>
          </div>
        </form>
      </div>

      <div className="contenedor-imagen">
        <img className="img_inicio" src={iniciosesion} alt="foto inicio" />
      </div>
    </div>
    </>
  )
  
}

export default Registratecliente