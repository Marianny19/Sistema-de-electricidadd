import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iniciosesion from './imagenes/Inicio_sesion.png';
import { FaArrowLeft } from "react-icons/fa"; 


function Iniciosesion() {
  const navigate = useNavigate();

  return (
    <div className="foto_inicial">
      <div className="contenedor">
        <div className="inicio-sesion">
        <Link to="/" className="boton-volver-icono" aria-label="Volver">
       <FaArrowLeft />
        </Link>

          <h1>Iniciar sesión</h1>
        </div>

        <form className="formulario">
          <input type="text" placeholder="Usuario" className="campo" />
          <input type="password" placeholder="Contraseña" className="campo" />
          <button type="submit" className="boton-principal">
            Iniciar sesión
          </button>

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
}

export default Iniciosesion;
