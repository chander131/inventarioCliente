import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
	mutation crearCliente($input: ClienteInput) {
		crearCliente(input: $input) {
			id
			nombre
			apellido
		}
	}
`;

export const ACTUALIZAR_CLIENTE = gql`
	mutation actualizarCliente($input: ClienteInput){
  		actualizarCliente(input : $input) {
			nombre
			apellido
			edad
			empresa
			tipo
			emails {
				email
			}
		}
	}
`;

export const ELIMINAR_CLIENTE = gql`
	mutation eliminarCliente($id: ID!){
		eliminarCliente(id: $id)
	}
`;

//#region Productos

export const NUEVO_PRODUCTO = gql`
	mutation nuevoProducto($input: ProductoInput){
		nuevoProducto(input: $input){
			nombre
			precio
			stock
		}
	}
`;

export const ELIMINAR_PRODUCTO = gql`
	mutation eliminarProducto($id: ID!){
  		eliminarProducto(id: $id)
	}
`;

export const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($input: ProductoInput){
		actualizarProducto(input: $input){
			nombre
			precio
			stock
		}
	}
`;



//#endregion

//#region Pedidos

export const NUEVO_PEDIDO = gql`
	mutation nuevoPedido($input: PedidoInput){
		nuevoPedido(input: $input){
			id
		}
	}
`;

export const ACTUALIZAR_PEDIDO = gql`
	mutation actualizarPedido($input: PedidoInput){
		actualizarPedido(input: $input){
			id
		}
	}
`;


//#endregion


//#region Usuarios
export const NUEVO_USUARIO = gql`
	mutation nuevoUsuario($usuario: String!, $nombre: String!, $password: String!, $rol: String!){
		nuevoUsuario(usuario: $usuario, nombre: $nombre, password: $password, rol: $rol)
	}
`;

export const AUTENTICAR_USUARIO = gql`
	mutation autenticarUsuario($usuario: String!, $password: String!){
		autenticarUsuario(usuario: $usuario, password: $password) {
			token
		}
	}
`;
//#endregion
