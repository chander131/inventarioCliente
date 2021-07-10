import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { useHistory, useParams } from 'react-router';

import { ACTUALIZAR_CLIENTE } from '../../mutations';

const FormularioCliente = ({ cliente, refetch }) => {
	const history = useHistory();
	const [datosCliente, setDatosCliente] = useState(cliente);
	const [emails, setEmails] = useState(cliente.emails);

	const leerCampo = (i) => (e) => {
		const arrayOld = emails;
		arrayOld[i].email = e.target.value;
		const newArray = [...arrayOld];

		setEmails(newArray);
	};

	const quitarEmail = (i) => {
		setEmails(emails.filter((email, index) => i !== index));
	};

	const nuevoCampo = () => {
		setEmails([...emails, { email: '' }]);
	};

	const changeValue = (nameInput) => ({ target }) => {
		if (nameInput) setDatosCliente({ ...datosCliente, [nameInput]: target.value });
	};

	const enviar = (mutation) => (e) => {
		e.preventDefault();
		const { id, nombre, apellido, empresa, edad, tipo } = datosCliente;
		const input = {
			id,
			nombre,
			apellido,
			empresa,
			edad: Number(edad),
			emails,
			tipo,
		};
		mutation({ variables: { input } });
	}

	return (
		<Mutation
			mutation={ACTUALIZAR_CLIENTE}
			onCompleted={async () => {
				await refetch();
				history.push('/');
			}}
		>
			{(actualizarCliente) => (

				<form className="col-md-8 m-3" onSubmit={enviar(actualizarCliente)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label>Nombre</label>
							<input
								type="text"
								className="form-control"
								value={datosCliente.nombre}
								onChange={changeValue('nombre')}
							/>
						</div>
						<div className="form-group col-md-6">
							<label>Apellido</label>
							<input
								type="text"
								className="form-control"
								value={datosCliente.apellido}
								onChange={changeValue('apellido')}
							/>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-12">
							<label>Empresa</label>
							<input
								type="text"
								className="form-control"
								value={datosCliente.empresa}
								onChange={changeValue('empresa')}
							/>
						</div>

						{emails.map(({ email }, i) => (
							<div key={i} className="form-group col-md-12">
								<label>Email {i + 1} : </label>
								<div className="input-group">
									<input
										placeholder={`Email ${i + 1}`}
										className="form-control"
										onChange={leerCampo(i)}
										value={email}
										defaultValue={email}
									/>
									<div className="input-group-append">
										<button
											className="btn btn-danger"
											type="button"
											onClick={() => quitarEmail(i)}
										>
											&times; Eliminar
										</button>
									</div>
								</div>
							</div>
						))}

						<div className="form-group d-flex justify-content-center col-md-12">
							<button
								onClick={nuevoCampo}
								type="button"
								className="btn btn-warning"
							>
								+ Agregar Email
							</button>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-6">
							<label>Edad</label>
							<input
								type="text"
								className="form-control"
								value={datosCliente.edad}
								onChange={changeValue('edad')}
							/>
						</div>
						<div className="form-group col-md-6">
							<label>Tipo Cliente</label>
							<select
								className="form-control"
								value={datosCliente.tipo}
								onChange={changeValue('tipo')}
							>
								<option value="">Elegir...</option>
								<option value="PREMIUM">PREMIUM</option>
								<option value="BASICO">BÁSICO</option>
							</select>
						</div>
					</div>
					<button type="submit" className="btn btn-success float-right">
						Guardar Cambios
					</button>
				</form>
			)}
		</Mutation>
	);
};

export default FormularioCliente;
