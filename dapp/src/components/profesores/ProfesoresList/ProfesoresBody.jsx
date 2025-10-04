import {useReadContract, useWatchContractEvent} from 'wagmi'

import ProfesoresRow from "./ProfesoresRow.jsx";

import asignatura from "../../../Asignatura.json";

// Componente encargado representar el cuerpo del listado de profesores
const ProfesoresBody = () => {

    // Obtenemos el numero de profesores de la asignatura del contrato
    const {
        data: profesoresLength,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'profesoresLength'
    });

    // Para identificar cuando es modificado
    useWatchContractEvent({
        ...asignatura,
        eventName: 'ProfesorCreado',
        onLogs(logs) {
            refetch()
        },
    });

    // Recorremos el array de profesores
    let rows = [];
    for (let i = 0; i < profesoresLength; i++) {
       rows.push(<ProfesoresRow key={"ab-"+i} profesorIndex={i}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default ProfesoresBody;
