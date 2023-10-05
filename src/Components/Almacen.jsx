import React, { useState, useEffect } from 'react';

function Almacenes() {
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
      <h1 className="fadeInUp">Almacenes:</h1>
      <ul>
        {data.map((almacen) => (
          <li className='lista' key={almacen._id}>
            <div className="venta-details">
              <strong>Sede ID:</strong> {almacen.sede_id} <br />
              <strong>Productos:</strong>
              <select className="select-list">
                {almacen.productos.map((producto, index) => (
                  <option key={index}>{producto}</option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </header>
  </div>
  );
}

export default Almacenes;
