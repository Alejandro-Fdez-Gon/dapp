import AlumnosHead from "./AlumnosHead.jsx";
import AlumnosBody from "./AlumnosBody.jsx";

// Componente encargado de listar los alumnos de la asignatura
const AlumnosList = () => (
    <section className="AppAlumnos">
        <h3>Todos los Alumnos</h3>
        
        <table>
            <AlumnosHead/>
            <AlumnosBody/>
        </table>
    </section>
);

export default AlumnosList;