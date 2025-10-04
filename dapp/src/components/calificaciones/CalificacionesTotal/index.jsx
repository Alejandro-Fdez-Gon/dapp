import CalificacionesHead from "./CalificacionesHead.jsx";
import CalificacionesBody from "./CalificacionesBody.jsx";

// Componente encargado de listar las calificaciones de la asignatura
const CalificacionesTotal = () => (
    <section className="AppCalificaciones">
        <h3>Todas las Calificaciones</h3>
        
        <table>
            <CalificacionesHead/>
            <CalificacionesBody/>
        </table>
    </section>
);

export default CalificacionesTotal;
