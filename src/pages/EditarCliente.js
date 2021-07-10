import React, { useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import { Link, useParams } from 'react-router-dom';

import FormularioCliente from '../componentes/Clientes/FormularioCliente';
import Cargando from '../componentes/Cargando';

import { CLIENTE_QUERY } from '../queries';

const EditarCliente = () => {
	const { id } = useParams();

	return (
		<>
			<h2 className="text-center">Editar Cliente</h2>
			<Query query={CLIENTE_QUERY} variables={{ id }}>
				{({ loading, error, data, refetch }) => {
					if (loading) return <Cargando />;
					if (error) return `Error: ${error.message}`;

					return (
						<div className="row justify-content-center">
							<FormularioCliente cliente={data.getCliente} refetch={refetch} />
						</div>
					);
				}}
			</Query>
		</>
	);
};

export default EditarCliente;
