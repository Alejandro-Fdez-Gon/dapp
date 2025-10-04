import {useState} from "react";
import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de matricular un alumno
const Matricular = () => {

    // Variables para almacenar los valores del formulario
    let [alumnoAddr, setAlumnoAddr] = useState("");
    let [nombre, setNombre] = useState("");
    let [dni, setDni] = useState("");
    let [email, setEmail] = useState("");

    const {data: hash, error, isPending, writeContract} = useWriteContract();
    
    // Funcion obtenida del contrato para matricular alumnos
    async function matricular() {
        writeContract({
            ...asignatura,
            functionName: 'matricular',
            args: [alumnoAddr, nombre, dni, email],
        })
    }

    // Funcion para matricular alumnos tras hacer submit
    const handleMatricular = async () => {
        try {
            await matricular();
        } catch (e) {
            console.error("Error al matricular al alumno");
        }
    };

    // Estado de la transaccion
    const {isLoading, isSuccess} = useWaitForTransactionReceipt({
        hash,
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleMatricular();
        }}>
            <h3>Matricular</h3>

            <p>
                Dirección del Alumno:  &nbsp;
                <input key="alumno" type="text" name="alumno" value={alumnoAddr} placeholder="Dirección del alumno"
                        onChange={ev => setAlumnoAddr(ev.target.value)}/>
            </p>

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
                <b>{isPending ? 'Esperando...' : 'Matricular'}</b>
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

export default Matricular;
