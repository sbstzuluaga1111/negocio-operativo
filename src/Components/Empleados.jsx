import React, { useState, useEffect } from 'react';

function Empleados() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/empleados")
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
          <h1>Empleados:</h1>
          <button>Agregar</button>
          <ul>
            {data.map((empleado) => (
              <li key={empleado._id}>
                <strong>Nombre:</strong> {empleado.nombre} <br />
                <strong>Puesto:</strong> {empleado.puesto} <br />
                <strong>Salario:</strong> {empleado.salario} <br />
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
}

export default Empleados;
