import gql from 'graphql-tag';

export const TOP10_CLIENTES = gql`
    query topClientes {
        topClientes {
            total
            cliente {
                nombre
                apellido
            }
        }
    }
`;

export const TOP10_VENDEDORES = gql`
    query topVendedores {
        topVendedores {
            total
            vendedor {
                nombre
                usuario
            }
        }
    }
`;


