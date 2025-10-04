import {useAccount, useReadContract} from 'wagmi'
import asignatura from "../../Asignatura.json";

// Componente encargado de controlar si la cuenta es un alumno
const SoyAlumno = ({children}) => {
    const account = useAccount();
    const {
        data: alumnoDatos
    } = useReadContract({
        ...asignatura,
        functionName: 'datosAlumno',
        args: [account.address]
    });

    if (!alumnoDatos?.[0]) {
        return null
    }
    return <>
        {children}
    </>
};

export default SoyAlumno;
