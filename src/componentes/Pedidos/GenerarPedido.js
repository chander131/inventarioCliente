import React from 'react';
import { Mutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';

import { NUEVO_PEDIDO } from '../../mutations'

const GenerarPedido = ({ productos = [], total = 0, idCliente, idVendedor }) => {
    console.log(idVendedor);
    const history = useHistory();
    const guardarPedido = (schema) => (e) => {
        const productosInput = productos.map(({ nombre, precio, stock, ...objeto }) => objeto);
        const input = {
            pedido: productosInput,
            total: total,
            cliente: idCliente,
            vendedor: idVendedor,
        };

        schema({ variables: { input } });
    };
    return (
        <Mutation
            mutation={NUEVO_PEDIDO}
            onCompleted={() => history.push('/')}
        >
            {(nuevoPedido) => (
                <button
                    type="button"
                    className="btn btn-warning mt-4"
                    disabled={productos.length == 0 || total <= 0}
                    onClick={guardarPedido(nuevoPedido)}
                >
                    Generar Pedido
                </button>

            )}
        </Mutation>
    )
};

export default GenerarPedido;
