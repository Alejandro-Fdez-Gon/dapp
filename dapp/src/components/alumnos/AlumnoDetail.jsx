import {useParams, Link} from "react-router-dom";
import {useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de detallar la informacion de un alumno
const AlumnoDetail = () => {

    // Obtenemos lla direccion del alumno de la ruta
    let {addr} = useParams();

    // Obtenemos al alumno del contrato
    const {
        data: alumnoDatos
    } = useReadContract({
        ...asignatura,
        functionName: 'datosAlumno',
        args: [addr]
    });

    return <>
        <header className="AppAlumno">
            <h2>Alumno Info</h2>
        </header>
        <ul>
            <li><b>Nombre:</b> {alumnoDatos?.[0] ?? "Desconocido"}</li>
            <li><b>Email:</b> {alumnoDatos?.[1] ?? "Desconocido"}</li>
            <li><b>Address:</b> {addr}</li>
        </ul>
        <Link to="/alumnos">Volver</Link>
    </>
};

export default AlumnoDetail;