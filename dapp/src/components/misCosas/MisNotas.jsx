import {useReadContracts, useReadContract, useWatchContractEvent, useAccount} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de representar las notas de la cuenta de un alumno
const MisNotas = () =>{
    
    return (<section className="AppMisNotas">
        <h3>Mis Notas</h3>

        <table>
            <MisNotasHead/>
            <MisNotasBody/>
        </table>
    </section>);
}

// Componente encargado de representar la cabecera de las notas
const MisNotasHead = () => {

    return (<thead>
        <tr>
            <th>Evaluación</th>
            <th>Nota</th>
        </tr>
    </thead>);
}

// Componente encargado de representar el cuerpo de las notas
const MisNotasBody = () => {

    // Constante donde se obtiene la cuenta
    const account = useAccount();
    
    // Obtenemos el numero de evaluaciones del contrato
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
    
    // Recorremos el array de notas
    const items = [];
    for (let ei = 0; ei < evaluacionesLength; ei++) {
        items.push(<MisNotasItem key={'MNI-'+ei} alumnoAddress={account?.address} evaluacionIndex={ei} />);
    }
    
    return <tbody>{items}</tbody>;
};
    
// Componente encargado representar una fila de las notas
const MisNotasItem = ({alumnoAddress, evaluacionIndex}) => {
    
    // Constante donde se obtiene la cuenta
    const account = useAccount();
    
    // Obtenemos la notas del alumno del contrato
    const {
        data,
        refetch
    } = useReadContracts({
        contracts: [
            {...asignatura, functionName: 'evaluaciones', args: [evaluacionIndex]},
            {...asignatura, account: account.address, functionName: 'miNota', args: [evaluacionIndex]}
        ]
    });
    
    // Para identificar cuando es modificado
    useWatchContractEvent({
        ...asignatura,
        eventName: 'Calificacion',
        onLogs(logs) {
            refetch()
        },
    });
    
    // Constantes con el nombre de la evaluacion y su nota
    const evaluacion = data?.[0].result;
    const nota = data?.[1].result;
    
    return <tr>
        <td>
            {evaluacion?.[0]}
        </td>

        <td>
            {nota?.[0].toString() === "0" ? "" : ""}
            {nota?.[0].toString() === "1" ? "N.P." : ""}
            {nota?.[0].toString() === "2" ? (Number(nota?.[1]) / 100).toFixed(2) : ""}
        </td>

    </tr>
};

export default MisNotas;