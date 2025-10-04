import {useReadContract, useWatchContractEvent} from 'wagmi'

import CalificacionItem from "./CalificacionItem.jsx";

import asignatura from "../../../Asignatura.json";

// Componente encargado representar una fila del listado de calificaciones
const CalificacionRow = ({alumnoIndex}) => {

    // Obtenemos la direccion del alumno del contrato
    const {
        data: alumnoAddr
    } = useReadContract({
        ...asignatura,
        functionName: 'matriculas',
        args: [alumnoIndex]
    });

    // Obtenemos al alumno del contrato
    const {
        data: alumnoDatos
    } = useReadContract({
        ...asignatura,
        functionName: 'datosAlumno',
        args: [alumnoAddr]
    });

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

    // Recorremos el array de calificaciones
    let notas = [];
    for (let ei = 0; ei < evaluacionesLength; ei++) {
        notas.push(<CalificacionItem key={'CI'+alumnoAddr+ei} alumnoAddress={alumnoAddr} evaluacionIndex={ei} />);
    }

    return <tr key={"d" + alumnoIndex}>
        <th>A<sub>{alumnoIndex}</sub></th>
        <td>{alumnoDatos?.[0]}</td>
        {notas}
    </tr>;
};

export default CalificacionRow;
