import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de controlar si la cuenta es un coordinador o profesor
const SoyProfCoord = ({children}) => {

    // Constante donde se obtiene la cuenta
    const account = useAccount();

    // Obtenemos al profesor del contrato
    const {
        data: profesor
    } = useReadContract({
        ...asignatura,
        functionName: 'datosProfesor',
        args: [account.address]
    });

    // Obtenemos al coordinador del contrato
    const {
        data: coordinador
    } = useReadContract({
        ...asignatura,
        functionName: 'coordinador'
    });

    const esCoordinador = coordinador?.toLowerCase() === account?.address?.toLowerCase();
    const esProfesor = profesor?.[0];

    if (!esCoordinador && !esProfesor) {
        return null;
    }
    return <>
        {children}
    </>

};

export default SoyProfCoord;
