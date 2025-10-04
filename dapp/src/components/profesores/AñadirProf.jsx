import {useState} from "react";
import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de añadir profesores
const AñadirProf = () => {

    // Variables para almacenar los valores del formulario
    let [profAddr, setProfAddr] = useState("");
    let [nombre, setNombre] = useState("");

    const {data: hash, error, isPending, writeContract} = useWriteContract();

    // Funcion obtenida del contrato para añadir profesores
    async function addProfesor() {
        writeContract({
            ...asignatura,
            functionName: 'addProfesor',
            args: [profAddr, nombre],
        })
    }

    // Funcion para añadir profesores tras hacer submit
    const handleCambiar = async () => {
        try {
            await addProfesor();
        } catch (e) {
            console.error("Error al añadir al profesor");
        }
    };

    // Estado de la transaccion
    const {isLoading, isSuccess} = useWaitForTransactionReceipt({
        hash,
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleCambiar();
        }}>
            <h3>¿Deseas añadir un profesor?</h3>

            <p>
                Dirección del Profesor:  &nbsp;
                <input type="text" name="coordinador" value={profAddr} placeholder="Dirección del profesor" onChange={ev => setProfAddr(ev.target.value)}/>
            </p>

            <p>
                Nombre del Profesor:  &nbsp;
                <input type="text" name="coordinador" value={nombre} placeholder="Nombre del profesor" onChange={ev => setNombre(ev.target.value)}/>
            </p>

            <button type="submit" disabled={isPending}>
                <b>{isPending ? 'Esperando...' : 'Añadir'}</b>
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

export default AñadirProf;