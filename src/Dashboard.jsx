import React from "react";


const Dashboard = () => {
    return (
            <div className="dashboard">
        <div className="dashboard-menu">
            <h2>Menu</h2>
            <ul>
                <li>Inicio</li>
                <li>Clientes</li>
                <li>Facturas</li>
                <li>Pagos</li>
                <li>Cotización</li>
            </ul>
        </div>
        <h1>Dashboard</h1>
        <div className="dashboard-content">
            <h2>Bienvenido al sistema de gestión de electricidad</h2>
           </div>
        </div>
    )
}
export default Dashboard;