import React, { useState, useEffect } from 'react';

function Compras() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/compras")
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
          <h1>Compras:</h1>
          <button>Agregar</button>
          <ul>
            {data.map((compra) => (
              <li key={compra._id}>
                <strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()} <br />
                <strong>Producto:</strong> {compra.producto_id} <br />
                <strong>Proveedor:</strong> {compra.proveedor_id} <br />
                <strong>Sede:</strong> {compra.sede_id} <br />
                <strong>Almacen:</strong> {compra.almacen_id} <br />
                <strong>Cantidad:</strong> {compra.cantidad} <br />
                <strong>Precio Unitario:</strong> {compra.precio_unitario} <br />
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
}

export default Compras;
