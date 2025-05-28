import React from 'react';
import { render, screen } from '@testing-library/react';
import CrearCliente from './CrearCliente';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

beforeAll(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
  })();
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
  });
});

describe('CrearCliente', () => {
  beforeEach(() => {
    localStorage.setItem('email', 'test@correo.com');
  });

  test('muestra campos del formulario', () => {
    render(
      <MemoryRouter>
        <CrearCliente />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  });
});
