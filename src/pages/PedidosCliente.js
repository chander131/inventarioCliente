import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Query } from 'react-apollo';

import Pedido from '../componentes/Pedidos/Pedido';
import Cargando from '../componentes/Cargando';

import { OBTENER_PEDIDOS } from '../queries';

const PedidosCliente = props => {
    const { session } = props;
    const { id } = useParams();

    return (
        <>
            <h1 className="text-center mb-5">Pedidos Cliente</h1>

            <div className="row">
                <Query
                    query={OBTENER_PEDIDOS}
                    variables={{ cliente: id, vendedor: session.rol !== "ADMINISTRADOR" ? session?.id : null }}
                    pollInterval={500}
                >
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if (loading) return <Cargando />;
                        if (error) return `Error: ${error.message}`;

                        const pedidos = data.obtenerPedidos;

                        return pedidos.map(pedido => <Pedido key={pedido.id} pedido={pedido} cliente={id} />);
                    }}
                </Query>
            </div>
        </>
    )
}

PedidosCliente.propTypes = {

}

export default PedidosCliente;
