import React, { useState, useEffect } from 'react';

function Proveedores() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/proveedores")
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
          <h1>Proveedores:</h1>
          <button>Agregar</button>
          <ul>
            {data.map((proveedor) => (
              <li key={proveedor._id}>
                <strong>Nombre:</strong> {proveedor.nombre} <br />
                <strong>Dirección:</strong> {proveedor.direccion} <br />
                <strong>Teléfono:</strong> {proveedor.telefono} <br />
                <strong>Correo:</strong> {proveedor.correo} <br />
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
}

export default Proveedores;
