import {useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de devolver el coordiandor de la asignatura
const Coordinador = () => {

    // Obtenemos el coordinador de la asignatura del contrato
    const {
        data: coordinador,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'coordinador'
    });

    // Para identificar cuando es modificado
    useWatchContractEvent({
        ...asignatura,
        eventName: 'CoordinadorAsignado',
        onLogs(logs) {
            refetch()
        },
    });

    return (
        <li>El Coordinador es: <b>{coordinador}</b></li>
    );
};

export default Coordinador;