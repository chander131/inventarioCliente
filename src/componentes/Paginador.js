import React from 'react'
import { useState } from 'react';

const Paginador = ({ actual, total, limite, paginaAnterior, paginaSiguiente }) => {
    const [state, setState] = useState({
        paginas: Math.ceil(Number(total) / limite)
    });
    return (
        <div className="mt-5 d-flex justify-content-center">

            {actual > 1 && (
                <button
                    type="button"
                    className="btn btn-success mr-2"
                    onClick={paginaAnterior}
                >
                    &laquo; Anterior
                </button>
            )}

            {actual != state.paginas && (
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={paginaSiguiente}
                >
                    Siguiente &raquo;
                </button>
            )}
        </div>
    )
};

export default Paginador;
