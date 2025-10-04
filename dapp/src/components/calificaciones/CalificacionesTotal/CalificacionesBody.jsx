import {useReadContract, useWatchContractEvent} from 'wagmi'

import CalificacionRow from "./CalificacionRow.jsx";

import asignatura from "../../../Asignatura.json";

// Componente encargado representar el cuerpo del listado de las calificaciones
const CalificacionesBody = () => {

    // Obtenemos el numero de matriculados del contrato
    const {
        data: matriculasLength,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'matriculasLength'
    });

    // Para identificar cuando es modificado
    useWatchContractEvent({
        ...asignatura,
        eventName: 'MatriculaCreada',
        onLogs(logs) {
            refetch()
        },
    });

    // Recorremos el array de matriculados
    let rows = [];
    for (let i = 0; i < matriculasLength; i++) {
        rows.push(<CalificacionRow key={i} alumnoIndex={i}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default CalificacionesBody;