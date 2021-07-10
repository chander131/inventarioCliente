import gql from 'graphql-tag';

export const PRODUCTOS_QUERY = gql`
	query obtenerProductos($limite: Int, $offset: Int, $stock: Boolean){
        obtenerProductos(limite: $limite, offset: $offset, stock :$stock) {
            id
            nombre
            precio
            stock
        }
        totalProductos
    }
`;

export const PRODUCTO_QUERY = gql`
    query obtenerProducto($id: ID!) {
        obtenerProducto(id: $id) {
            id
            nombre
            precio
            stock
        }
    }
`;