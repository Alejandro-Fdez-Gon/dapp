import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

// Componente encargado de controlar si la cuenta es un owner, coordinador o profesor
const SoyOwnProfCoord = ({children}) => {

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

    // Obtenemos al owner del contrato
    const {
        data: owner
    } = useReadContract({
        ...asignatura,
        functionName: 'owner'
    });

    const esOwner = owner?.toLowerCase() === account?.address?.toLowerCase();
    const esCoordinador = coordinador?.toLowerCase() === account?.address?.toLowerCase();
    const esProfesor = profesor?.[0];

    if (!esCoordinador && !esProfesor && !esOwner) {
        return null;
    }
    return <>
        {children}
    </>

};

export default SoyOwnProfCoord;
