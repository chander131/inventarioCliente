import gql from 'graphql-tag';

export const OBTENER_PEDIDOS = gql`
    query obtenerPedidos($cliente: ID, $vendedor: ID){
        obtenerPedidos(cliente: $cliente, vendedor: $vendedor){
            id
            pedido {
                id
                cantidad
            }
            total
            fecha
            cliente
            estado
            vendedor
        }
    }
`;