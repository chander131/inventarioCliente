import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Redirect, useHistory } from 'react-router-dom';

import Error from '../componentes/Alertas/Error';

import { AUTENTICAR_USUARIO } from '../mutations';

const initialState = {
    usuario: '',
    password: ''
};

const Login = ({ refetch, session }) => {
    const [state, setState] = useState({ ...initialState });
    const history = useHistory();
    const { obtenerUsuario } = session;

    const actualizarState = ({ target }) => {
        const { name, value } = target;
        setState({ ...state, [name]: value });
    };

    const limpiarState = () => setState({ ...initialState });

    const iniciarSesion = (e, usuarioAutenticar) => {
        e.preventDefault();

        usuarioAutenticar()
            .then(async ({ data }) => {
                const { token } = data.autenticarUsuario;
                localStorage.setItem('token', token);

                //TODO: hacer queries
                await refetch();

                limpiarState();

                //TODO: Redireccionar
                // setTimeout(() => {
                //     history.push('/panel');
                // }, 3000);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const validarForm = () => {
        const { usuario, password } = state;

        const noValido = !usuario || !password;

        return noValido;
    };

    // if (obtenerUsuario?.rol !== "ADMINISTRADOR") return <Redirect to="/" />;
    return (
        <>
            <h1 className="text-center mb-5">Iniciar Sesion</h1>

            <div className="row  justify-content-center">

                <Mutation
                    mutation={AUTENTICAR_USUARIO}
                    variables={{ usuario: state.usuario, password: state.password }}
                    onCompleted={() => history.push('/panel')}
                >
                    {(usuarioAutenticar, { loading, error, data }) => {

                        return (

                            <form
                                onSubmit={e => iniciarSesion(e, usuarioAutenticar)}
                                className="col-md-8"
                            >

                                {error && <Error error={error?.message} />}


                                <div className="form-group">
                                    <label>Usuario</label>
                                    <input
                                        onChange={actualizarState}
                                        value={state.usuario}
                                        type="text"
                                        name="usuario"
                                        className="form-control"
                                        placeholder="Nombre Usuario"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        onChange={actualizarState}
                                        value={state.password}
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>

                                <button
                                    disabled={loading || validarForm()}
                                    type="submit"
                                    className="btn btn-success float-right"
                                >
                                    Iniciar Sesión
                                </button>
                            </form>
                        );
                    }}
                </Mutation>
            </div>
        </>
    );
};

Login.propTypes = {

};

export default Login;
