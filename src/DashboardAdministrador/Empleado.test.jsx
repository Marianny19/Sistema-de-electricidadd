import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Empleado from './Empleado';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => {
  global.fetch = jest.fn();
  window.alert = jest.fn();
  window.confirm = jest.fn(() => true);
  delete window.location;
  window.location = { reload: jest.fn() };
});

afterEach(() => {
  jest.clearAllMocks();
});

const empleadosMock = [
  {
    id_empleado: 1,
    nombre: 'Ana',
    apellido: 'Gómez',
    cedula: '00234567890',
    telefono: '8099876543',
    email: 'ana.gomez@example.com',
    cargo: 'Técnico',
    salario: 30000,
    fecha_ingreso: '2023-01-10',
    fecha_nacimiento: '1990-05-15',
    direccion: 'Calle 2, Ciudad',
    estado: 'activo'
  }
];

test('Empleado carga y elimina', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => empleadosMock
  });

  render(
    <MemoryRouter>
      <Empleado />
    </MemoryRouter>
  );

  expect(await screen.findByText('Ana')).toBeInTheDocument();

  fetch.mockResolvedValueOnce({ ok: true }); 
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [] 
  });

  const botonEliminar = screen.getByRole('button', { name: /eliminar/i });
  fireEvent.click(botonEliminar);

  await waitFor(() => {
    expect(screen.queryByText('Ana')).not.toBeInTheDocument();
  });
});
