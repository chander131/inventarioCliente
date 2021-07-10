import React from 'react';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom';

import DatosCliente from '../componentes/Pedidos/DatosCliente';
import ContenidoPedido from '../componentes/Pedidos/ContenidoPedido';
import Cargando from '../componentes/Cargando';

import { PRODUCTOS_QUERY } from '../queries'

const NuevoPedido = ({ session }) => {
    const { id } = useParams();

    return (
        <>
            <h1 className="text-center mb-5">Nuevo Pedido</h1>

            <div className="row">
                <div className="col-md-3">
                    <DatosCliente id={id} />
                </div>

                <div className="col-md-9">
                    <Query
                        query={PRODUCTOS_QUERY}
                        variables={{ stock: true }}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <Cargando />;


                            if (error) return `Error ${error.message}`;

                            return (
                                <ContenidoPedido productos={data.obtenerProductos} id={id} vendedor={session.id} />
                            );
                        }}
                    </Query>
                </div>
            </div>
        </>
    )
}

export default NuevoPedido;
