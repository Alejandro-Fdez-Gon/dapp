import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de controlar si la cuenta es un profesor
const SoyProfesor = ({children}) => {

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

    if (!profesor?.[0]) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoyProfesor;
