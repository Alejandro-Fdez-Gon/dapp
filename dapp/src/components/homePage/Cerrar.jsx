import {useReadContract, useWriteContract, useWaitForTransactionReceipt} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de cerrar la asignatura
const Cerrar = () => {
    
    // Obtenemos el estado de la asignatura del contrato
    const {
        data: cerrada
    } = useReadContract({
        ...asignatura,
        functionName: 'cerrada'
    });

    const {data: hash, error, isPending, writeContract} = useWriteContract();    

    // Funcion obtenida del contrato para cerrar la asignatura
    async function cerrar() {
        writeContract({
            ...asignatura,
            functionName: 'cerrar',
        })
    }

    // Funcion para cerrar la asignatura tras hacer submit
    const handleCerrar = async () => {
        try {
            await cerrar();
        } catch (e) {
            console.error("Error al cerrar la asignatura");
        }
    };

    // Estado de la transaccion
    const {isLoading, isSuccess} = useWaitForTransactionReceipt({
        hash
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleCerrar();
        }}>
            <h3>¿Deseas cerrar la asignatura?</h3>

            <button type="submit" disabled={cerrada || isPending}>
                <b>{isPending ? 'Esperando...' : 'Cerrar'}</b>
            </button>

            <p>
                Última petición = &nbsp;
                {isLoading && <span>Esperando ...</span>}
                {isSuccess && <span>Asignatura cerrada</span>}
                {error && <span>Error: {error?.shortMessage || error.message}</span>}
            </p>
        </form>
    );
};

export default Cerrar;