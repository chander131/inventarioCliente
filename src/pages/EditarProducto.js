import React from 'react';
import { useParams } from 'react-router-dom';
import { Query } from 'react-apollo';

import FormularioEditarProducto from '../componentes/Productos/FormularioEditarProducto';
import Cargando from '../componentes/Cargando';

import { PRODUCTO_QUERY } from '../queries';

const EditarProducto = ({ }) => {
    const { id } = useParams();



    return (
        <>
            <h1 className="text-center">Editar Producto</h1>
            <div className="row justify-content-center">
                <Query
                    query={PRODUCTO_QUERY}
                    variables={{ id }}
                >
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <Cargando />;
                        if (error) return `Error ${error.message}`;

                        return (
                            <FormularioEditarProducto
                                id={id}
                                producto={data.obtenerProducto}
                                refetch={refetch}
                            />
                        );
                    }}
                </Query>
            </div>
        </>
    );
};

export default EditarProducto;
