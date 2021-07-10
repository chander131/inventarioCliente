import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';

import { NUEVO_PRODUCTO } from '../mutations';

const NuevoProducto = ({ }) => {
    const [state, setState] = useState({
        nombre: "",
        precio: 0,
        stock: 0,
    });
    const history = useHistory();

    const actualizarState = ({ target: { name, value } }) => setState({ ...state, [name]: value });

    const validarForm = () => {
        const { nombre, precio, stock } = state;
        const noValido = !nombre || !precio || !stock;
        return noValido;
    };

    const crearNuevoProducto = async (e, nuevoProducto) => {
        e.preventDefault();

        try {
            const result = await nuevoProducto();
            setState({ nombre: "", precio: 0, stock: 0 });
            history.push('/productos')
        } catch (e) {
            console.log('ERROR: NuevoProducto=>crearNuevoProducto', e);
        }
    };

    return (
        <>
            <h1 className="text-center mb-5">Nuevo Producto</h1>
            <div className="row justify-content-center">
                <Mutation
                    mutation={NUEVO_PRODUCTO}
                    variables={{
                        input: {
                            nombre: state.nombre,
                            precio: Number(state.precio),
                            stock: Number(state.stock)
                        }
                    }}
                >
                    {(nuevoProducto, { loading, error, data }) => {

                        return (
                            <form
                                className="col-md-8"
                                onSubmit={(e) => crearNuevoProducto(e, nuevoProducto)}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form-control"
                                        placeholder="Nombre del Producto"
                                        onChange={actualizarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input
                                            type="number"
                                            name="precio"
                                            className="form-control"
                                            placeholder="Precio del Producto"
                                            onChange={actualizarState}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="form-control"
                                        placeholder="stock del Producto"
                                        onChange={actualizarState}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success float-right"
                                    disabled={validarForm()}
                                >
                                    Crear Producto
                                </button>
                            </form>
                        );
                    }}
                </Mutation>
            </div>
        </>
    );
};

export default NuevoProducto;
