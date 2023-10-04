import React, { useState, useEffect } from 'react';

function Clientes() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/clientes")
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
          <h1>Clientes:</h1>
          <button>Agregar</button>
          <ul>
            {data.map((cliente) => (
              <li key={cliente._id}>
                <strong>Nombre:</strong> {cliente.nombre} <br />
                <strong>Dirección:</strong> {cliente.direccion} <br />
                <strong>Ciudad:</strong> {cliente.ciudad} <br />
                <strong>País:</strong> {cliente.pais} <br />
                <strong>Teléfono:</strong> {cliente.telefono} <br />
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
}

export default Clientes;
