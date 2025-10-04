import AlumnosList from "./AlumnosList/index.jsx";
import Automatricula from "./Automatricula.jsx";
import Matricular from "./Matricular.jsx";

import EstaCerrada from '../roles/EstaCerrada.jsx';
import SoyNadie from '../roles/SoyNadie.jsx';
import SoyOwner from '../roles/SoyOwner.jsx';
import SoyOwnProfCoord from '../roles/SoyOwnProfCoord.jsx';

// Componente encargado de devolver la pagina Alumnos
const AlumnosPage = () => (
    <section className="AppAlumnos">
        <h2>Alumnos</h2>

        <SoyOwnProfCoord>
            <AlumnosList/>
        </SoyOwnProfCoord>
        
        <EstaCerrada>
            <SoyOwner>
                <Matricular/>
            </SoyOwner>
        </EstaCerrada>
        
        <EstaCerrada>
            <SoyNadie>
                <Automatricula/>
            </SoyNadie>
        </EstaCerrada>
        
    </section>
);

export default AlumnosPage;