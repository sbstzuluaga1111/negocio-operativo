import React, { useState, useEffect } from 'react';

function Clientes() {
  const [data, setData] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    pais: '',
    telefono: ''
  });
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

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

  const toggleFormulario = () => {
    setMostrarFormularioAgregar(!mostrarFormularioAgregar);
  };

  const handleMostrarFormularioEdicion = (cliente) => {
    setClienteEditando(cliente);
    setMostrarFormularioAgregar(true);
  };

  const handleEditarCliente = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/clientes/${clienteEditando._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteEditando),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al editar el cliente");
        }
        const nuevosClientes = data.map((cliente) =>
          cliente._id === clienteEditando._id ? clienteEditando : cliente
        );
        setData(nuevosClientes);
        setMostrarFormularioAgregar(false);
        setClienteEditando(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelarEdicion = () => {
    setMostrarFormularioAgregar(false);
    setClienteEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/clientes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoCliente),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el cliente");
        }
        return response.json();
      })
      .then((clienteAgregado) => {
        setData([...data, clienteAgregado]);

        setNuevoCliente({
          nombre: '',
          direccion: '',
          ciudad: '',
          pais: '',
          telefono: ''
        });

        setMostrarFormularioAgregar(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente({ ...nuevoCliente, [name]: value });
  };

  const handleEliminarCliente = (clienteId) => {
    fetch(`http://localhost:3001/clientes/${clienteId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Error al eliminar el cliente");
        }

        const nuevosClientes = data.filter((cliente) => cliente._id !== clienteId);
        setData(nuevosClientes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Clientes:</h1>
        <button onClick={toggleFormulario}>
          {!mostrarFormularioAgregar ? "Agregar Cliente" : "Cancelar"}
        </button>

        {mostrarFormularioAgregar ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={nuevoCliente.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={nuevoCliente.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Ciudad:</label>
              <input
                type="text"
                name="ciudad"
                value={nuevoCliente.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>País:</label>
              <input
                type="text"
                name="pais"
                value={nuevoCliente.pais}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={nuevoCliente.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Agregar</button>
          </form>
        ) : null}

        <ul>
          {data.map((cliente) => (
            <li key={cliente._id}>
              <strong>Nombre:</strong> {cliente.nombre} <br />
              <strong>Dirección:</strong> {cliente.direccion} <br />
              <strong>Ciudad:</strong> {cliente.ciudad} <br />
              <strong>País:</strong> {cliente.pais} <br />
              <strong>Teléfono:</strong> {cliente.telefono} <br />
              <button onClick={() => handleEliminarCliente(cliente._id)}>Eliminar</button>
              <button onClick={() => handleMostrarFormularioEdicion(cliente)}>Editar</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Clientes;
