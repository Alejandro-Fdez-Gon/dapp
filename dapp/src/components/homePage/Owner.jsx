import {useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de devolver el owner de la asignatura
const Owner = () => {

    // Obtenemos el owner de la asignatura del contrato
    const {
        data: owner
    } = useReadContract({
        ...asignatura,
        functionName: 'owner'
    });

    return (
        <li>El Owner es: <b>{owner}</b></li>
    );
};

export default Owner;