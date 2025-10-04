import {useState} from "react";
import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de automatricularse
const Automatricula = () => {

    // Variables para almacenar los valores del formulario
    let [nombre, setNombre] = useState("");
    let [dni, setDni] = useState("");
    let [email, setEmail] = useState("");

    const {data: hash, error, isPending, writeContract} = useWriteContract();

    // Funcion obtenida del contrato para automatricularse
    async function automatricular() {
        writeContract({
            ...asignatura,
            functionName: 'automatricula',
            args: [nombre, dni, email],
        })
    }
    
    // Funcion para autmatricularse tras hacer submit
    const handleAutoMatricular = async () => {
        try {
            await automatricular();
        } catch (e) {
            console.error("Error al automatricularse de la asignatura");
        }
    };

    // Estado de la transaccion
    const {isLoading, isSuccess} = useWaitForTransactionReceipt({
        hash,
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleAutoMatricular();
        }}>
            <h3>Automatricula</h3>

            <p>
                Nombre del alumno:  &nbsp;
                <input key="evaluacion" type="text" name="evaluacion" value={nombre}
                        placeholder="Índice de la evaluación"
                        onChange={ev => setNombre(ev.target.value)}/>
            </p>

            <p>
                DNI del alumno:  &nbsp;
                <input key="evaluacion" type="text" name="evaluacion" value={dni}
                        placeholder="Índice de la evaluación"
                        onChange={ev => setDni(ev.target.value)}/>
            </p>

            <p>
                Email del alumno:  &nbsp;
                <input key="evaluacion" type="text" name="evaluacion" value={email}
                        placeholder="Índice de la evaluación"
                        onChange={ev => setEmail(ev.target.value)}/>
            </p>

            <button type="submit" disabled={isPending}>
                <b>{isPending ? 'Esperando...' : 'Automatricular'}</b>
            </button>

            <p>
                Última petición = &nbsp;
                {isLoading && <span>Esperando ...</span>}
                {isSuccess && <span>Calificación terminada.</span>}
                {error && <span>Error: {error?.shortMessage || error.message}</span>}
            </p>
        </form>
    );
};

export default Automatricula;
