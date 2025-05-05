import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faHome, faUsers, faUser, faCalendar,
    faFileInvoice, faFileInvoiceDollar, faMoneyCheck,
    faClipboard, faCartArrowDown, faSignOut, faChevronLeft, faSearch
} from '@fortawesome/free-solid-svg-icons';
import './index.css';

const FacturaForm = () => {
  return (
    <div className="factura-container">
      <h1 className="factura-title">Factura</h1>
      <div className="factura-details">
        <div className="factura-item">
          <label className="factura-label">Cliente:</label>
          <input type="text" className="factura-input" placeholder="Nombre del cliente" />
        </div>
        <div className="factura-item">
          <label className="factura-label">Fecha:</label>
          <input type="date" className="factura-input" />
        </div>
        <div className="factura-item">
          <label className="factura-label">Hora:</label>
          <input type="time" className="factura-input" />
        </div>
        <div className="factura-item">
          <label className="factura-label">Monto:</label>
          <input type="number" className="factura-input" placeholder="Monto total" />
        </div>
      </div>
      <button className="factura-button">Generar Factura</button>
    </div>
  );
};

export default FacturaForm;