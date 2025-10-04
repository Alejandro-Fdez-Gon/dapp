import {useReadContract, useWatchContractEvent} from 'wagmi'

import EvaluacionRow from "./EvaluacionRow.jsx";

import asignatura from "../../../Asignatura.json";

// Componente encargado representar el cuerpo del listado de evaluaciones
const EvaluacionesBody = () => {

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

    // Recorremos el array de evaluaciones
    let rows = [];
    for (let i = 0; i < evaluacionesLength; i++) {
        rows.push(<EvaluacionRow key={i} evaluacionIndex={i}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default EvaluacionesBody;
