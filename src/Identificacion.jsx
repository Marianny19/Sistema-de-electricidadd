import React from "react";
import logo from './imagenes/logo.jpg'
import {Link} from 'react-router-dom'

const Identificacion = () => {
    return (
        <div className="identificacion">

            <h2>Bienvenido al sistema de gestión de Servicios Múltiples Pérez</h2>
            <div className='logo_identificacion'>
            <img src={logo} alt="Logo" />
            </div>
            <h1>Elige como deseas iniciar sesión</h1> 
            <div className="botones">
            <Link to= "/dashboardcliente">
            <button className="btn">Cliente </button>
            </Link>
            <Link to= "/Iniciosesion">
            <button className="btn">Empleado</button>
            </Link>
            </div>
            </div>
    )
}
export default Identificacion;
