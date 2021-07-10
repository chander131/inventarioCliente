import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import Paginador from '../componentes/Paginador';
import Exito from '../componentes/Alertas/Exito';
import Cargando from '../componentes/Cargando';

import { ELIMINAR_PRODUCTO } from '../mutations';
import { PRODUCTOS_QUERY } from '../queries';

const Productos = ({ }) => {
    const [paginador, setPaginador] = useState({
        actual: 1,
        offset: 0,
    });
    const [state, setState] = useState({
        mostrar: false,
        mensaje: '',
    });
    const limite = 5;

    const paginaAnterior = () => {
        setPaginador({
            actual: paginador.actual - 1,
            offset: paginador.offset - limite
        })

    };

    const paginaSiguiente = () => {
        setPaginador({
            actual: paginador.actual + 1,
            offset: paginador.offset + limite
        })
    };

    const showMessageDelete = (message) => {
        setState({ ...state, mensaje: message, mostrar: true });
        setTimeout(() => {
            setState({ ...state, mensaje: '', mostrar: false })
        }, 3000);
    };

    const eliminarProductoDB = (eliminarProducto, id) => {
        if (window.confirm("¿Seguro que deceas eliminar este producto?"))
            eliminarProducto({ variables: { id } })
    };

    return (
        <>
            <h1 className="text-center mb-5" >Productos</h1>
            {state.mostrar && (<Exito mensaje={state.mensaje} />)}
            <Query query={PRODUCTOS_QUERY} variables={{ limite, offset: paginador.offset }} pollInterval={1000}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return <Cargando />;
                    if (error) return `Error: ${error.message}`;

                    return (
                        <>
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Existencia</th>
                                        <th scope="col">Eliminar</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.obtenerProductos.map((item) => {
                                        const clase = `
                                            bg-${item.stock == 0 ? 'danger' : (item.stock > 50 && item.stock < 100) && 'warning'}
                                            text-light
                                        `;

                                        return (
                                            <tr key={item.id}>
                                                <td>{item.nombre}</td>
                                                <td>{item.precio}</td>
                                                <td className={item.stock < 100 && clase}>{item.stock}</td>
                                                <td>
                                                    <Mutation
                                                        mutation={ELIMINAR_PRODUCTO}
                                                        onCompleted={({ eliminarProducto }) => showMessageDelete(eliminarProducto)}
                                                    >
                                                        {(eliminarProducto) => (
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => eliminarProductoDB(eliminarProducto, item.id)}
                                                            >&times; Eliminar
                                                            </button>
                                                        )}
                                                    </Mutation>
                                                </td>
                                                <td>
                                                    <Link to={`/producto/editar/${item.id}`} className="btn btn-success">
                                                        Editar Producto
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Paginador
                                actual={paginador.actual}
                                total={data.totalProductos}
                                limite={limite}
                                paginaAnterior={paginaAnterior}
                                paginaSiguiente={paginaSiguiente}
                            />
                        </>
                    );
                }}
            </Query>
        </>
    );
};

export default Productos;
