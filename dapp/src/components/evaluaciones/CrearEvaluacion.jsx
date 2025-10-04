import {useState} from "react";
import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de crear evaluaciones
const CrearEvaluacion = () => {

    // Variables para almacenar los valores del formulario
    let [nombre, setNombre] = useState("");
    let [fecha, setFecha] = useState("");
    let [pond, setPond] = useState("");
    let [min, setMin] = useState("")
    
    const {data: hash, error, isPending, writeContract} = useWriteContract();

    // Funcion obtenida del contrato para crear evaluaciones
    async function crearEv() {
        writeContract({
            ...asignatura,
            functionName: 'creaEvaluacion',
            args: [nombre, fecha, pond, min],
        })
    }

    // Funcion para crear evaluaciones tras hacer submit
    const handleCrearEv = async () => {
        try {
            await crearEv();
        } catch (e) {
            console.error("Error al crear la evaluacion");
        }
    };

    // Estado de la transaccion
    const {isLoading, isSuccess} = useWaitForTransactionReceipt({
        hash
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleCrearEv();
        }}>
            <h3>Crea una nueva evaluación</h3>

            <p>
                Nombre: &nbsp;
                <input type="text" value={nombre} placeholder="Nombre de la evaluación"
                    onChange={ev => setNombre(ev.target.value)}/>
            </p>

            <p>
                Fecha: &nbsp;
                <input type="number" value={fecha} placeholder="Fecha límite de entrega"
                    onChange={ev => setFecha(ev.target.value)}/>
            </p>

            <p>
                Ponderación: &nbsp;
                <input type="number" value={pond} placeholder="Ponderación total"
                    onChange={ev => setPond(ev.target.value)}/>
            </p>

            <p>
                Nota mínima (x 100): &nbsp;
                <input type="number" value={min} placeholder="Nota mínima"
                    onChange={ev => setMin(ev.target.value)}/>
            </p>

            <button type="submit" disabled={isPending}>
                <b>{isPending ? 'Esperando...' : 'Crear'}</b>
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

export default CrearEvaluacion;
