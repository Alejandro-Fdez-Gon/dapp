import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de representar los datos extra de la cuenta de un alumno
const MisDatos = () => {

    // Constante donde se obtiene la cuenta
    const account = useAccount();

    // Obtenemos la informacion del alumno del contrato
    const {
        data: yoComoAlumno
    } = useReadContract({
      ...asignatura,
        account: account.address,
        functionName: 'quienSoy',
        args: []
    });

    return (<article className="AppMisDatos">
        <h3>Mis Datos</h3>

        <ul>
            <li>Nombre: <span style={{color: "blue"}}>{yoComoAlumno?.[0]}</span></li>
            <li>DNI: <span style={{color: "blue"}}>{yoComoAlumno?.[1]}</span></li>
            <li>Email: <span style={{color: "blue"}}>{yoComoAlumno?.[2]}</span></li>
        </ul>
    </article>);
};

export default MisDatos;
