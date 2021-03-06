import React from 'react';
import { Link } from 'react-router-dom';
import BotonRegistro from './BotonRegistro';

import CerrarSesion from './CerrarSesion';

const Header = ({ isLogin }) => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
		<div className="container">
			{isLogin ? (
				<>
					<Link to="/" className="navbar-brand text-light font-weight-bold">
						CRM
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navegacion"
						aria-controls="navegacion"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navegacion">
						<ul className="navbar-nav ml-auto text-right">
							<li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
								<button
									className="nav-link dropdown-toggle btn btn-block btn-success"
									data-toggle="dropdown"
								>
									Clientes
								</button>
								<div className="dropdown-menu" aria-labelledby="navegacion">
									<Link to="/" className="dropdown-item">
										Ver Clientes
									</Link>
									<Link to="/cliente/nuevo" className="dropdown-item">
										Nuevo Cliente
									</Link>
								</div>
							</li>
							<li className="nav-item dropdown">
								<button
									className="nav-link dropdown-toggle btn btn-block btn-success"
									data-toggle="dropdown"
								>
									Productos
								</button>
								<div className="dropdown-menu" aria-labelledby="navegacion">
									<Link to="/productoS" className="dropdown-item">
										Ver productos
									</Link>
									<Link to="/producto/nuevo" className="dropdown-item">
										Nuevo Producto
									</Link>
								</div>
							</li>
							{isLogin.rol === "ADMINISTRADOR" && <BotonRegistro />}
							<CerrarSesion />
						</ul>
					</div>
				</>
			) : (
				<p to="/" className="navbar-brand text-light font-weight-bold">
					CRM
				</p>
			)}
		</div>
	</nav>
);

export default Header;
