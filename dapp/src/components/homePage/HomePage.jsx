import CambiarCoord from './CambiarCoord.jsx';
import Cerrar from './Cerrar.jsx';
import Coordinador from './Coordinador.jsx';
import Estado from './Estado.jsx';
import Owner from './Owner.jsx';

import EstaCerrada from '../roles/EstaCerrada.jsx';
import SoyCoordinador from '../roles/SoyCoordinador.jsx';
import SoyOwner from '../roles/SoyOwner.jsx';

// Componente encargado de devolver la pagina Home
function HomePage() {
    return (
        <section className="AppHome">
            <h2>Página Home de la Asignatura Full</h2>
            
            <h3>Datos de la asignatura</h3>

            <ul>
                <Owner/>
                <Coordinador/>
                <Estado/>
            </ul>
            
            <EstaCerrada>
                <SoyOwner>
                    <CambiarCoord/>
                </SoyOwner> 
            </EstaCerrada>                      
            
            <SoyCoordinador>
                <Cerrar/>
            </SoyCoordinador>
        
        </section>
    );
}

export default HomePage;
