import {useAccount, useReadContract} from 'wagmi'
import asignatura from "../../Asignatura.json";

const SoyCoordinador = ({children}) => {
    const account = useAccount();

    const {
        data: coordinador
    } = useReadContract({
        ...asignatura,
        functionName: 'coordinador'
    });

    if (coordinador?.toLowerCase() !== account?.address?.toLowerCase()) {
        return null;
    }
    return <>
        {children}
    </>

};

export default SoyCoordinador;
