import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Mutation } from 'react-apollo';

import { ACTUALIZAR_PRODUCTO } from '../../mutations'

const FormularioEditarProducto = ({ id, producto, refetch }) => {
    const [state, setState] = useState({ ...producto });
    const history = useHistory();

    const actualizarState = ({ target: { name, value } }) => setState({ ...state, [name]: value });

    const validarForm = () => {
        const { nombre, precio, stock } = state;
        const noValido = !nombre || !precio || !stock;
        return noValido;
    };

    const actualizar = (actualizarProducto) => async (e) => {
        e.preventDefault();


        try {
            setState({ nombre: "", precio: 0, stock: 0 });
            const result = await actualizarProducto();
        } catch (e) {
            console.log('ERROR: FormularioEditarProducto=>actualizarProductoDB', e);
        }
    }

    return (
        <Mutation
            mutation={ACTUALIZAR_PRODUCTO}
            variables={{
                input: {
                    id,
                    nombre: state.nombre,
                    precio: Number(state.precio),
                    stock: Number(state.stock),
                }
            }}
            key={id}
            onCompleted={async () => {
                await refetch();
                history.push('/productos');
            }}
        >
            {(actualizarProducto, { loading, error, data }) => (
                <form
                    className="col-md-8"
                    onSubmit={actualizar(actualizarProducto)}
                >
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            value={state.nombre}
                            onChange={actualizarState}
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Nombre del Producto"
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input
                                value={state.precio}
                                onChange={actualizarState}
                                type="number"
                                name="precio"
                                className="form-control"
                                placeholder="Precio del Producto"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Stock:</label>
                        <input
                            value={state.stock}
                            onChange={actualizarState}
                            type="number"
                            name="stock"
                            className="form-control"
                            placeholder="stock del Producto"
                        />
                    </div>
                    <button
                        disabled={validarForm()}
                        type="submit"
                        className="btn btn-success float-right"
                    >
                        Guardar Cambios
                    </button>
                </form>
            )}
        </Mutation>
    );
};

export default FormularioEditarProducto;
