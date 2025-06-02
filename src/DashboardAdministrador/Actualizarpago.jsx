import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faChevronLeft, faFileInvoice,
  faFileInvoiceDollar, faHome, faMoneyCheck,
  faSignOut, faUser, faUsers, faSearch, faTasks, faFileText
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../index.css";

const ActualizarPago = () => {
  const { id } = useParams();  
  const [formulario, setFormulario] = useState({
    id_solicitud: '',
    factura_id: '',
    fecha_pago: '',
    monto: '',
    hora_pago: '',
    metodo_pago: '',
    estado: 'activo',
  });

  useEffect(() => {
    fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/pagos/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFormulario({
            ...data,
            id_solicitud: data.id_solicitud || '',
            factura_id: data.factura_id || '',
            fecha_pago: data.fecha_pago ? data.fecha_pago.split('T')[0] : '',
            hora_pago: data.hora_pago || '',
            monto: data.monto || '',
            metodo_pago: data.metodo_pago || '',
            estado: data.estado || 'activo',
          });
        } else {
          alert('Pago no encontrado');
        }
      })
      .catch(error => {
        console.error('Error al cargar pago:', error);
        alert('No se pudo cargar la información del pago');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.monto || !formulario.fecha_pago || !formulario.hora_pago || !formulario.metodo_pago) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const body = {
        id_solicitud: Number(formulario.id_solicitud),
        factura_id: Number(formulario.factura_id),
        fecha_pago: formulario.fecha_pago,
        monto: parseFloat(formulario.monto),
        hora_pago: formulario.hora_pago,
        metodo_pago: formulario.metodo_pago,
        estado: formulario.estado,
      };

      const respuesta = await fetch(`https://sistema-de-electricidadd-production-f62b.up.railway.app/pagos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (respuesta.ok) {
        alert('Pago actualizado correctamente');
      } else {
        const errorData = await respuesta.json();
        alert('Error al actualizar el pago: ' + (errorData.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error de red al actualizar el pago');
    }
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">ACTUALIZAR PAGO</h1>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <input
          type="number"
          name="id_solicitud"
          placeholder="Solicitud"
          className="campo-cita"
          value={formulario.id_solicitud}
          onChange={handleChange}
        />

        <input
          type="number"
          name="factura_id"
          placeholder="Factura"
          className="campo-cita"
          value={formulario.factura_id}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha_pago"
          placeholder="Fecha"
          className="campo-cita"
          value={formulario.fecha_pago}
          onChange={handleChange}
        />
        <input
          type="time"
          name="hora_pago"
          placeholder="Hora"
          className="campo-cita"
          value={formulario.hora_pago}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="monto"
          placeholder="Monto"
          className="campo-cita"
          value={formulario.monto}
          onChange={handleChange}
        />
        <select
          name="metodo_pago"
          className="campo-cita"
          value={formulario.metodo_pago}
          onChange={handleChange}
        >
          <option value="">Método de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
        <select
          name="estado"
          className="campo-cita"
          value={formulario.estado}
          onChange={handleChange}
        >
          <option value="">Estado</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button type="submit" className="boton-cita">Actualizar Pago</button>
      </form>
    </div>
  );
};



export default ActualizarPago;  

