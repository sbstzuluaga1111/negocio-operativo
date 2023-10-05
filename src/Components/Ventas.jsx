import React, { useState, useEffect } from 'react';

function Ventas() {
    const [data, setData] = useState([]);
    const [nuevaVenta, setNuevaVenta] = useState({
        fecha: new Date().toISOString(),
        producto_id: '',
        cliente_id: '',
        empleado_id: '',
        almacen_id: '',
        cantidad: '',
        precio_unitario: '',
    });
    const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
    const [ventaEditando, setVentaEditando] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/ventas")
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

    const handleMostrarFormularioEdicion = (venta) => {
        setVentaEditando(venta);
        setMostrarFormularioAgregar(true);
    };

    const handleEditarVenta = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3001/ventas/${ventaEditando._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ventaEditando),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al editar la venta");
                }

                const nuevasVentas = data.map((venta) =>
                    venta._id === ventaEditando._id ? ventaEditando : venta
                );
                setData(nuevasVentas);

                setMostrarFormularioAgregar(false);
                setVentaEditando(null);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleEditarInputChange = (e) => {
        const { name, value } = e.target;
        setVentaEditando({ ...ventaEditando, [name]: value });
    };

    const handleCancelarEdicion = () => {
        setMostrarFormularioAgregar(false);
        setVentaEditando(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/ventas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaVenta),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar la venta");
                }
                return response.json();
            })
            .then((ventaAgregada) => {
                setData([...data, ventaAgregada]);

                setNuevaVenta({
                    fecha: new Date().toISOString(),
                    producto_id: '',
                    cliente_id: '',
                    empleado_id: '',
                    almacen_id: '',
                    cantidad: '',
                    precio_unitario: '',
                });

                setMostrarFormularioAgregar(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaVenta({ ...nuevaVenta, [name]: value });
    };

    const handleEliminarVenta = (ventaId) => {
        fetch(`http://localhost:3001/ventas/${ventaId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error("Error al eliminar la venta");
                }

                const nuevasVentas = data.filter((venta) => venta._id !== ventaId);
                setData(nuevasVentas);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="fadeInUp">Ventas:</h1>
                <button onClick={toggleFormulario}>
                    {!mostrarFormularioAgregar ? "Agregar Venta" : "Cancelar"}
                </button>

                {mostrarFormularioAgregar ? (
                    <form onSubmit={handleSubmit} className="formulario-agregar mostrar">
                        <div>
                            <label>Fecha:</label>
                            <input
                                type="datetime-local"
                                name="fecha"
                                value={nuevaVenta.fecha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Producto ID:</label>
                            <input
                                type="text"
                                name="producto_id"
                                value={nuevaVenta.producto_id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Cliente ID:</label>
                            <input
                                type="text"
                                name="cliente_id"
                                value={nuevaVenta.cliente_id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Empleado ID:</label>
                            <input
                                type="text"
                                name="empleado_id"
                                value={nuevaVenta.empleado_id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Almacén ID:</label>
                            <input
                                type="text"
                                name="almacen_id"
                                value={nuevaVenta.almacen_id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                name="cantidad"
                                value={nuevaVenta.cantidad}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Precio Unitario:</label>
                            <input
                                type="number"
                                name="precio_unitario"
                                value={nuevaVenta.precio_unitario}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Agregar</button>
                    </form>
                ) : null}

                <ul>
                    {data.map((venta) => (
                        <li key={venta._id}>
                        <div className="venta-details">
                            <strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()} <br />
                            <strong>Producto ID:</strong> {venta.producto_id} <br />
                            <strong>Cliente ID:</strong> {venta.cliente_id} <br />
                            <strong>Empleado ID:</strong> {venta.empleado_id} <br />
                            <strong>Almacén ID:</strong> {venta.almacen_id} <br />
                            <strong>Cantidad:</strong> {venta.cantidad} <br />
                            <strong>Precio Unitario:</strong> {venta.precio_unitario} <br />
                            <button className="eliminar-button" onClick={() => handleEliminarVenta(venta._id)}>Eliminar</button>
                            <button className="editar-button" onClick={() => handleMostrarFormularioEdicion(venta)}>Editar</button>
                        </div>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default Ventas;
