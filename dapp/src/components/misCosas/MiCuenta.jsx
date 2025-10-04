import {useAccount, useBalance } from 'wagmi'

import MiRol from './MiRol';

// Componente encargado de representar los datos de la cuenta
const MiCuenta = () => {

    // Constante donde se obtiene la cuenta
    const account = useAccount();

    // Constante donde se obtiene la direccion de la cuenta
    const address = account?.address;

    // Constante donde se obtiene el balance de la cuenta
    const { data, isError, isLoading } = useBalance({
        address
    });

    if (isLoading) return <div>Cargando balance...</div>;
    if (isError) return <div>Error al obtener el balance.</div>;
    
    return (<article className="AppMiCuenta">
        <h3>Mi Cuenta</h3>

        <ul>
            <li>Dirección: <span style={{color: "blue"}}>{account?.address}</span></li>
            <li>Balance: <span style={{color: "blue"}}>{data?.formatted} {data?.symbol}</span></li>
            <MiRol/>
        </ul>

    </article>);
};

export default MiCuenta;
