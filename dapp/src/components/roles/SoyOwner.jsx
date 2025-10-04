import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

const SoyOwner = ({children}) => {

    const account = useAccount();

    const {
        data: owner
    } = useReadContract({
        ...asignatura,
        functionName: 'owner'
    });

    if (owner?.toLowerCase() !== account?.address?.toLowerCase()) {
        return null;
    }
    return <>
        {children}
    </>

};

export default SoyOwner;
