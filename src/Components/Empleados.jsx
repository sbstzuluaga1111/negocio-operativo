import React, { useState, useEffect } from 'react';

function Empleados() {
  const [data, setData] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    apellido: '', // Campo de texto simple
    direccion: '', // Campo de texto simple
    puesto: '',
    salario: '',
  });
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

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

  const toggleFormulario = () => {
    setMostrarFormularioAgregar(!mostrarFormularioAgregar);
  };

  const handleMostrarFormularioEdicion = (empleado) => {
    setEmpleadoEditando(empleado);
    setMostrarFormularioAgregar(true);
  };

  const handleEditarEmpleado = (e) => {
    e.preventDefault();
    // Realizar una solicitud PUT para editar el empleado
    fetch(`http://localhost:3001/empleados/${empleadoEditando._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoEditando),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al editar el empleado");
        }
        // Actualiza la lista de empleados excluyendo el empleado editado
        const nuevosEmpleados = data.map((empleado) =>
          empleado._id === empleadoEditando._id ? empleadoEditando : empleado
        );
        setData(nuevosEmpleados);
        // Oculta el formulario de edición
        setMostrarFormularioAgregar(false);
        setEmpleadoEditando(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditarInputChange = (e) => {
    const { name, value } = e.target;
    setEmpleadoEditando({ ...empleadoEditando, [name]: value });
  };

  const handleCancelarEdicion = () => {
    setMostrarFormularioAgregar(false);
    setEmpleadoEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo objeto con los campos requeridos
    const nuevoEmpleadoConCamposRequeridos = {
      nombre: nuevoEmpleado.nombre,
      apellido: nuevoEmpleado.apellido, // Campo de texto simple
      direccion: nuevoEmpleado.direccion, // Campo de texto simple
      puesto: nuevoEmpleado.puesto,
      salario: nuevoEmpleado.salario,
    };

    // Realizar una solicitud POST para agregar un nuevo empleado
    fetch("http://localhost:3001/empleados", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoEmpleadoConCamposRequeridos),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el empleado");
        }
        return response.json();
      })
      .then((empleadoAgregado) => {
        // Actualiza la lista de empleados con el nuevo empleado
        setData([...data, empleadoAgregado]);

        // Limpia el formulario
        setNuevoEmpleado({
          nombre: '',
          apellido: '', // Campo de texto simple
          direccion: '', // Campo de texto simple
          puesto: '',
          salario: '',
        });

        // Oculta el formulario después de agregar
        setMostrarFormularioAgregar(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado({ ...nuevoEmpleado, [name]: value });
  };

  const handleEliminarEmpleado = (empleadoId) => {
    // Realizar una solicitud DELETE para eliminar el empleado
    fetch(`http://localhost:3001/empleados/${empleadoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Error al eliminar el empleado");
        }

        const nuevosEmpleados = data.filter((empleado) => empleado._id !== empleadoId);
        setData(nuevosEmpleados);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Empleados:</h1>
        <button onClick={toggleFormulario}>
          {!mostrarFormularioAgregar ? "Agregar Empleado" : "Cancelar"}
        </button>

        {mostrarFormularioAgregar ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={nuevoEmpleado.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={nuevoEmpleado.apellido} // Campo de texto simple
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={nuevoEmpleado.direccion} // Campo de texto simple
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Puesto:</label>
              <input
                type="text"
                name="puesto"
                value={nuevoEmpleado.puesto}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Salario:</label>
              <input
                type="number"
                name="salario"
                value={nuevoEmpleado.salario}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Agregar</button>
          </form>
        ) : null}

        <ul>
          {data.map((empleado) => (
            <li key={empleado._id}>
              <strong>Nombre:</strong> {empleado.nombre} <br />
              <strong>Apellido:</strong> {empleado.apellido} <br /> {/* Campo de texto simple */}
              <strong>Dirección:</strong> {empleado.direccion} <br /> {/* Campo de texto simple */}
              <strong>Puesto:</strong> {empleado.puesto} <br />
              <strong>Salario:</strong> {empleado.salario} <br />
              <button onClick={() => handleEliminarEmpleado(empleado._id)}>Eliminar</button>
              <button onClick={() => handleMostrarFormularioEdicion(empleado)}>Editar</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Empleados;
