import React, { useState, useEffect } from 'react';

function Almacenes() {
  const [data, setData] = useState([]);
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);

  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de almacenes
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

  const toggleFormulario = () => {
    setMostrarFormularioAgregar(!mostrarFormularioAgregar);
  };

  const handleEliminarAlmacen = (almacenId) => {
    // Realizar una solicitud DELETE para eliminar el almacen
    fetch(`http://localhost:3001/almacen/${almacenId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Error al eliminar el almacen");
        }

        const nuevosAlmacenes = data.filter((almacen) => almacen._id !== almacenId);
        setData(nuevosAlmacenes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Almacenes:</h1>
       

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

export default Almacenes;
