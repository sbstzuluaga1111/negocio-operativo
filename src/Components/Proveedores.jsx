import React, { useState, useEffect } from 'react';

function Proveedores() {
    const [data, setData] = useState([]);
    const [nuevoProveedor, setNuevoProveedor] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
    });
    const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
    const [proveedorEditando, setProveedorEditando] = useState(null);

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

    const toggleFormulario = () => {
        setMostrarFormularioAgregar(!mostrarFormularioAgregar);
    };

    const handleMostrarFormularioEdicion = (proveedor) => {
        setProveedorEditando(proveedor);
        setMostrarFormularioAgregar(true);
    };

    const handleEditarProveedor = (e) => {
        e.preventDefault();

        // Realizar una solicitud PUT para editar el proveedor
        fetch(`http://localhost:3001/proveedores/${proveedorEditando._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proveedorEditando),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al editar el proveedor");
                }
                // Actualiza la lista de proveedores excluyendo el proveedor editado
                const nuevosProveedores = data.map((proveedor) =>
                    proveedor._id === proveedorEditando._id ? proveedorEditando : proveedor
                );
                setData(nuevosProveedores);
                // Oculta el formulario de edición
                setMostrarFormularioAgregar(false);
                setProveedorEditando(null);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleEditarInputChange = (e) => {
        const { name, value } = e.target;
        setProveedorEditando({ ...proveedorEditando, [name]: value });
    };

    const handleCancelarEdicion = () => {
        setMostrarFormularioAgregar(false);
        setProveedorEditando(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Realizar una solicitud POST para agregar un nuevo proveedor
        fetch("http://localhost:3001/proveedores", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProveedor),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar el proveedor");
                }
                return response.json();
            })
            .then((proveedorAgregado) => {
                // Actualiza la lista de proveedores con el nuevo proveedor
                setData([...data, proveedorAgregado]);

                // Limpia el formulario
                setNuevoProveedor({
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    correo: '',
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
        setNuevoProveedor({ ...nuevoProveedor, [name]: value });
    };

    const handleEliminarProveedor = (proveedorId) => {
        // Realizar una solicitud DELETE para eliminar el proveedor
        fetch(`http://localhost:3001/proveedores/${proveedorId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error("Error al eliminar el proveedor");
                }

                const nuevosProveedores = data.filter((proveedor) => proveedor._id !== proveedorId);
                setData(nuevosProveedores);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Proveedores:</h1>
                <button onClick={toggleFormulario}>
                    {!mostrarFormularioAgregar ? "Agregar Proveedor" : "Cancelar"}
                </button>

                {mostrarFormularioAgregar ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={nuevoProveedor.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Dirección:</label>
                            <input
                                type="text"
                                name="direccion"
                                value={nuevoProveedor.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                name="telefono"
                                value={nuevoProveedor.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Correo:</label>
                            <input
                                type="email"
                                name="correo"
                                value={nuevoProveedor.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Agregar</button>
                    </form>
                ) : null}

                <ul>
                    {data.map((proveedor) => (
                        <li key={proveedor._id}>
                            <strong>Nombre:</strong> {proveedor.nombre} <br />
                            <strong>Dirección:</strong> {proveedor.direccion} <br />
                            <strong>Teléfono:</strong> {proveedor.telefono} <br />
                            <strong>Correo:</strong> {proveedor.correo} <br />
                            <button onClick={() => handleEliminarProveedor(proveedor._id)}>Eliminar</button>
                            <button onClick={() => handleMostrarFormularioEdicion(proveedor)}>Editar</button>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default Proveedores;
