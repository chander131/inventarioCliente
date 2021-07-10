import React from 'react';
import { Query } from 'react-apollo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Cargando from '../../componentes/Cargando';

import { TOP10_CLIENTES } from '../../queries';

const Clientes = () => {
    return (
        <Query
            query={TOP10_CLIENTES}
        >
            {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return <Cargando />;
                if (error) return `Error: ${error.message}`;

                const datos = data.topClientes.map(({ total, cliente: clientes }) => (
                    { total, cliente: `${clientes[0].nombre} ${clientes[0].apellido}`, ...clientes[0] }
                ));

                return (
                    <BarChart width={1000} height={350} data={datos}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="cliente" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#10a98b" />
                    </BarChart>
                );
            }}
        </Query>
    )
}

export default Clientes
