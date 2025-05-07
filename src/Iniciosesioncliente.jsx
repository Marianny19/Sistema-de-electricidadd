import React from 'react'
import iniciosesion from './imagenes/Inicio_sesion.png'
import logo from './imagenes/logo.jpg'
import { Link } from 'react-router-dom';


function Iniciosesioncliente() {
  return (
    <>
   
   <div className="foto_inicial">
  <div className="contenedor">
    <div className='logo'>
      <img src={logo} alt="Logo" />
    </div>

    <h1>Iniciar sesión</h1>

    <form className='formulario'>
          <input type="text" placeholder="Usuario" />
          <div className="contrasena">
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Iniciar sesión</button>
          </div>
        </form>

    <p>¿No tienes cuenta?</p>
    <Link to="/registratecliente">
      <button type="button">Regístrate</button>
    </Link>
  </div>

  <div className="contenedor-imagen">
    <img className="img_inicio" src={iniciosesion} alt="foto inicio" />
  </div>
</div>

    </>
  )
  
}

export default Iniciosesioncliente