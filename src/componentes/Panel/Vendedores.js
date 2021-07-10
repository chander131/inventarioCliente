import React from 'react';
import { Query } from 'react-apollo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Cargando from '../../componentes/Cargando';

import { TOP10_VENDEDORES } from '../../queries';

const Vendedores = () => {
    return (
        <Query
            query={TOP10_VENDEDORES}
        >
            {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return <Cargando />;
                if (error) return `Error: ${error.message}`;

                const datos = data.topVendedores.map(({ total, vendedor: vendedores }) => (
                    { total, vendedor: `${vendedores[0].nombre}`, ...vendedores[0] }
                ));

                return (
                    <BarChart width={1000} height={350} data={datos}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="cliente" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#6148b9" />
                    </BarChart>
                );
            }}
        </Query>
    )
}

export default Vendedores;
