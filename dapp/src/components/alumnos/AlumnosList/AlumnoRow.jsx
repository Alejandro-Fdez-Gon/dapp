import {Link} from "react-router-dom";
import {useReadContract} from 'wagmi'

import asignatura from "../../../Asignatura.json";

// Componente encargado representar una fila del listado de alumnos
const AlumnoRow = ({alumnoIndex}) => {

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

    return <tr key={"ALU-" + alumnoIndex}>
        <th>A<sub>{alumnoIndex}</sub></th>
        <td>{alumnoDatos?.[0]}</td>
        <td>{alumnoDatos?.[1]}</td>
        <td>{alumnoDatos?.[2]}</td>
        <td><Link to={`/alumnos/${alumnoAddr}`}>Info</Link></td>
    </tr>;
};

export default AlumnoRow;
