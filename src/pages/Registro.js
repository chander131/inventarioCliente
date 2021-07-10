import React, { useState } from 'react';
import { useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect, useHistory } from 'react-router-dom';

import Error from '../componentes/Alertas/Error';

import { NUEVO_USUARIO } from '../mutations';

const initialState = {
    usuario: '',
    nombre: '',
    password: '',
    repetirPassword: '',
    rol: '',
};

const Registro = ({ session }) => {
    const [state, setState] = useState({ ...initialState });
    const history = useHistory();
    const { obtenerUsuario } = session;

    const changeValue = ({ target }) => setState({ ...state, [target.name]: target.value });

    const validarForm = () => {
        const { usuario, nombre, password, repetirPassword, rol } = state;
        let noValido = !usuario || !nombre || !password || !rol || (password !== repetirPassword);

        return noValido;
    };

    const crearRegistro = (mutation) => async (e) => {
        e.preventDefault();

        try {
            await mutation();
        } catch (e) { }
    };

    useEffect(() => {

        return () => {
            setState({ ...initialState });
        }
    }, []);

    if (obtenerUsuario?.rol !== "ADMINISTRADOR") return <Redirect to="/" />;
    return (
        <>
            <h1 className="text-center mb-5">Nuevo Usuario</h1>
            <div className="row  justify-content-center">
                <Mutation
                    mutation={NUEVO_USUARIO}
                    variables={{
                        usuario: state.usuario,
                        nombre: state.nombre,
                        password: state.password,
                        rol: state.rol,
                    }}
                    onCompleted={() => {
                        history.push('/login');
                    }}
                >

                    {(nuevoUsuario, { loading, error, data }) => {
                        return (
                            <form
                                className="col-md-8"
                                onSubmit={crearRegistro(nuevoUsuario)}
                            >
                                {error && <Error error={error?.message} />}
                                <div className="form-group">
                                    <label>Usuario</label>
                                    <input
                                        type="text"
                                        name="usuario"
                                        className="form-control"
                                        placeholder="Nombre Usuario"
                                        onChange={changeValue}
                                        value={state.usuario}
                                    />
                                    <small className="form-text text-muted">
                                        (Sin espacios y sin caracteres especiales)
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form-control"
                                        placeholder="Nombre completo"
                                        onChange={changeValue}
                                        value={state.nombre}
                                    />
                                    <small className="form-text text-muted">
                                        (Agrega el apellido y nombre completo)
                                    </small>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={changeValue}
                                            value={state.password}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Repetir Password</label>
                                        <input
                                            type="password"
                                            name="repetirPassword"
                                            className="form-control"
                                            placeholder="Repetir Password"
                                            onChange={changeValue}
                                            value={state.repetirPassword}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Rol: </label>
                                    <select
                                        className="form-control"
                                        value={state.rol}
                                        name="rol"
                                        onChange={changeValue}
                                    >
                                        <option value="">Elegir...</option>
                                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                        <option value="VENDEDOR">VENDEDOR</option>
                                    </select>
                                </div>

                                <button
                                    disabled={loading || validarForm()}
                                    type="submit"
                                    className="btn btn-success float-right"
                                >
                                    Crear Usuario
                                </button>
                            </form>
                        );
                    }}
                </Mutation>
            </div>
        </>
    );
};

export default Registro;
