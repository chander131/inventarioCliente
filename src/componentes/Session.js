import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Cargando from './Cargando';

import { OBTENER_USUARIO } from '../queries';

const Session = Component => props => (
    <Query
        query={OBTENER_USUARIO}
    >
        {({ loading, error, data, refetch }) => {
            if (loading) return <Cargando />;
            return <Component {...props} refetch={refetch} session={data} />;
        }}
    </Query>
);

export default Session;
