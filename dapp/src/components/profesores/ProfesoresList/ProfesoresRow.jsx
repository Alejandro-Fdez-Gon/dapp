import {useReadContract} from 'wagmi'

import asignatura from "../../../Asignatura.json";

// Componente encargado representar una fila del listado de profesores
const ProfesoresRow = ({profesorIndex}) => {

    // Obtenemos la direccion del profesor del contrato
    const {
        data: profesorAddr
    } = useReadContract({
        ...asignatura,
        functionName: 'profesores',
        args: [profesorIndex]
    });

    // Obtenemos al profesor del contrato
    const {
        data: profesoresDatos
    } = useReadContract({
        ...asignatura,
        functionName: 'datosProfesor',
        args: [profesorAddr]
    });

    return <tr key={"PROF-" + profesorIndex}>
        <th>P<sub>{profesorIndex}</sub></th>
        <td>{profesoresDatos}</td>
    </tr>;
};

export default ProfesoresRow;
