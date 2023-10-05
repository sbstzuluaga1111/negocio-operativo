import React, { useState, useEffect } from 'react';

function Compras() {
  const [data, setData] = useState([]);
  const [nuevaCompra, setNuevaCompra] = useState({
    fecha: '',
    producto: '',
    proveedor: '',
    sede: '',
    almacen: '',
    cantidad: '',
    precio_unitario: ''
  });
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
  const [compraEditando, setCompraEditando] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/compras")
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

  const handleMostrarFormularioEdicion = (compra) => {
    setCompraEditando(compra);
    setMostrarFormularioAgregar(true);
  };

  const handleEditarCompra = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/compras/${compraEditando._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compraEditando),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al editar la compra");
        }
        const nuevasCompras = data.map((compra) =>
          compra._id === compraEditando._id ? compraEditando : compra
        );
        setData(nuevasCompras);
        setMostrarFormularioAgregar(false);
        setCompraEditando(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditarInputChange = (e) => {
    const { name, value } = e.target;
    setCompraEditando({ ...compraEditando, [name]: value });
  };

  const handleCancelarEdicion = () => {
    setMostrarFormularioAgregar(false);
    setCompraEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/compras", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaCompra),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar la compra");
        }
        return response.json();
      })
      .then((compraAgregada) => {
        setData([...data, compraAgregada]);

        setNuevaCompra({
          fecha: '',
          producto: '',
          proveedor: '',
          sede: '',
          almacen: '',
          cantidad: '',
          precio_unitario: ''
        });

        setMostrarFormularioAgregar(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCompra({ ...nuevaCompra, [name]: value });
  };

  const handleEliminarCompra = (compraId) => {
    fetch(`http://localhost:3001/compras/${compraId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Error al eliminar la compra");
        }

        const nuevasCompras = data.filter((compra) => compra._id !== compraId);
        setData(nuevasCompras);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="fadeInUp">Compras:</h1>
        <button onClick={toggleFormulario}>
          {!mostrarFormularioAgregar ? "Agregar Compra" : "Cancelar"}
        </button>

        {mostrarFormularioAgregar ? (
          <form onSubmit={handleSubmit} className="formulario-agregar mostrar">
            <div>
              <label>Fecha:</label>
              <input
                type="text"
                name="fecha"
                value={nuevaCompra.fecha}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Producto:</label>
              <input
                type="text"
                name="producto"
                value={nuevaCompra.producto}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Proveedor:</label>
              <input
                type="text"
                name="proveedor"
                value={nuevaCompra.proveedor}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Sede:</label>
              <input
                type="text"
                name="sede"
                value={nuevaCompra.sede}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Almacén:</label>
              <input
                type="text"
                name="almacen"
                value={nuevaCompra.almacen}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Cantidad:</label>
              <input
                type="text"
                name="cantidad"
                value={nuevaCompra.cantidad}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Precio Unitario:</label>
              <input
                type="text"
                name="precio_unitario"
                value={nuevaCompra.precio_unitario}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Agregar</button>
          </form>
        ) : null}

        <ul>
          {data.map((compra) => (
            <li key={compra._id}>
              <div className="venta-details">
              <strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()} <br />
              <strong>Producto:</strong> {compra.producto} <br />
              <strong>Proveedor:</strong> {compra.proveedor} <br />
              <strong>Sede:</strong> {compra.sede} <br />
              <strong>Almacén:</strong> {compra.almacen} <br />
              <strong>Cantidad:</strong> {compra.cantidad} <br />
              <strong>Precio Unitario:</strong> {compra.precio_unitario} <br />
              <button className="eliminar-button" onClick={() => handleEliminarCompra(compra._id)}>Eliminar</button>
              <button className="editar-button" onClick={() => handleMostrarFormularioEdicion(compra)}>Editar</button>
              </div>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Compras;
