import React, { useState, useEffect } from 'react';

function Proveedores() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/sedes")
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
          <h1>Sedes:</h1>
          <ul>
            {data.map((sede) => (
              <li key={sede._id}>
                <strong>Nombre:</strong> {sede.nombre} <br />
                <strong>Dirección:</strong> {sede.direccion} <br />
                <strong>Ciudad:</strong> {sede.ciudad} <br />
                <strong>País:</strong> {sede.pais} <br />
                <strong>Teléfono:</strong> {sede.telefono}
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }

export default Proveedores;