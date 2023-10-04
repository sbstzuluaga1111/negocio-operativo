import React, { useState, useEffect } from 'react';

function Ventas() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/ventas")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos de la API");
          }
          return response.json();
        })
        .then((responseData) => {
          setData(responseData);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Ventas:</h1>
          <button>Agregar</button>
          <ul>
            {data.map((venta) => (
              <li key={venta._id}>
                <strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()} <br />
                <strong>Producto:</strong> {venta.producto_id} <br />
                <strong>Cliente:</strong> {venta.cliente_id} <br />
                <strong>Empleado:</strong> {venta.empleado_id} <br />
                <strong>Almacén:</strong> {venta.almacen_id} <br />
                <strong>Cantidad:</strong> {venta.cantidad} <br />
                <strong>Precio Unitario:</strong> {venta.precio_unitario} <br />
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
}

export default Ventas;
