import {useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../../Asignatura.json";

const CalificacionItem = ({alumnoAddress, evaluacionIndex}) => {

    // Obtenemos la nota de la evaluacion del contrato
    const {
        data: nota,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'calificaciones',
        args: [alumnoAddress, evaluacionIndex]
    });

    // Para identificar cuando es modificado
    useWatchContractEvent({
        ...asignatura,
        eventName: 'Calificacion',
        onLogs(logs) {
            refetch()
        },
    });

    return <td key={"p2-" + alumnoAddress + "-" + evaluacionIndex}>
        {nota?.[0].toString() === "0" ? "" : ""}
        {nota?.[0].toString() === "1" ? "N.P." : ""}
        {nota?.[0].toString() === "2" ? (Number(nota?.[1]) / 100).toFixed(2) : ""}
    </td>
};

export default CalificacionItem;