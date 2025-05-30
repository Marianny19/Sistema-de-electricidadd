import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";  
import { BrowserRouter } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Dashboard - botón cerrar sesión", () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, "clear").mockImplementation(() => {});
    mockedNavigate.mockClear();
  });

  afterEach(() => {
    window.localStorage.clear.mockRestore();
  });

  test("botón cerrar sesión limpia storage y navega a /iniciarsesion", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const boton = screen.getByRole("button", { name: /cerrar sesión/i });

    fireEvent.click(boton);

    expect(window.localStorage.clear).toHaveBeenCalled();

    expect(mockedNavigate).toHaveBeenCalledWith("/iniciarsesion", { replace: true });
  });
});
