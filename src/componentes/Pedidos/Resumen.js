import React from 'react';

import Producto from './Producto';

const Resumen = ({ productos = [], actualizarCantidad, eliminarProducto }) => {
    return (
        <>
            {productos.length > 0 && (
                <>
                    <h2 className="text-center my-5">Resumen y Cantidades</h2>

                    <table className="table">
                        <thead className="bg-success text-light">
                            <tr className="font-weight-bold">
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Inventario</th>
                                <th>Cantidad</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productos.map((pro, i) => (
                                <Producto
                                    key={pro.id}
                                    id={pro.id}
                                    index={i}
                                    producto={pro}
                                    actualizarCantidad={actualizarCantidad}
                                    eliminarProducto={eliminarProducto}
                                />
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default Resumen;
