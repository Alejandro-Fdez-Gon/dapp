import {useState} from "react";
import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi'
import asignatura from "../../Asignatura.json";

const CambiarCoord = () => {

    let [coordAddr, setCoordAddr] = useState("");
    const {data: hash, error, isPending, writeContract} = useWriteContract();

    async function setCoordinador() {
        writeContract({
            ...asignatura,
            functionName: 'setCoordinador',
            args: [coordAddr],
        })
    }
    const handleCambiar = async () => {
        try {
            await setCoordinador();
        } catch (e) {
            console.error("No es posible cambiar al coordinador");
        }
    };

    const {isLoading, isSuccess} = useWaitForTransactionReceipt({
        hash
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleCambiar();
        }}>
            <h3>¿Deseas cambiar al coordinador?</h3>

            <p>
                Dirección del Coordinador:  &nbsp;
                <input type="text" name="coordinador" value={coordAddr} placeholder="Escriba la nueva direccion" onChange={ev => setCoordAddr(ev.target.value)}/>
            </p>

            <button type="submit" disabled={isPending}>
                <b>{isPending ? 'Esperando...' : 'Cambiar'}</b>
            </button>

            <p>
                Última petición = &nbsp;
                {isLoading && <span>Esperando ...</span>}
                {isSuccess && <span>Coordinador cambiado.</span>}
                {error && <span>Error: {error?.shortMessage || error.message}</span>}
            </p>
        </form>
    );
};

export default CambiarCoord;