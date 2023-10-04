import React, { useState, useEffect } from 'react';

function Productos() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/productos")
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
          <h1>Productos:</h1>
          <button>Agregar</button>
          <ul>
            {data.map((producto) => (
              <li key={producto._id}>
                <strong>Nombre:</strong> {producto.nombre} <br />
                <strong>Descripción:</strong> {producto.descripcion} <br />
                <strong>Precio:</strong> {producto.precio} <br />
                <strong>Proveedor ID:</strong> {producto.proveedor_id} <br />
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
}

export default Productos;
