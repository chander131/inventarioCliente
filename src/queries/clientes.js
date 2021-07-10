import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
	query getClientes($limite: Int, $offset: Int, $vendedor: String){
		getClientes(limite: $limite, offset: $offset, vendedor: $vendedor) {
			id
			nombre
			apellido
			empresa
			edad
			tipo
			vendedor
		}
		totalClientes(vendedor: $vendedor)
	}
`;

export const CLIENTE_QUERY = gql`
	query getCliente($id: ID!) {
		getCliente(id: $id) {
			id
			nombre
			apellido
			empresa
			edad
			tipo
			emails {
				email
			}
		}
	}
`;
