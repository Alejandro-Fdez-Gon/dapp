// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Asignatura {
    /// Version Full.
    string public version = "Full";

    /******************************************************************** */
    // Propiedades
    /******************************************************************** */
    
    /// Propiedad que representa al coordinador de la asignatura.
    address public coordinador;

    /// Propiedad que representa a la persona que crea/despliega el contrato.
    address public owner;
    
    /// Propiedad que representa si una asignatura esta o no cerrada.
    bool    public cerrada;

    /// Propiedad que representa el nombre de una asignatura.
    string  public nombre;

    /// Propiedad que representa el curso de una asignatura.
    string  public curso;

    /// Propiedad que representan los estado de una nota; sin usar, no presentado, y nota normal.
    enum TipoNota {Empty, NP, Normal}

    /// Propiedad que representan los datos de un alumno.
    struct DatosAlumno {
        string nombre;
        string dni;
        string email;
    }

    /// Propiedad que representan los datos de una evaluación.
    struct Evaluacion {
        string nombre;
        uint fecha;
        uint porcentaje;
        uint minimo;
    }

    /// Propiedad que representan los datos de una nota. La calificacion esta multiplicada por 100 porque no hay decimales.
    struct Nota {
        TipoNota tipo;
        uint calificacion;
    }

    /******************************************************************** */
    // Mappings y arrays
    /******************************************************************** */
    
    /// Mapping dada la direccion de un alumno devuelve los datos de un alumno.
    mapping (address => DatosAlumno) public datosAlumno;

    /// Mapping dada la direccion de un profesor devuelve los datos de un profesor.
    mapping (address => string) public datosProfesor;

    /// Mapping dada la direccion de un alumno, y el indice de la evaluacion, devuelve la nota del alumno.
    mapping (address => mapping (uint => Nota)) public calificaciones;

    /// Mapping dada el dni devuelve si ha sido usado o no.
    mapping (string => bool) private dnisUsados;
    
    /// Array de direcciones de los alumnos matriculados.
    address[] public matriculas;

    /// Array de direcciones de los profesores.
    address[] public profesores;

    /// Array de evaluaciones de las evaluaciones
    Evaluacion[] public evaluaciones;
      
    /******************************************************************** */
    // Eventos
    /******************************************************************** */
    
    /// Evento que ocurre cuando se cierra una asignatura.
    event AsignaturaCerrada();

    /// Evento que ocurre cuando se crea o modifica una calificacion.
    event Calificacion(address alumno, uint evaluacion, TipoNota tipo, uint calificacion);
    
    /// Evento que ocurre cuando se cambia el coordinador de una asignatura.
    event CoordinadorAsignado(address addr);

    /// Evento que ocurre cuando se crea una evaluacion.
    event EvaluacionCreada(uint evaluacion, string nombre, uint fecha, uint porcentaje, uint minimo);
    
    /// Evento que ocurre cuando se matricula a un alumno (matricula o automatricula).
    event MatriculaCreada(address addr, string nombre, string email, string dni);

    /// Evento que ocurre cuando añade un profesor a una asignatura.
    event ProfesorCreado(address addr, string nombre);

    /******************************************************************** */
    // Constructor
    /******************************************************************** */
    
    /** Constructor.
     * @param _nombre Nombre de la asignatura.
     * @param _curso  Curso academico.
     */
    constructor(string memory _nombre, string memory _curso) {
        if (bytes(_nombre).length == 0) {
            revert NombreAsignaturaVacioError();
        }
        if (bytes(_curso).length == 0) {
            revert CursoAsignaturaVacioError();
        }

        owner = msg.sender;
        nombre = _nombre;
        curso = _curso;
    }

    /******************************************************************** */
    // Funciones
    /******************************************************************** */
    
    /** Funcion para que los alumnos se automatriculen.
     *      Solo puede utilizarlo los alumnos no matriculados y si la asignatura esta abierta.
     * @param _nombre El nombre del alumno.
     * @param _email  El email del alumno.
     * @param _dni    El email del alumno.
     */
    function automatricula(string memory _nombre, string memory _dni, string memory _email) soloNoMatriculados soloAbierta public {
        _matricular(msg.sender, _nombre, _dni, _email);
    }

    /** Funcion para que los un owner matricule a un alumno.
     *      Solo puede utilizarlo los owner.
     * @param _addr   La direccion del alumno.
     * @param _nombre El nombre del alumno.
     * @param _email  El email del alumno.
     * @param _dni    El email del alumno.
     */
    function matricular(address _addr, string memory _nombre, string memory _dni, string memory _email) public soloOwner {
        _matricular(_addr, _nombre, _dni, _email);
    }

    /** Funcion auxiliar para hacer los dos tipos de matriculación.
     * @param _addr   La direccion del alumno.
     * @param _nombre El nombre del alumno.
     * @param _email  El email del alumno.
     * @param _dni    El email del alumno.
     */
    function _matricular(address _addr, string memory _nombre, string memory _dni, string memory _email) private {
        if (bytes(_nombre).length == 0) {
            revert NombreAlumnoVacioError(_addr);
        }
        if (bytes(_dni).length == 0) {
            revert DNIAlumnoVacioError(_addr);
        }
        if (dnisUsados[_dni]) {
            revert DNIDuplicadoError(_addr, _dni);
        }

        DatosAlumno memory datos = DatosAlumno(_nombre, _dni, _email);
        datosAlumno[_addr] = datos;
        matriculas.push(_addr);
        dnisUsados[_dni] = true;
        emit MatriculaCreada(_addr, _nombre, _email, _dni);
    }

    /** Funcion para obtener el numero de alumnos matriculados.
     * @return uint Numero de alumnos matriculados.
     */
    function matriculasLength() public view returns(uint) {
        return matriculas.length;
    }

    /** Funcion que a un alumno matriculado obtener sus propios datos.
     *      Solo puede utilizarlo los alumnos matriculados.
     * @return _nombre El nombre del alumno que invoca el metodo.
     * @return _dni    El dni del alumno que invoca el metodo.
     * @return _email  El email del alumno que invoca el metodo.
     */
    function quienSoy() soloMatriculados public view returns (string memory _nombre, string memory _dni, string memory _email) {
        DatosAlumno memory datos = datosAlumno[msg.sender];
        _nombre = datos.nombre;
        _dni = datos.dni;
        _email = datos.email;
    }

    /** Función para comprobar si un alumno esta matriculado.
     * @param  alumno La direccion de un alumno.
     * 
     * @return bool   True si es un alumno matriculado.
     */
    function estaMatriculado(address alumno) private view returns (bool) {
        string memory _nombre = datosAlumno[alumno].nombre;
        return bytes(_nombre).length != 0;
    }  

    /** Función para crear una evaluación en una asignatura.
     *      Solo puede utilizarlo los profesores o cordinadores y debe estar abierto.
     * @param  _nombre     El nombre de la evaluacion.
     * @param  _fecha      La fecha de evaluacion (segundos desde el 1/1/1970).
     * @param  _porcentaje El porcentaje de puntos que proporciona a la nota final.
     * @param  _minimo     La nota minima para aprobar la asignatura.

     * @return uint        La posicion en el array evaluaciones.
     */
    function creaEvaluacion(string memory _nombre, uint _fecha, uint _porcentaje, uint _minimo) soloCoordinador soloAbierta public returns (uint) {
        if (bytes(_nombre).length == 0) {
            revert NombreEvaluacionVacioError();
        }

        evaluaciones.push(Evaluacion(_nombre, _fecha, _porcentaje, _minimo));
        emit EvaluacionCreada(evaluaciones.length - 1, _nombre, _fecha, _porcentaje, _minimo);
        return evaluaciones.length - 1;
    }

    /** Funcion para obtener el numero de evaluaciones creadas.
     * @return uint Numero de evaluaciones creadas.
     */
    function evaluacionesLength() public view returns(uint) {
        return evaluaciones.length;
    }

    /** Función para poner la nota de un alumno en una evaluacion.
     *      Solo puede utilizarlo los profesores y cuando esta abierto
     * @param alumno        La direccion del alumno.
     * @param evaluacion    El indice de una evaluacion en el array evaluaciones.
     * @param tipo          Tipo de nota.
     * @param calificacion  La calificacion, multipilicada por 100 porque no hay decimales.
     */
    function califica(address alumno, uint evaluacion, TipoNota tipo, uint calificacion) soloProfesor soloAbierta public {
        if (!estaMatriculado(alumno)) {
            revert AlumnoNoExisteError(alumno);
        }
        if (evaluacion >= evaluaciones.length) {
            revert EvaluacionNoexisteError(evaluacion);
        }
        if (calificacion > 1000) {
            revert CalificacionNoValidaError(alumno, evaluacion, calificacion);
        }

        Nota memory nota = Nota(tipo, calificacion);
        calificaciones[alumno][evaluacion] = nota;
        emit Calificacion(alumno, evaluacion, tipo, calificacion);
    }

    /** Función para obtener la nota de un alumno.
     *      Solo puede utilizarlo los alumnos matriculados
     * @param  evaluacion   Indice de una evaluacion en el array de evaluaciones.
     * 
     * @return tipo         El tipo de nota que ha sacado el alumno.
     * @return calificacion La calificacion que ha sacado el alumno.
     */
    function miNota(uint evaluacion) soloMatriculados public view returns (TipoNota tipo, uint calificacion) {
        if (evaluacion >= evaluaciones.length) {
            revert EvaluacionNoexisteError(evaluacion);
        }

        Nota memory nota = calificaciones[msg.sender][evaluacion];
        tipo = nota.tipo;
        calificacion = nota.calificacion;
    } 

    /** Función para obtener la nota final de un alumno por parte de un alumno.
     *      Solo puede utilizarlo los alumnos matriculados.
     * @return TipoNota Estado de la asignatura.
     * @return uint     Calificacion final de la asignatura.
     */
    function miNotaFinal() public soloMatriculados view returns (TipoNota, uint) {
        return _notaFinal(msg.sender);
    }

    /** Función para obtener la nota final de un alumno por parte de un cordinador.
     *      Solo puede utilizarlo los coordinadores.
     * @param  _addr    La dirección del alumno.
     *
     * @return TipoNota Estado de la asignatura.
     * @return uint     Calificacion final de la asignatura.
     */
    function notaFinal(address _addr) public soloCoordinador view returns (TipoNota, uint) {
        return _notaFinal(_addr);
    }

    /** Función auxiliar para obtener la nota final de un alumno.
     * @param  _addr    La dirección del alumno.
     *
     * @return TipoNota Estado de la asignatura.
     * @return uint     Calificacion final de la asignatura.
     */
    function _notaFinal(address _addr) private view returns (TipoNota, uint) {
        uint totalNota = 0;
        uint totalPorcentaje = 0;
        uint tieneNP = 0;
        
        for (uint i = 0; i < evaluaciones.length; i++) {
            Nota memory nota = calificaciones[_addr][i];
            if (nota.tipo == TipoNota.Empty) {
                return (TipoNota.Empty, 0);
            }

            if (nota.tipo == TipoNota.NP) {
                tieneNP += 1;
                totalPorcentaje += evaluaciones[i].porcentaje;
            } else {
                totalNota += nota.calificacion * evaluaciones[i].porcentaje;
                totalPorcentaje += evaluaciones[i].porcentaje;
            }
        }

        if (tieneNP == evaluaciones.length) {
            return (TipoNota.NP, 0);
        }

        uint notaDef = totalNota / totalPorcentaje;
        if (notaDef > 499 && tieneNP>0) {
            notaDef = 499;
        }

        return (TipoNota.Normal, notaDef);
    }

    /** Función para asignar un coordinador.
     *      Solo lo puede utilizar un owner y si la asignatura esta abierta.
     * @param addr La direccion de un coordinador.
     */
    function setCoordinador(address addr) public soloOwner soloAbierta {
        coordinador = addr;
        emit CoordinadorAsignado(addr);
    }

    /** Función para añadir un profesor.
     *      Solo puede utilizarlo los owner.
     * @param _addr   La direccion de un profesor.
     * @param _nombre El nombre del profesor.
     */
    function addProfesor(address _addr, string memory _nombre) public soloOwner soloAbierta {
        if (bytes(_nombre).length == 0) {
            revert NombreProfesorVacioError(_addr);
        }
        if (bytes(datosProfesor[_addr]).length != 0) {
            revert ProfesorYaExisteError(_addr);
        }

        datosProfesor[_addr] = _nombre;
        profesores.push(_addr);
        emit ProfesorCreado(_addr, _nombre);
    }

    /** Funcion para obtener el numero de profesores.
     * @return uint Numero de profesores.
     */
    function profesoresLength() public view returns(uint) {
        return profesores.length;
    }

    /** Función para cerrar una asignatura.
     *      Solo puede utilizarla los coordinadores.
     */
    function cerrar() public soloCoordinador {
        cerrada = true;
        emit AsignaturaCerrada();
    }
    
    /******************************************************************** */
    // Modificadores
    /******************************************************************** */
    
    /// Modificador para que una funcion solo pueda ejecutarse si la asignatura esta abierta.
    modifier soloAbierta() {
        if (cerrada) {
            revert AsignaturaCerradaError();
        }
        _;
    }
    
    /// Modificador para que una funcion solo pueda ejecutarla un coordinador.
    modifier soloCoordinador() {
        if (msg.sender != coordinador) {
            revert PermisosError(msg.sender, "Solo permitido a coordinadores");
        }
        _;
    }

    /// Modificador para que una funcion solo pueda ejecutarla un alumno matriculado.
    modifier soloMatriculados() {
        if (!estaMatriculado(msg.sender)) {
            revert PermisosError(msg.sender, "Solo permitido a matriculados");
        }
        _;
    }

    /// Modificador para que una funcion solo pueda ejecutarla un alumno no matriculado.
    modifier soloNoMatriculados() {
        if (estaMatriculado(msg.sender)) {
            revert PermisosError(msg.sender, "Solo permitido a no matriculados");
        }
        _;
    }
    
    /// Modificador para que una funcion solo pueda ejecutarla un owner.
    modifier soloOwner() {
        if (msg.sender != owner) {
            revert PermisosError(msg.sender, "Solo permitido a owners");
        }
        _;
    }

    /// Modificador para que una funcion solo pueda ejecutarla un profesor.
    modifier soloProfesor() {
        if (bytes(datosProfesor[msg.sender]).length == 0) {
            revert PermisosError(msg.sender, "Solo permitido a profesores");
        }
        _;
    }

    /******************************************************************** */
    // Receive para evitar transacciones
    /******************************************************************** */
    receive() external payable {
        revert DineroError(msg.sender);
    }

    /******************************************************************** */
    //Errores
    /******************************************************************** */
    
    /// Error utilizado cuando se intenta hacer una operacion sobre un alumno no existente.
    error AlumnoNoExisteError(address addr);

    /// Error utilizado cuando se intenta realizar una operación que solo se permite en asignaturas abiertas.
    error AsignaturaCerradaError();

    /// Error utilizado cuando se pasa un valor de nota inválido.
    error CalificacionNoValidaError(address alumno, uint evaluacionId, uint calificacion);
    
    /// Error utilizado cuando se intenta construir una asignatura con un curso vacio.
    error CursoAsignaturaVacioError();

    /// Error utilizado cuando se intenta hacer la matrícula de un alumno usando un DNI vacio.
    error DNIAlumnoVacioError(address addr);

    /// Error utilizado cuando se intenta hacer la matricula de un alumno usando un DNI ya existente.
    error DNIDuplicadoError(address addr, string dni);

    /// Error utilizado cuando se intenta enviar dinero al contrato.
    error DineroError(address addr);

    /// Error utilizado cuando se intenta usar una evaluación inexistente.
    error EvaluacionNoexisteError(uint evaluacionId);

    /// Error utilizado cuando se intenta hacer la matrícula de un alumno usando un nombre vacio.
    error NombreAlumnoVacioError(address addr);

    /// Error utilizado cuando se intenta construir una asignatura con un nombre vacio.
    error NombreAsignaturaVacioError();

    /// Error utilizado cuando se intenta añadir una evaluación con un nombre vacio.
    error NombreEvaluacionVacioError();

    /// Error utilizado cuando se intenta añadir un profesor con un nombre vacio.
    error NombreProfesorVacioError(address addr);

    /// Error utilizado cuando se intenta ejecutar un método para el que no se tiene permiso.
    error PermisosError(address addr, string detalles);

    /// Error utilizado cuando se intenta añadir un profesor que ya ha sido añadido.
    error ProfesorYaExisteError(address addr);
}