import EvaluacionesHead from "./EvaluacionesHead.jsx";
import EvaluacionesBody from "./EvaluacionesBody.jsx";

// Componente encargado de listar las evaluaciones de la asignatura
const EvaluacionesList = () => (
    <section className="AppEvaluaciones">
        <h3>Todas las Evaluaciones</h3>

        <table>
            <EvaluacionesHead/>
            <EvaluacionesBody/>
        </table>
    </section>
);

export default EvaluacionesList;
