import AñadirProf from "./AñadirProf.jsx";
import ProfesoresList from "./ProfesoresList/index.jsx";

import EstaCerrada from '../roles/EstaCerrada.jsx';
import SoyOwner from '../roles/SoyOwner.jsx';

// Componente encargado de devolver la pagina Profesores
const ProfesoresPage = () => (
    <section className="AppProfesores">
        <h2>Profesores</h2>

        <ProfesoresList/>
        
        <EstaCerrada>
            <SoyOwner>
                <AñadirProf/>
            </SoyOwner>
        </EstaCerrada>
        
    </section>
);

export default ProfesoresPage;
