import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

function Editarsolicitud() {
  const { id } = useParams(); 

  const [formulario, setFormulario] = useState({
    id_cliente: '',
    servicios: [],
    direccion: '',
    via_comunicacion: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: ''
  });

  const [clientes, setClientes] = useState([]);
  const [serviciosLista, setServiciosLista] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resSolicitud = await fetch(`http://localhost:8081/solicitudservicio/${id}`);
        const data = await resSolicitud.json();

        setFormulario({
          id_cliente: data.id_cliente,
          servicios: data.servicios.map(s => s.id_servicio),
          direccion: data.direccion,
          via_comunicacion: data.via_comunicacion,
          fecha: data.fecha.split('T')[0],
          estado: data.estado || ''
        });
      } catch (error) {
        console.error('Error cargando solicitud:', error);
      }
    };

    const obtenerClientesYServicios = async () => {
      try {
        const [resClientes, resServicios] = await Promise.all([
          fetch('http://localhost:8081/clientes'),
          fetch('http://localhost:8081/servicios')
        ]);

        const clientesData = await resClientes.json();
        const serviciosData = await resServicios.json();

        setClientes(clientesData);
        setServiciosLista(serviciosData);
      } catch (error) {
        console.error('Error cargando clientes o servicios:', error);
      }
    };

    obtenerDatos();
    obtenerClientesYServicios();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleServiciosChange = (selectedOptions) => {
    const idsSeleccionados = selectedOptions.map(op => op.value);
    setFormulario({ ...formulario, servicios: idsSeleccionados });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const estadosValidos = ['pendiente', 'realizado', 'atrasado', 'cancelado'];
    const { id_cliente, servicios, direccion, via_comunicacion, fecha, estado } = formulario;
    const estadoFinal = estado && estadosValidos.includes(estado) ? estado : 'pendiente';

    if (!id_cliente || servicios.length === 0 || !direccion || !fecha) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:8081/solicitudservicio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formulario,
          estado: estadoFinal
        })
      });

      if (respuesta.ok) {
        alert('Solicitud actualizada correctamente');
        
      } else {
        const error = await respuesta.json();
        console.error('Error del servidor:', error);
        alert('Error al actualizar solicitud');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error de red al actualizar solicitud');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">EDITAR SOLICITUD</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <select
          name="id_cliente"
          className="campo-cita"
          value={formulario.id_cliente}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map(c => (
            <option key={c.id_cliente} value={c.id_cliente}>
              {c.nombre}
            </option>
          ))}
        </select>

        <div className="campo-cita">
          <label>Servicios:</label>
          <Select
            isMulti
            options={serviciosLista.map(servicio => ({
              value: servicio.id_servicio,
              label: servicio.nombre_servicio
            }))}
            value={serviciosLista
              .filter(serv => formulario.servicios.includes(serv.id_servicio))
              .map(serv => ({
                value: serv.id_servicio,
                label: serv.nombre_servicio
              }))}
            onChange={handleServiciosChange}
            placeholder="Selecciona uno o más servicios"
          />
        </div>

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          className="campo-cita"
          value={formulario.direccion}
          onChange={handleChange}
        />

        <input
          type="text"
          name="via_comunicacion"
          placeholder="Vía de comunicación"
          className="campo-cita"
          value={formulario.via_comunicacion}
          onChange={handleChange}
        />

        <input
          type="date"
          name="fecha"
          className="campo-cita"
          value={formulario.fecha}
          onChange={handleChange}
        />

        <select
          name="estado"
          className="campo-cita"
          value={formulario.estado}
          onChange={handleChange}
        >
          <option value="">Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="realizado">Realizado</option>
          <option value="atrasado">Atrasado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <button type="submit" className="boton-cita">ACTUALIZAR</button>
      </form>
    </div>
  );
}

export default Editarsolicitud;
