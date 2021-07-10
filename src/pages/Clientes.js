import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import Paginador from '../componentes/Paginador';
import Exito from '../componentes/Alertas/Exito';
import Cargando from '../componentes/Cargando';

import { CLIENTES_QUERY } from '../queries';
import { ELIMINAR_CLIENTE } from '../mutations';

const Clientes = ({ session: { obtenerUsuario } }) => {
	const [paginador, setPaginador] = useState({
		actual: 1,
		offset: 0,
	});
	const [state, setState] = useState({
		mostrar: false,
		mensaje: '',
	});
	const limite = 5;
	let id = (obtenerUsuario?.rol === "VENDEDOR") ? obtenerUsuario.id : "";

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

	const eliminarClienteDB = (eliminarCliente, id) => {
		if (window.confirm("¿Seguro que deceas eliminar este cliente?"))
			eliminarCliente({ variables: { id } })
	};

	return (
		<Query query={CLIENTES_QUERY} variables={{ limite, offset: paginador.offset, vendedor: id }} pollInterval={1000}>
			{({ loading, error, data, startPolling, stopPolling }) => {
				if (loading) return <Cargando />;
				if (error) return `Error: ${error.message}`;

				return (
					<>
						<h2 className="text-center">Listado Clientes</h2>
						{state.mostrar && (<Exito mensaje={state.mensaje} />)}
						<ul className="list-group mt-4">
							{data.getClientes.map((item) => (
								<li key={item.id} className="list-group-item">
									<div className="row justify-content-between align-items-center">
										<div className="col-md-6 d-flex justify-content-between align-items-center">
											{item.nombre} {item.apellido} - {item.empresa}
										</div>
										<div className="col-md-6 d-flex justify-content-end">
											<Link
												to={`pedidos/nuevo/${item.id}`}
												className="btn btn-warning d-block d-md-inline-block mr-2"
											>
												&#43; Nuevo Pedido
											</Link>
											<Link
												to={`pedidos/${item.id}`}
												className="btn btn-primary d-block d-md-inline-block mr-2"
											>
												Ver pedidos
											</Link>
											<Mutation
												mutation={ELIMINAR_CLIENTE}
												onCompleted={({ eliminarCliente }) => showMessageDelete(eliminarCliente)}
											>
												{(eliminarCliente) => (
													<button
														type="button"
														className="btn btn-danger d-block d-md-inline-block mr-2"
														onClick={() => eliminarClienteDB(eliminarCliente, item.id)}
													>
														&times; Eliminar
													</button>
												)}
											</Mutation>
											<Link
												to={`/cliente/editar/${item.id}`}
												className="btn btn-success d-block d-md-inline-block"
											>
												Editar Cliente
											</Link>
										</div>
									</div>
								</li>
							))}
						</ul>
						<Paginador
							actual={paginador.actual}
							total={data.totalClientes}
							limite={limite}
							paginaAnterior={paginaAnterior}
							paginaSiguiente={paginaSiguiente}
						/>
					</>
				);
			}}
		</Query>
	);
};

export default Clientes;
