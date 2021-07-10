import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

import Cargando from '../Cargando';
import ResumenProducto from './ResumenProducto';

import { PRODUCTO_QUERY } from '../../queries';
import { ACTUALIZAR_PEDIDO } from '../../mutations';

import clasesEstado from '../../constants/clasesEstados';

import './Pedidos.css';

const Pedido = props => {
    const { pedido, cliente } = props;

    const actualizaPedidoDB = (schema) => (e) => {
        const input = {
            id: pedido.id,
            pedido: pedido.pedido,
            fecha: pedido.fecha,
            total: pedido.total,
            cliente,
            estado: e.target.value
        };

        schema({ variables: { input } })
    };

    return (
        <div className="col-md-4">
            <div className={`card mb-3 ${clasesEstado[pedido.estado] || ''}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                        <Mutation
                            mutation={ACTUALIZAR_PEDIDO}
                            onCompleted={(data) => console.log('Completado', data)}
                        >
                            {(actualizarPedido) => (
                                <select
                                    className="form-control my-3"
                                    value={pedido.estado}
                                    onChange={actualizaPedidoDB(actualizarPedido)}
                                >
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="COMPLETADO">COMPLETADO</option>
                                    <option value="CANCELADO">CANCELADO</option>
                                </select>
                            )}
                        </Mutation>
                    </p>
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id}</span>
                    </p>
                    <p className="card-text font-weight-bold">Fecha Pedido:
                        <span className="font-weight-normal"> {new Date(Number(pedido.fecha)).toLocaleString("es-SV")}</span>
                    </p>

                    <h3 className="card-text text-center resaltar-texto mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map(producto => (
                        <Query
                            key={producto.id}
                            query={PRODUCTO_QUERY}
                            variables={{ id: producto.id }}
                        >
                            {({ loading, error, data, startPolling, stopPolling }) => {
                                if (loading) return <Cargando />;
                                if (error) return `Error: ${error.message}`;

                                return (
                                    <ResumenProducto
                                        key={producto.id}
                                        producto={data.obtenerProducto}
                                        cantidad={producto.cantidad}
                                    />
                                );
                            }}
                        </Query>
                    ))}

                    <div className="d-flex align-items-center justify-content-end">
                        <p className="card-text resaltar-texto mr-1 bg-amarillo">Total:</p>
                        <p className="font-weight-normal inc-texto">$ {pedido.total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Pedido.propTypes = {

};

export default Pedido;
