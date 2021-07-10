import gql from 'graphql-tag';

export const OBTENER_USUARIO = gql`
	query obtenerUsuario {
		obtenerUsuario {
			id
			usuario
			nombre
			rol
		}
	}
`;
