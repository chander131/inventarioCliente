import React, { useEffect, useState } from 'react';
import { NUEVO_CLIENTE } from '../mutations';
import { Mutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';

const NuevoCliente = ({ session: { obtenerUsuario } }) => {
	const history = useHistory();
	const [dataForm, setDataForm] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		edad: '',
		tipo: '',
		error: false,
		emails: [],
	});

	const leerCampo = (i) => (e) => {
		const nuevoEmail = dataForm.emails.map((email, index) => {
			if (i !== index) return email;
			return {
				...email,
				email: e.target.value,
			};
		});
		setDataForm({ ...dataForm, emails: nuevoEmail });
	};

	const quitarEmail = (i) => {
		setDataForm({
			...dataForm,
			emails: dataForm.emails.filter((email, index) => i !== index),
		});
	};

	const nuevoCampo = () => {
		setDataForm({ ...dataForm, emails: [...dataForm.emails, { email: '' }] });
	};

	const enviar = (mutation) => (e) => {
		e.preventDefault();
		const { nombre, apellido, empresa, edad, emails, tipo } = dataForm;
		if (
			nombre === '' ||
			apellido === '' ||
			empresa === '' ||
			edad === '' ||
			tipo === ''
		) {
			setDataForm({ ...dataForm, error: true });
			return;
		}
		setDataForm({ ...dataForm, error: false });
		const input = {
			nombre,
			apellido,
			empresa,
			edad: Number(edad),
			emails,
			tipo,
			vendedor: obtenerUsuario.id
		};
		mutation({ variables: { input } });
	};

	const setDataChange = ({ target: { name, value } }) =>
		setDataForm({ ...dataForm, [name]: value });

	return (
		<>
			{dataForm.error && (
				<p className="alert alert-danger p-3 text-center">
					Todos los campos son Obligatorios
				</p>
			)}
			<h2 className="text-center">Nuevo Cliente</h2>
			<div className="row justify-content-center">
				<Mutation mutation={NUEVO_CLIENTE} onCompleted={() => history.push('/')}>
					{(crearCliente) => (
						<form className="col-md-8 m-3" onSubmit={enviar(crearCliente)}>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Nombre</label>
									<input
										name="nombre"
										type="text"
										className="form-control"
										placeholder="Nombre"
										onChange={setDataChange}
									/>
								</div>
								<div className="form-group col-md-6">
									<label>Apellido</label>
									<input
										name="apellido"
										type="text"
										className="form-control"
										placeholder="Apellido"
										onChange={setDataChange}
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-12">
									<label>Empresa</label>
									<input
										name="empresa"
										type="text"
										className="form-control"
										placeholder="Empresa"
										onChange={setDataChange}
									/>
								</div>
								{dataForm.emails.map((item, i) => (
									<div key={i} className="form-group col-md-12">
										<label>Correo {i + 1}:</label>
										<div className="input-group">
											<input
												onChange={leerCampo(i)}
												type="email"
												placeholder="Email"
												className="form-control"
											/>
											<div className="input-group-append">
												<button
													onClick={() => quitarEmail(i)}
													type="button"
													className="btn btn-danger"
												>
													&times; Eliminar
												</button>
											</div>
										</div>
									</div>
								))}
								<div className="form-group d-flex justify-content-center col-md-12">
									<button
										type="button"
										className="btn btn-warning"
										onClick={nuevoCampo}
									>
										+ Agregar Email
									</button>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Edad</label>
									<input
										name="edad"
										type="text"
										className="form-control"
										placeholder="Edad"
										onChange={setDataChange}
									/>
								</div>
								<div className="form-group col-md-6">
									<label>Tipo Cliente</label>
									<select
										name="tipo"
										className="form-control"
										onChange={setDataChange}
									>
										<option value="">Elegir...</option>
										<option value="PREMIUM">PREMIUM</option>
										<option value="BASICO">BÁSICO</option>
									</select>
								</div>
							</div>
							<button type="submit" className="btn btn-success float-right">
								Agregar Cliente
							</button>
						</form>
					)}
				</Mutation>
			</div>
		</>
	);
};

export default NuevoCliente;
