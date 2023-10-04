import React, { useState, useEffect } from 'react';

function Almacen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/almacen")
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
        <h1>Almacenes:</h1>
        <button>Agregar</button>
        <ul>
          {data.map((almacen) => (
            <li key={almacen._id}>
              <strong>Sede ID:</strong> {almacen.sede_id} <br />
              <strong>Productos:</strong> {almacen.productos.join(', ')} <br />
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Almacen;
