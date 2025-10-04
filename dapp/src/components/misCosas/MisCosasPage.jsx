import MiCuenta from "./MiCuenta.jsx";
import MisDatos from "./MisDatos.jsx";
import MisNotas from "./MisNotas.jsx";

import SoyAlumno from "../roles/SoyAlumno";

// Componente encargado de devolver la pagina MisCosas
const MisCosasPage = () => {

    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>

        <MiCuenta/>
        <SoyAlumno>
            <MisDatos/>
            <MisNotas/>
        </SoyAlumno>

    </section>;
}

export default MisCosasPage;

