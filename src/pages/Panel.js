import React from 'react';

import Clientes from '../componentes/Panel/Clientes';
import Vendedores from '../componentes/Panel/Vendedores';

const Panel = ({ session }) => {
    return (
        <>
            <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>

            <Clientes />

            {session?.rol == "ADMINISTRADOR" && (
                <>
                    <h1 className="text-center my-5">Top 10 Vendedores</h1>
                    <Vendedores />
                </>
            )}
        </>
    )
}

export default Panel;
