import {useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de controlar el estado de la asignatura
const EstaCerrada = ({children}) => {

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

    return cerrada ? null : <>{children}</>;

};

export default EstaCerrada;
