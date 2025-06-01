import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const Registratecliente = () => {
  return (
    <div className="dashboard-content">
      <Link to="/dashboardcliente" className="boton-retroceso" aria-label="Volver">
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      <h2>Registro de nuevo cliente y usuario</h2>
      <FormularioRegistro />
    </div>
  );
};

function FormularioRegistro() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: 'activo',
  });

  const [usuario, setUsuario] = useState({
    email: '',
    contrasena: '',
    rol: 'cliente',
    estado: 'activo'
  });

  const handleChangeCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      setUsuario(prev => ({ ...prev, email: e.target.value }));
    }
  };

  const handleChangeUsuario = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.email || !usuario.contrasena) {
      alert('El email y la contraseña son obligatorios');
      return;
    }

    try {
      // Registrar usuario
      const resUsuario = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      if (!resUsuario.ok) {
        const errorData = await resUsuario.json();
        throw new Error(errorData.error || 'Error al registrar el usuario');
      }

      // Registrar cliente
      const resCliente = await fetch('https://sistema-de-electricidadd-production-f62b.up.railway.app/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });

      if (!resCliente.ok) {
        throw new Error('Error al registrar el cliente');
      }

      alert('Usuario y cliente registrados exitosamente');
      navigate('/iniciarsesion');

    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error al registrar: ' + error.message);
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">LLENA LOS CAMPOS REQUERIDOS</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" className="campo-cita" value={cliente.nombre} onChange={handleChangeCliente} />
        <input type="text" name="apellido" placeholder="Apellido" className="campo-cita" value={cliente.apellido} onChange={handleChangeCliente} />
        <input type="text" name="cedula" placeholder="Cédula" className="campo-cita" value={cliente.cedula} onChange={handleChangeCliente} />
        <input type="text" name="telefono" placeholder="Teléfono" className="campo-cita" value={cliente.telefono} onChange={handleChangeCliente} />
        <input type="text" name="email" placeholder="Email" className="campo-cita" value={cliente.email} onChange={handleChangeCliente} />
        <input type="text" name="direccion" placeholder="Dirección" className="campo-cita" value={cliente.direccion} onChange={handleChangeCliente} />

        <input type="password" name="contrasena" placeholder="Contraseña" className="campo-cita" value={usuario.contrasena} onChange={handleChangeUsuario} />

        <select name="estado" className="campo-cita" value={cliente.estado} onChange={handleChangeCliente}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button type="submit" className="boton-cita">REGISTRAR</button>
      </form>
    </div>
  );
}

export default Registratecliente;
