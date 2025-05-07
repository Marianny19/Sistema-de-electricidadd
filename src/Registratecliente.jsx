import React from 'react'
import iniciosesion from './imagenes/Inicio_sesion.png'
import logo from './imagenes/logo.jpg'

function Registratecliente() {
  return (
    <>
   
    <div className="foto_inicial">
      <div className="contenedor">
      <div className='logo'>
    <img src={logo} alt="Logo" />
   </div>
        <h1>Registrate</h1>
        <form className='formulario'>
        <input type="text" placeholder="Email" />
          <input type="text" placeholder="Usuario" />
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