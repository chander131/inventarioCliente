import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Importar componentes
import Header from './componentes/Layout/Header';
import Clientes from './pages/Clientes';
import NuevoCliente from './pages/NuevoCliente';
import EditarCliente from './pages/EditarCliente';

import Productos from './pages/Productos';
import NuevoProducto from './pages/NuevoProducto';
import EditarProducto from './pages/EditarProducto';

import NuevoPedido from './pages/NuevoPedido';
import PedidosCliente from './pages/PedidosCliente';

import Panel from './pages/Panel';

import Registro from './pages/Registro';
import Login from './pages/Login';

import Session from './componentes/Session';

const App = ({ refetch, session }) => {
	const { obtenerUsuario } = session;

	const message = (obtenerUsuario) ? `Bienvenido ${obtenerUsuario.nombre}` : <Redirect to="/login" />;

	return (
		<Router>
			<Header isLogin={obtenerUsuario} />
			<div className="container">
				<p className="text-right">{message}</p>
				<Switch>
					<Route exact path="/" render={() => <Clientes session={session} />} />
					<Route exact path="/cliente/nuevo" render={() => <NuevoCliente session={session} />} />
					<Route
						exact
						path="/cliente/editar/:id"
						component={EditarCliente}
					/>

					<Route exact path="/productos" component={Productos} />
					<Route exact path="/producto/nuevo" component={NuevoProducto} />
					<Route
						exact
						path="/producto/editar/:id"
						component={EditarProducto}
					/>
					<Route exact path="/pedidos/nuevo/:id" render={() => <NuevoPedido session={obtenerUsuario} />} />
					<Route exact path="/pedidos/:id" render={() => <PedidosCliente session={obtenerUsuario} />} />

					<Route exact path="/panel" render={() => <Panel session={obtenerUsuario} />} />

					<Route exact path="/registro" render={() => <Registro session={session} />} />
					<Route exact path="/login" render={() => <Login refetch={refetch} session={session} />} />
				</Switch>
			</div>
		</Router>
	);
};

const RootSession = Session(App);
export { RootSession };
