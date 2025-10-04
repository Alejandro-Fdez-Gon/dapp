import CrearEvaluacion from "./CrearEvaluacion.jsx";
import EvaluacionesList from "./EvaluacionesList/index.jsx";

import EstaCerrada from '../roles/EstaCerrada.jsx';
import SoyCoordinador from '../roles/SoyCoordinador.jsx';

// Componente encargado de devolver la pagina Evaluaciones
const EvaluacionesPage = () => (
    <section className="AppEvaluaciones">
        <h2>Evaluaciones</h2>

        <EvaluacionesList/>

        <EstaCerrada>
            <SoyCoordinador>
                <CrearEvaluacion/>
            </SoyCoordinador>
        </EstaCerrada>
        
    </section>
);

export default EvaluacionesPage;