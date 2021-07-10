import React, { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import GenerarPedido from './GenerarPedido';
import Resumen from './Resumen';
import Error from '../Alertas/Error';

const animatedComponents = makeAnimated();

const ContenidoPedido = (props) => {
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    const updateTotal = () => {
        let nuevoTotal = 0;

        if (productos.length == 0) {
            setTotal(0);
            return;
        }

        productos.map(({ cantidad, precio }) => {
            if (cantidad) nuevoTotal += (cantidad * precio);
        });
        setTotal(nuevoTotal);
    };

    const handleProducts = (products) => {
        setProductos(products);
    };

    const actualizarCantidad = (cantidad, index) => {
        const productosOld = [...productos];

        productosOld[index].cantidad = Number(cantidad);
        const newArray = [...productosOld];

        setProductos(newArray);
        updateTotal();
    };

    const eliminarProducto = (id) => {
        const productosOld = productos;
        const productosRestantes = productosOld.filter(pro => pro.id !== id);

        setProductos(productosRestantes);
        updateTotal();
    };

    useEffect(() => {
        updateTotal();
    }, [productos.length])

    return (
        <>
            <h2 className="text-center mb-5">Seleccionar Artículos</h2>
            {total < 0 && <Error error="Las cantidades no pueden ser negativas" />}
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={props.productos}
                components={animatedComponents}
                placeholder='Seleccionar Productos'
                getOptionValue={(options) => options.id}
                getOptionLabel={(options) => options.nombre}
                onChange={handleProducts}
                value={productos}
            />

            <Resumen productos={productos} actualizarCantidad={actualizarCantidad} eliminarProducto={eliminarProducto} />
            <p className="font-weight-bold float-right mt-3">
                Total:
                <span className="font-weight-normal">
                    ${total}
                </span>
            </p>


            <GenerarPedido total={total} productos={productos} idCliente={props.id} idVendedor={props.vendedor} />
        </>
    );
};

export default ContenidoPedido;
