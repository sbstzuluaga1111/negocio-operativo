import React, { useState, useEffect } from 'react';

function Productos() {
    const [data, setData] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
    });
    const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/productos")
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

    const handleMostrarFormularioEdicion = (producto) => {
        setProductoEditando(producto);
        setMostrarFormularioAgregar(true);
    };

    const handleEditarProducto = (e) => {
        e.preventDefault();

        // Eliminamos el campo "Proveedor ID" del objeto a enviar
        const { proveedor_id, ...datosActualizados } = productoEditando;

        // Realizar una solicitud PUT para editar el producto
        fetch(`http://localhost:3001/productos/${productoEditando._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosActualizados),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al editar el producto");
                }
                // Actualiza la lista de productos excluyendo el producto editado
                const nuevosProductos = data.map((producto) =>
                    producto._id === productoEditando._id ? productoEditando : producto
                );
                setData(nuevosProductos);
                // Oculta el formulario de edición
                setMostrarFormularioAgregar(false);
                setProductoEditando(null);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleEditarInputChange = (e) => {
        const { name, value } = e.target;
        setProductoEditando({ ...productoEditando, [name]: value });
    };

    const handleCancelarEdicion = () => {
        setMostrarFormularioAgregar(false);
        setProductoEditando(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Eliminamos el campo "Proveedor ID" del objeto a enviar
        const { proveedor_id, ...nuevoProductoSinProveedor } = nuevoProducto;

        // Realizar una solicitud POST para agregar un nuevo producto
        fetch("http://localhost:3001/productos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProductoSinProveedor),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar el producto");
                }
                return response.json();
            })
            .then((productoAgregado) => {
                // Actualiza la lista de productos con el nuevo producto
                setData([...data, productoAgregado]);

                // Limpia el formulario
                setNuevoProducto({
                    nombre: '',
                    descripcion: '',
                    precio: '',
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
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const handleEliminarProducto = (productoId) => {
        // Realizar una solicitud DELETE para eliminar el producto
        fetch(`http://localhost:3001/productos/${productoId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error("Error al eliminar el producto");
                }

                const nuevosProductos = data.filter((producto) => producto._id !== productoId);
                setData(nuevosProductos);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Productos:</h1>
                <button onClick={toggleFormulario}>
                    {!mostrarFormularioAgregar ? "Agregar Producto" : "Cancelar"}
                </button>

                {mostrarFormularioAgregar ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={nuevoProducto.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Descripción:</label>
                            <input
                                type="text"
                                name="descripcion"
                                value={nuevoProducto.descripcion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Precio:</label>
                            <input
                                type="number"
                                name="precio"
                                value={nuevoProducto.precio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Agregar</button>
                    </form>
                ) : null}

                <ul>
                    {data.map((producto) => (
                        <li key={producto._id}>
                            <strong>Nombre:</strong> {producto.nombre} <br />
                            <strong>Descripción:</strong> {producto.descripcion} <br />
                            <strong>Precio:</strong> {producto.precio} <br />
                            <button onClick={() => handleEliminarProducto(producto._id)}>Eliminar</button>
                            <button onClick={() => handleMostrarFormularioEdicion(producto)}>Editar</button>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default Productos;
