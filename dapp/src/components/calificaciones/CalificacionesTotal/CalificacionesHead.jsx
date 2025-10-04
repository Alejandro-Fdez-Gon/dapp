import {useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../../Asignatura.json";

// Componente encargado representar la cabecera del listado de las calificaciones
const CalificacionesHead = () => {

    // Obtenemos el numero de evaluaciones de la asignatura del contrato
    const {
        data: evaluacionesLength,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'evaluacionesLength'
    });

    // Para identificar cuando es modificado
    useWatchContractEvent({
        ...asignatura,
        eventName: 'EvaluacionCreada',
        onLogs(logs) {
            refetch()
        },
    });

    // Se forma la cabecera
    let thead = [];
    thead.push(<th key={"chae"}>A-E</th>);
    thead.push(<th key={"chn"}>Nombre</th>);

    for (let i = 0; i < evaluacionesLength; i++) {
        thead.push(<th key={"chev-" + i}>E<sub>{i}</sub></th>);
    }

    return <thead><tr>{thead}</tr></thead>;
};

export default CalificacionesHead;
