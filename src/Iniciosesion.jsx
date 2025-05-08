import React from 'react';
import { Link } from 'react-router-dom';
import iniciosesion from './imagenes/Inicio_sesion.png';

function Iniciosesion() {
  return (
    <div className="foto_inicial">
      <div className="contenedor">
        <div className="inicio-sesion">
          <h1>Iniciar sesión</h1>
        </div>

        <form className="formulario">
          <input
            type="text"
            placeholder="Usuario"
            className="campo"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="campo"
          />

          <select className="campo">
            <option value="cliente">Cliente</option>
            <option value="empleado">Empleado</option>
          </select>

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
        <img
          className="img_inicio"
          src={iniciosesion}
          alt="foto inicio"
        />
      </div>
    </div>
  );
}

export default Iniciosesion;
