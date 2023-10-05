import React, { useState, useEffect } from 'react';

function Sedes() {
  const [data, setData] = useState([]);
  const [nuevaSede, setNuevaSede] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    pais: '',
    telefono: '',
    almacen: {
      nombre: '',
      ubicacion: ''
    },
    proveedores: [],
    empleados: []
  });
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
  const [sedeEditando, setSedeEditando] = useState(null);
  
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

  const toggleFormulario = () => {
    setMostrarFormularioAgregar(!mostrarFormularioAgregar);
  };

  const handleMostrarFormularioEdicion = (sede) => {
    setSedeEditando(sede);
    setMostrarFormularioAgregar(true);
  };
  
  const handleEditarSede = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/sedes/${sedeEditando._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sedeEditando),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al editar la sede");
        }
        const nuevasSedes = data.map((sede) =>
          sede._id === sedeEditando._id ? sedeEditando : sede
        );
        setData(nuevasSedes);
        setMostrarFormularioAgregar(false);
        setSedeEditando(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleEditarInputChange = (e) => {
    const { name, value } = e.target;
    setSedeEditando({ ...sedeEditando, [name]: value });
  };
  
  const handleCancelarEdicion = () => {
    setMostrarFormularioAgregar(false);
    setSedeEditando(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/sedes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaSede),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar la sede");
        }
        return response.json();
      })
      .then((sedeAgregada) => {
        setData([...data, sedeAgregada]);

        setNuevaSede({
          nombre: '',
          direccion: '',
          ciudad: '',
          pais: '',
          telefono: '',
          almacen: {
            nombre: '',
            ubicacion: ''
          },
          proveedores: [],
          empleados: []
        });

        setMostrarFormularioAgregar(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaSede({ ...nuevaSede, [name]: value });
  };

  const handleEliminarSede = (sedeId) => {
    fetch(`http://localhost:3001/sedes/${sedeId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Error al eliminar la sede");
        }

        const nuevasSedes = data.filter((sede) => sede._id !== sedeId);
        setData(nuevasSedes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
    <header className="App-header">
      <h1 className="fadeInUp">Sedes:</h1>
      <button onClick={toggleFormulario}>
        {!mostrarFormularioAgregar ? "Agregar Sede" : "Cancelar"}
      </button>
  
      {mostrarFormularioAgregar ? (
  <form onSubmit={handleSubmit} className="formulario-agregar mostrar">
    <div>
      <label>Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={nuevaSede.nombre}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Dirección:</label>
      <input
        type="text"
        name="direccion"
        value={nuevaSede.direccion}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Ciudad:</label>
      <input
        type="text"
        name="ciudad"
        value={nuevaSede.ciudad}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>País:</label>
      <input
        type="text"
        name="pais"
        value={nuevaSede.pais}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Teléfono:</label>
      <input
        type="text"
        name="telefono"
        value={nuevaSede.telefono}
        onChange={handleChange}
        required
      />
    </div>
    <button type="submit">Agregar</button>
  </form>
) : null}

  
      <ul>
        {data.map((sede) => (
          <li  key={sede._id}>
            <div className="venta-details">
            <strong>Nombre:</strong> {sede.nombre} <br />
            <strong>Dirección:</strong> {sede.direccion} <br />
            <strong>Ciudad:</strong> {sede.ciudad} <br />
            <strong>País:</strong> {sede.pais} <br />
            <strong>Teléfono:</strong> {sede.telefono}
            <br />
            <button className="eliminar-button" onClick={() => handleEliminarSede(sede._id)}>Eliminar</button>
            <button className="editar-button" onClick={() => handleMostrarFormularioEdicion(sede)}>Editar</button>
            </div>
          </li>
        ))}
      </ul>
    </header>
  </div>
  
  );
}

export default Sedes;
