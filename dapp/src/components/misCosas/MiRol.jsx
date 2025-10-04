import SoyAlumno from '../roles/SoyAlumno';
import SoyCoordinador from '../roles/SoyCoordinador';
import SoyOwner from '../roles/SoyOwner';
import SoyProfesor from '../roles/SoyProfesor';

// Componente encargado de identificar el rol de la cuenta
const MiRol = () => {
    
    return <>
        <SoyOwner>
            <li>Rol: <span style={{color: "blue"}}>Owner</span></li>
        </SoyOwner>
        <SoyCoordinador>
            <li>Rol: <span style={{color: "blue"}}>Coordinador</span></li>
        </SoyCoordinador>
        <SoyProfesor>
            <li>Rol: <span style={{color: "blue"}}>Profesor</span></li>
        </SoyProfesor>
        <SoyAlumno>
            <li>Rol: <span style={{color: "blue"}}>Alumno</span></li>
        </SoyAlumno>
    </>
};

export default MiRol;
