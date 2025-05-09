import React from 'react'
import iniciosesion from './imagenes/Inicio_sesion.png'

function Registratecliente() {
  return (
    <>
   
    <div className="foto_inicial">
      <div className="contenedor">
    
        <h1>Registrate</h1>
        <form className='formulario'>
        <input type="text" placeholder="Email" />
          <div className="contrasena">
            <input type="password" placeholder="Contraseña" />
             <select className="campo">
            <option value="cliente">Cliente</option>
            <option value="empleado">Empleado</option>
          </select>
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