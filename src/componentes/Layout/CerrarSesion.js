import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { useHistory } from 'react-router-dom';

const CerrarSesion = () => {
    const history = useHistory();

    const cerrarSesion = (cliente) => () => {
        localStorage.removeItem('token', '');
        cliente.resetStore();
        history.push('/login');
    };

    return (
        <ApolloConsumer>
            {cliente => {

                return (
                    <button
                        className="btn btn-light ml-md-2 mt-2 mt-md-0"
                        onClick={cerrarSesion(cliente)}
                    >
                        Cerrar Sesion
                    </button>
                );
            }}
        </ApolloConsumer>
    );
}

export default CerrarSesion;
