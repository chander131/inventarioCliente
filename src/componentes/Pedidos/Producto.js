import React from 'react'

const Producto = ({ id, producto, index, actualizarCantidad, eliminarProducto }) => {
    return (
        <>
            <tr>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                    <input
                        type="number"
                        className="form-control"
                        min="1"
                        max={producto.stock}
                        onChange={(e) => {
                            if (e.target.value > producto.stock) e.target.value = producto.stock;
                            actualizarCantidad(e.target.value, index);
                        }}
                        value={producto.cantidad}
                    />
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger font-weight-bold"
                        onClick={() => eliminarProducto(id)}
                    >
                        &times; Eliminar
                    </button>
                </td>
            </tr>
        </>
    )
}

export default Producto;
