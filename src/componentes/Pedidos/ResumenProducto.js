import React from 'react';
import PropTypes from 'prop-types';

const ResumenProducto = ({ producto = {}, cantidad = 0 }) => {
    return (
        <>
            <div className="contenedor-productos mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Nombre del Producto:
                    <span className="font-weight-normal"> {producto.nombre}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad:
                    <span className="font-weight-normal"> {cantidad}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Precio Unitario:
                    <span className="font-weight-normal"> ${producto.precio}</span>
                </p>
            </div>
        </>
    );
};

ResumenProducto.propTypes = {
    producto: PropTypes.object,
    cantidad: PropTypes.number,
};

export default ResumenProducto;
