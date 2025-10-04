import {useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de devolver si la asignatura esta abierta o cerrada
const Estado = () => {

    // Obtenemos el estado de la asignatura del contrato
    const {
        data: cerrada,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'cerrada'
    });

    // Para identificar cuando es modificado
    useWatchContractEvent({
        ...asignatura,
        eventName: 'AsignaturaCerrada',
        onLogs(logs) {
            refetch()
        },
    });

    return (
        <li>La asignatura esta: <b>{cerrada ? 'Cerrada' : 'Abierta'}</b></li>
    );
};

export default Estado;