import CalificacionesTotal from "./CalificacionesTotal/index.jsx";
import Calificar from "./Calificar.jsx";

import SoyProfCoord from "../roles/SoyProfCoord.jsx";
import SoyProfesor from "../roles/SoyProfesor.jsx";

// Componente encargado de devolver la pagina Calificaciones
const CalificacionesPage = () => {

    return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>

            <SoyProfCoord>
                <CalificacionesTotal/>
            </SoyProfCoord>

            <SoyProfesor>
                <Calificar/>
            </SoyProfesor>

        </section>
    );
};

export default CalificacionesPage;
