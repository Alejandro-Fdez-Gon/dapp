import {useReadContract, useWatchContractEvent} from 'wagmi'

import AlumnoRow from "./AlumnoRow.jsx";

import asignatura from "../../../Asignatura.json";

// Componente encargado representar el cuerpo del listado de alumnos
const AlumnosBody = () => {

    // Obtenemos el numero de matriculados de la asignatura del contrato
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
        rows.push(<AlumnoRow key={"ab-"+i} alumnoIndex={i}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default AlumnosBody;
