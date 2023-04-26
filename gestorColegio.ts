const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const readLineSync = require ("readline-sync")
const {verificarExitencia, escribir, leer, guardar, preguntarDato,seleccionarCurso,seleccionarMaterias,eliminarEntidad,crearlistaDeUnaEntidad } = require('./funciones.ts')

import { stringify } from "querystring";
import Alumno from "./Alumno";
import Materia from "./Materia";
import Profesor from "./Profesor";
import { clear, log } from "console";
import Curso from "./Curso";
import NotaPorMateria from "./notaPorMateria";

// Se crean las materias de primer año:
const naturales:Materia = new Materia("Naturales","ab16");
const matematicas:Materia = new Materia("Matematicas","cd26");
const fisica:Materia = new Materia("Fisica","ef36");
const anatomia:Materia = new Materia("Anatomia","gh46");

// Se crean las materias de segundo año:
const algebra:Materia = new Materia("Algebra","ij56");
const filosofia:Materia  = new Materia("Filosofia","kl66");
const biologia:Materia  = new Materia("Biologia","mn76");
const historia:Materia  = new Materia("Historia","op86");

// Se crean las materias de tercer año:
const geografia:Materia = new Materia("Geografia","qr96");
const literatura:Materia  = new Materia("Literatura","st06");
const edFi:Materia  = new Materia("EdFi","uv00");
const ingles:Materia  = new Materia("Ingles","wx17");

// Se crean las materias de cuarto año:
const arte:Materia = new Materia("Arte","yz90");
const economia:Materia  = new Materia("Economia","ca27");
const finanzas:Materia  = new Materia("Finanzas","db37");
const quimica:Materia  = new Materia("Quimica","ec47");

//Se crean materias de quinto año:
const tutoria:Materia = new Materia("Tutoria","jf57");
const emprendedorismo:Materia  = new Materia("Emprendedorismo","qm67");
const turismo:Materia  = new Materia("Turismo","sa87");
const programacion:Materia  = new Materia("Programacion","ik97");

//Se crean materias de sexto año:
const ntics:Materia = new Materia("Ntics","wd07");
const fip:Materia  = new Materia("Fip","zb18");
const administracion:Materia  = new Materia("Administracion","yg28");
const comunicacion:Materia  = new Materia("Comunicacion","pn38");

// Guardamos las materias de cada curso en su respectivo arraydeMaterias:

const materiasDePrimero:Materia[]=[naturales,matematicas,fisica,anatomia];
const materiasDeSegundo:Materia[]=[algebra,filosofia,biologia,historia];
const materiasDeTercero:Materia[]=[geografia,literatura,edFi,ingles];
const materiasDeCuarto:Materia[]=[arte,economia,finanzas,quimica];
const materiasDeQuinto:Materia[]=[tutoria,emprendedorismo,turismo,programacion];
const materiasDeSexto:Materia[]=[ntics,fip,administracion,comunicacion];

// Creamos los cursos con su "nombre" y las materias que lo componen:
let primero:Curso= new Curso("Primero",materiasDePrimero);
let segundo:Curso= new Curso("Segundo",materiasDeSegundo);
let tercero:Curso= new Curso("Tercero",materiasDeTercero);
let cuarto:Curso= new Curso("Cuarto",materiasDeCuarto);
let quinto:Curso= new Curso("Quinto",materiasDeQuinto);
let sexto:Curso= new Curso("Sexto",materiasDeSexto);

// creo un array de cursos, donde hardcodeamos los creados anteriormente:
let cursos: Curso[]= [primero,segundo,tercero,cuarto,quinto,sexto]

// ------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------

export default class GestorColegio {


    crearAlumno() {
        // ejecuto la funcion preguntarDato que recibe por parametro la entidad (en este caso Alumno) y el dato a obtener. retorna un string, pero en edad y dni  lo convierto a number con parseInt. 
        let nombre:string = preguntarDato("Alumno","NOMBRE");
        let apellido:string = preguntarDato("Alumno","APELLIDO");
        let fechaDeNacimiento:Date = new Date(preguntarDato("Alumno","fecha de nacimiento(YYYY/MM/DD)"));
        let dni:number = parseInt(preguntarDato("Alumno","DNI"));

        // ejecuto la funcion "seleccionarCurso" (ambito Global) y el retorno se guarda en la variable cursoElegido 
        const cursoElegidoAlumno:Curso = seleccionarCurso(cursos,"Seleccione el curso: ");
        console.clear();

        //se le asigna a idAlumno una id aleatoria de 7 caracteres:
        let idAlumno:string = uuidv4().slice (0,7); 

        //ejecuto la funcion seleccionarMaterias(ambito global),que recibe por parametro un curso y la indicacion. Retorna las materias seleccionadas por consola de ese curso.
        const materiasMatriculado:Materia[]= seleccionarMaterias(cursoElegidoAlumno, "Seleccione las materias a las que se desea matricular (Ingrese 0 una vez que finalice): ")
        console.clear();
        
        // creo un array donde se almacenaran los objetos "NotaPorMateria", los cuales tienen dos propiedades: nombre y nota.
        const notasPorTodasLasMaterias: NotaPorMateria[]=[];
        
        // ciclo for para recorrer el array de materiasMatriculado del alumno:
        for (let i = 0; i < materiasMatriculado.length; i++) {
            // por cada iteracion le brindo el nombre de la materia, para que el usuario ingrese la nota de la misma:
            let nota = Number(readLineSync.question(`Escriba la nota de la materia ${materiasMatriculado[i].nombre}: `));
            // creo un objeto "notaPorMateria" que recibe por parametro el nombre de la materia(lo saco del array"materiasMatriculado:string") y la nota que le asigno anteriormente:
            const nuevaNotaPorMateria: NotaPorMateria = new NotaPorMateria(materiasMatriculado[i],nota)
            // hago un push de el objeto en el array creado al principio(notasPorTodasLasMaterias)
            notasPorTodasLasMaterias.push(nuevaNotaPorMateria)
            console.clear();
        }


        // en el acumulador se almacena la suma de todas las notas por materia y es dividida por la cantidad de las mismas para sacar el promedio, el cual se almacena en una variable.
        let acumulador:number = 0
        for (let i = 0; i < notasPorTodasLasMaterias.length; i++) {
            acumulador = acumulador+ notasPorTodasLasMaterias[i].nota
        }
        let promedioGeneral:number = acumulador / notasPorTodasLasMaterias.length
        

        // creo el objeto alumno con todos los datos obtenidos anteriormente:
        const nuevoAlumno: Alumno = new Alumno (nombre, apellido, fechaDeNacimiento, dni,idAlumno, cursoElegidoAlumno, materiasMatriculado, notasPorTodasLasMaterias, promedioGeneral);

        return nuevoAlumno;
    }

    modificarAlumno(){
        // verificamos si el archivo donde se encuentran los alumnos existe:
        if(verificarExitencia("./Data/alumnos.json")){
        // guardoamos los alumnos en un array (convertidos a objetos)
        let arrayDeModificarAlumnos: Alumno[]= leer("./Data/alumnos.json")
        // pregunto la id de el alumno a buscar:
        let idAlumno:string =preguntarDato("Alumno a Modificar","ID");
        // busco el alumno indicado en el array de Alumnos:
        let indice: number = arrayDeModificarAlumnos.findIndex(alumno => alumno.id == idAlumno);
        // en caso de que no lo encuentre retorna -1:
        if (indice === -1) {
           console.clear();
           console.log(chalk.redBright(`La Id: ${idAlumno} NO pertenece a ningun Alumno en el sistema`))
           console.log("");
        // si retorna >= 0 (indice del alumno encontrado):   
        }else if(indice >= 0){
        // menu de opciones para modificar al alumno.
         let opcionesAmodificar:string[] =[chalk.greenBright(`Modificar Nombre`),chalk.greenBright(`Modificar Apellido`),chalk.greenBright(`Modificar Fecha De Nacimiento`),chalk.greenBright(`Modificar Dni`),chalk.greenBright(`Modificar Curso`),chalk.greenBright(`Modificar Materias Matriculado`),chalk.greenBright(`Modificar Nota Por Materia`)]
        // muestro por consola en nombre y apelllido del alumno, para que mas intuitivo:
         console.log(chalk.whiteBright(`Alumno: ${arrayDeModificarAlumnos[indice].nombre}, ${arrayDeModificarAlumnos[indice].apellido}`));
        // le digo que seleccione una opcion del menu anterior:
        let valor = readLineSync.keyInSelect(opcionesAmodificar, chalk.bold.bgWhiteBright.black(`Seleccione la opcion a modificar del Alumno `));
        // creamos un switch con los casos que corresponda a la opcion elegida:
         switch (valor) {
           case 0:
               console.clear();
               let datoNombre:string = preguntarDato("Alumno",`Nuevo NOMBRE`);
               arrayDeModificarAlumnos[indice].nombre = datoNombre;
               console.clear();
               console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: NOMBRE a ${datoNombre}`));
               console.log("");
               break;
           case 1:
               console.clear();
               let datoApellido:string = preguntarDato("Alumno",`Nuevo APELLIDO`);
               arrayDeModificarAlumnos[indice].apellido= datoApellido
               console.clear();
               console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: APELLIDO a ${datoApellido}`));
               console.log("");
           
               break;
           case 2:
               console.clear();
               let datofechaDeNacimiento:string = preguntarDato("Alumno",`Nueva Fecha de nacimiento (YYYY/MM/DD)`);
               arrayDeModificarAlumnos[indice].fechaDeNacimiento =new Date (datofechaDeNacimiento);  
               console.clear();
               console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: Fecha de nacimiento a ${datofechaDeNacimiento}`)); 
               console.log("");
                  
               break;

            case 3:
                console.clear();
                let datoDni:string = preguntarDato("Alumno",`Nuevo DNI`);
                arrayDeModificarAlumnos[indice].dni = parseInt(datoDni);
                console.clear();  
                console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: DNI a ${datoDni}`));
                console.log("");      
                break;

           case 4:
               console.clear();
               let cursoAModificar:Curso = seleccionarCurso(cursos, `Seleccione nuevo curso del Alumno`)

               arrayDeModificarAlumnos[indice].curso = cursoAModificar
               console.clear();
               console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: CURSO del Alumno`));
                
            // si cambia de curso, por consecuencia cambia de materias:

                let materiasDelnuevoCurso:Materia[]= seleccionarMaterias(arrayDeModificarAlumnos[indice].curso,`Seleccione las Nuevas Materias a las que se desea Matricular: `)

                arrayDeModificarAlumnos[indice].materiasMatriculado = materiasDelnuevoCurso;

                console.clear();

                console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: Materias del Alumno`));

            // si cambia de materias, por consecuencia cambia de nota por materia.

                const notasDeLasNuevasMaterias: NotaPorMateria[]=[];
        
                for (let i = 0; i < arrayDeModificarAlumnos[indice].materiasMatriculado.length; i++) {
            
                let nota = Number(readLineSync.question(`Escriba la nota de la materia ${arrayDeModificarAlumnos[indice].materiasMatriculado[i].nombre}: `));
            
                const nuevaNotaPorMateria: NotaPorMateria = new NotaPorMateria(arrayDeModificarAlumnos[indice].materiasMatriculado[i],nota)
           
                notasDeLasNuevasMaterias.push(nuevaNotaPorMateria)

                console.clear();
                }

             arrayDeModificarAlumnos[indice].notaPorMateria = notasDeLasNuevasMaterias;
             console.clear();
             console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: Nota por Materia del Alumno`));
             console.log("");
            

            // si cambia de nota por materia, por consecuencia cambia de promedio:
                let acumulador:number = 0
                for (let i = 0; i < notasDeLasNuevasMaterias.length; i++) {
                acumulador = acumulador+ notasDeLasNuevasMaterias[i].nota
                }
                let promedioGeneral:number = acumulador / notasDeLasNuevasMaterias.length
                arrayDeModificarAlumnos[indice].promedioGeneral = promedioGeneral;
             break;


        case 5:
            // en caso de que solo quiera cambiar las materias a las que esta matriculado:
            console.clear();
            let materiasAmodificar:Materia[]= seleccionarMaterias(arrayDeModificarAlumnos[indice].curso,`Seleccione las nuevas materias a las que se desea matricular: `)

            arrayDeModificarAlumnos[indice].materiasMatriculado = materiasAmodificar
            console.clear();
            console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: MATERIAS del Alumno`));
            break;

        case 6:
            // en caso de actualizar solamente las notas:
            console.clear();
            const notasPorTodasLasMaterias: NotaPorMateria[]=[];
            for (let i = 0; i < arrayDeModificarAlumnos[indice].materiasMatriculado.length; i++) {
    
            let nota = Number(readLineSync.question(`Escriba la nota de la materia ${arrayDeModificarAlumnos[indice].materiasMatriculado[i].nombre}: `));

            const nuevaNotaPorMateria: NotaPorMateria = new NotaPorMateria(arrayDeModificarAlumnos[indice].materiasMatriculado[i],nota)

            notasPorTodasLasMaterias.push(nuevaNotaPorMateria)

            console.clear();
            }
            arrayDeModificarAlumnos[indice].notaPorMateria = notasPorTodasLasMaterias;
            
            console.clear();
            console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: Nota por Materia del Alumno`));

            break;
        
            default:
                console.clear();
               console.log(``);
         }
    }
    // sobreescribo el archivo anterior por otro con los datos actualizados:
    escribir(arrayDeModificarAlumnos,"./Data/alumnos.json")

        }else {
        console.log("");
        // en el caso de que no exista el archivo:
        console.log(chalk.redBright(`NO HAY ALUMNOS CREADOS PARA DAR UN LISTADO`));
        console.log("");

        }

}


    listarAlumno(alumno:Alumno) {
        guardar("./Data/alumnos.json", alumno)
        
    }

    eliminarAlumno() {
        eliminarEntidad("Alumno","./Data/alumnos.json")
    }

    crearProfesor() {
        // ejecuto la funcion preguntarDato que recibe por parametro la entidad (en este caso Profesor) y el dato a obtener. retorna un string, pero en edad, dni y salario lo convierto a number con parseInt. 
        let nombre:string = preguntarDato("Profesor","NOMBRE");
        let apellido:string = preguntarDato("Profesor","APELLIDO");
        let fechaDeNacimiento:Date = new Date(preguntarDato("Profesor","fecha de nacimiento(YYYY/MM/DD)"));
        let dni:number = parseInt(preguntarDato("Profesor","DNI"));
        let salario:number = parseInt(preguntarDato("Profesor","SALARIO"));
        
        //se le asigna una id aleatoria de 7 caracteres:
        let idProfesor: string = uuidv4().slice (0,7); 

        //ejecuto la funcion seleccionarCurso (ambito Global) para mostrarle los materias de dicho curso. 
        const cursoElegidoProfesor:Curso = seleccionarCurso(cursos,"Seleccione el CURSO donde se encuentra la MATERIA QUE DICTA: ");
        //ejecuto la funcion seleccionarMaterias (ambito Global). las seleccionadas se guardan en la variable "materiaQueDicta".
        const materiaquedicta:Materia[]= seleccionarMaterias(cursoElegidoProfesor, "Seleccione la materia o materias que dicta (Ingrese 0 una vez que finalice): ")
        console.clear();

        // creo el objeto Profesor con todos los datos obtenidos anteriormente:
        const nuevoProfesor: Profesor = new Profesor (nombre, apellido, fechaDeNacimiento, dni,salario,idProfesor,materiaquedicta);
        
        return nuevoProfesor;
    }

    modificarProfesor() {
        // verifico si el archivo existe:
        if(verificarExitencia("./Data/profesores.json")){
            // guardo los profesores convertido a objetos en un array:
            let arrayDeModificarProfesores: Profesor[]= leer("./Data/profesores.json")
            // pregunto por consola el id del profesor 
            let idProfe:string =preguntarDato("Profesor a Modificar","ID");
            // busco al profesor que coincida con el id proporcionado (retorna el indice del mismo)
            let indice: number = arrayDeModificarProfesores.findIndex(profesor => profesor.id == idProfe);
            // en caso de no encontrarlo (retorna -1)
            if (indice === -1) {
               console.clear();
               console.log(chalk.redBright(`La Id: ${idProfe} NO pertenece a ningun Profesor en el sistema`))
               console.log("");
            //  si lo encontro:  
            }else if(indice >= 0){
            // menu de opciones a editar del profesor:
             let opcionesAmodificar:string[] =[chalk.greenBright(`Modificar Nombre`),chalk.greenBright(`Modificar Apellido`),chalk.greenBright(`Modificar Fecha De Nacimiento`),chalk.greenBright(`Modificar Dni`),chalk.greenBright(`Modificar Salario`),chalk.greenBright(`Modificar Materia/as que Dicta`)]
            // muestro por consola el nombre y apellido del profesor para que sea mas intuitivo: 
             console.log(chalk.whiteBright(`Profesor: ${arrayDeModificarProfesores[indice].nombre}, ${arrayDeModificarProfesores[indice].apellido}`));
            // le digo que seleccione una opcion del menu anterior:  
            let valor = readLineSync.keyInSelect(opcionesAmodificar, chalk.bold.bgWhiteBright.black(`Seleccione la opcion a modificar del Profesor `));
            // creo un switch con cada caso especifico segun seleccione:
             switch (valor) {
               case 0:
                   console.clear();
                   let datoNombre:string = preguntarDato("profesor",`Nuevo NOMBRE`);
                   arrayDeModificarProfesores[indice].nombre = datoNombre;
                   console.clear();
                   console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: NOMBRE a ${datoNombre}`));
                   console.log("");
                   break;
               case 1:
                   console.clear();
                   let datoApellido:string = preguntarDato("profesor",`Nuevo APELLIDO`);
                   arrayDeModificarProfesores[indice].apellido= datoApellido
                   console.clear();
                   console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: APELLIDO a ${datoApellido}`));
                   console.log("");
               
                   break;
               case 2:
                   console.clear();
                   let datofechaDeNacimiento:string = preguntarDato("profesor",`Nueva Fecha de nacimiento (YYYY/MM/DD)`);
                   arrayDeModificarProfesores[indice].fechaDeNacimiento =new Date (datofechaDeNacimiento);  
                   console.clear();
                   console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: Fecha de nacimiento a ${datofechaDeNacimiento}`)); 
                   console.log("");
                      
                   break;
    
                case 3:
                    console.clear();
                    let datoDni:string = preguntarDato("profesor",`Nuevo DNI`);
                    arrayDeModificarProfesores[indice].dni = parseInt(datoDni);
                    console.clear();  
                    console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: DNI a ${datoDni}`));
                    console.log("");      
                    break;

                case 4:
                    console.clear();
                    let datoSalario:string = preguntarDato("profesor",`Nuevo Salario`);
                    arrayDeModificarProfesores[indice].salario = parseInt(datoSalario);
                    console.clear();  
                    console.log(chalk.greenBright(`Se ha actualizado con exito la propiedad: SALARIO a ${datoSalario}`));
                    console.log("");      
                    break;
    
               case 5:
                   console.clear();
    
                   const cursoElegidoProfesor:Curso = seleccionarCurso(cursos,"Seleccione el CURSO donde se encuentra la MATERIA QUE DICTA: ");
                   
                    console.clear();
                   const materiaNuevaquedicta:Materia[]= seleccionarMaterias(cursoElegidoProfesor, "Seleccione la materia o materias que dicta (Ingrese 0 una vez que finalice): ")
                   console.clear();

                   arrayDeModificarProfesores[indice].materiasQueDicta = materiaNuevaquedicta;

                break;
            
                default:
                    console.clear();
                   console.log(``);
             }
        }
        // sobreescribo el archivo anterior con otro pero con los datos editados.
        escribir(arrayDeModificarProfesores,"./Data/profesores.json")
    
            }else {
            console.log("");
            // en el caso de que no exista el archivo:
            console.log(chalk.redBright(`NO HAY PROFESORES CREADOS PARA DAR UN LISTADO`));
            console.log("");
    
            }

    }

    listarProfesor(profesor:Profesor) {
        guardar("./Data/profesores.json", profesor)
    }

    eliminarProfesor() {
        eliminarEntidad("Profesor","./Data/profesores.json");
    }
    

    crearListadoDeunAlumno(){
        crearlistaDeUnaEntidad("alumno","./Data/alumnos.json");
}

    crearListadoDeunProfesor(){
        crearlistaDeUnaEntidad("profesor","./Data/profesores.json")
    }

    crearListadoDeProfesoresXAlumno(){
        // verificamos si se encuentran los archivos donde se almacenas los alumnos y profesores:
        if(verificarExitencia("./Data/alumnos.json") && verificarExitencia("./Data/profesores.json")){
            // se pide por consola el dni del alumno:
            let idAlumno:string= preguntarDato("ALUMNO","ID");
            // se guardan los archivos leido(la funcion los convierte a objeto) en un array cada uno:
            let arrayDeProfesores: Profesor[]= leer("./Data/profesores.json")
            let arrayDeAlumnos: Alumno[]= leer("./Data/alumnos.json")
            // se busca el alumno por el dni en el array de todos los alumnos:
            let AlumnoSolicitado = arrayDeAlumnos.find((alumno: {id: string}) => alumno.id === idAlumno);
            // creamos un array, donde se almacenaran los profesores del alumnos solicitado, que despues sera exportado en un archivo JSON.
            let profesoresDelAlumno:Profesor[]=[]
            // condicion para saber que el alumno se encuentra en el array:
            if(AlumnoSolicitado != undefined){
                console.clear()
                console.log("");
                console.log(chalk.greenBright(`Se ha encontrado al Alumno con EXITO`));
                // guardamos las materias en las que esta matriculado en un array:
                let materiasQueCursa:Materia[] = AlumnoSolicitado.materiasMatriculado;
                    
            // creamos tres for, el primero(i) es para recorrer los profesores que se encuntran dentro del array de profesores. El segundo for (j) lo utilizamos para recorrer las materias que dicta el profesor y por ultimo el tercer for(h) se usa para recorrer las materias que cursa el alumno. Todo esto se realiza para comparar todos los datos entre si.
            for (let i = 0; i < arrayDeProfesores.length; i++) {
                for (let j = 0; j < arrayDeProfesores[i].materiasQueDicta.length; j++) { 
                    for (let h = 0; h < materiasQueCursa.length; h++) {
                        // preguntamos si el profesor pepito en la propiedad materiQuedicta.nombre incluye la materia que cursa el alumno(retorna true o false):
                        let buscarProfesoresDelAlumno = arrayDeProfesores[i].materiasQueDicta[j].id.includes(materiasQueCursa[h].id);
                        // condicion en caso de que encuentre la coincidencia y otra condicion donde preguntamos si el profesor encontrado ya esta dentro del array donde los vamos a almacenar (es para no pushear dos o mas veces el mismo profesor):
                        if(buscarProfesoresDelAlumno== true && profesoresDelAlumno.includes(arrayDeProfesores[i])==false){
                        //pusheamos al profesor en el array que creamos al principio: 
                        profesoresDelAlumno.push(arrayDeProfesores[i])
                        }
                    }
                }
            }
                // condicion que para crear el archivo. En el array debe haber al menos un elemento(profesor):
                if(profesoresDelAlumno.length > 0){
                    console.log("");
                    console.log(chalk.greenBright(`Se ha creado el listado y el mismo ha sido exportado a la siguiente direccion: ./Data/ProfesoresDe${AlumnoSolicitado.nombre.toLocaleUpperCase()}(${AlumnoSolicitado.id}).json`));
                    console.log("");
                    escribir(profesoresDelAlumno,`./Data/profesoresDe${AlumnoSolicitado.nombre.toLocaleUpperCase()}(${AlumnoSolicitado.id}).json`)
                // en caso de que no tenga ningun elemento el array(osea que no hay profesores)
                }else {
                    console.log(chalk.redBright(`El alumno con el ID: ${AlumnoSolicitado.id} no tiene profesores asignados a las materias que se matriculo`));
                }
            // en caso de que el alumno solicitado sea Undefine o ingreso un dato incorrecto:
            }else {
                console.log(chalk.redBright(`NO SE HA ENCONTRADO AL ALUMNO O HA INGRESADO UN DNI INCORRECTO`));
            }
        // en caso que no existan los archivos JSON:
        }else {
            console.log("");
                // en caso de no haber un listado de alumnos y profesores:
                console.log(chalk.redBright(`NO HAY ALUMNOS Y/O PROFESORES CREADOS PARA DAR UN LISTADO`));
                console.log("");
        }

    }

    crearListadoDeAlumnosXProfesor(){
        // verificamos si se encuentran los archivos donde se almacenas los alumnos y profesores:
        if(verificarExitencia("./Data/alumnos.json") && verificarExitencia("./Data/profesores.json")){
            // se pide por consola el id del Profesor:
            let idProfe:string= preguntarDato("PROFESOR","ID");
            // se guardan los archivos leido(la funcion los convierte a objeto) en un array cada uno:
            let arrayDeProfesores: Profesor[]= leer("./Data/profesores.json")
            let arrayDeAlumnos: Alumno[]= leer("./Data/alumnos.json")
            // se busca el profesor por el id en el array de todos los profesores:
            let profesorSolicitado = arrayDeProfesores.find((profesor: {id: string}) => profesor.id === idProfe);
            // creamos un array, donde se almacenaran los alumnos del profesor solicitado, que despues sera exportado en un archivo JSON.
            let alumnosDelProfesor:Alumno[]=[]
            // condicion para saber que el profesor se encuentra en el array:
            if(profesorSolicitado != undefined){
                console.clear()
                console.log("");
                console.log(chalk.greenBright(`Se ha encontrado al Profesor con EXITO`));
                // guardamos las materias que dicta el profesor en un array:
                let materiasQueDictaProf:Materia[] = profesorSolicitado.materiasQueDicta;
               // creamos tres for, el primero(i) es para recorrer los alumnos que se encuentran dentro del array de alumnos. El segundo for (j) lo utilizamos para recorrer las materias que esta matriculado cada alumno y por ultimo el tercer for(h) se usa para recorrer las materias que dicta el profesor. Todo esto se realiza para comparar todos los datos entre si. 
            for (let i = 0; i < arrayDeAlumnos.length; i++) {
                for (let j = 0; j < arrayDeAlumnos[i].materiasMatriculado.length; j++) { 
                    for (let h = 0; h < materiasQueDictaProf.length; h++) {
                        // preguntamos si el alumno pepito en la propiedad materiasMatriculado.id incluye la materia que dicta el profesor(retorna true o false):
                        let buscarAlumnoDelProfesor = arrayDeAlumnos[i].materiasMatriculado[j].id.includes(materiasQueDictaProf[h].id);
                        // condicion en caso de que encuentre la coincidencia y otra condicion donde preguntamos si el alumno encontrado ya esta dentro del array donde los vamos a almacenar (es para no pushear dos o mas veces el mismo alumno):
                        if(buscarAlumnoDelProfesor== true && alumnosDelProfesor.includes(arrayDeAlumnos[i])==false){
                            alumnosDelProfesor.push(arrayDeAlumnos[i])
                        } 
                    }
                }
            }
                // condicion que para crear el archivo. En el array debe haber al menos un elemento(alumno):
                if(alumnosDelProfesor.length > 0){   
                    console.log("");
                    console.log(chalk.greenBright(`Se ha creado el listado y el mismo ha sido exportado a la siguiente direccion: ./Data/alumnosDe${profesorSolicitado.nombre.toLocaleUpperCase()}(${profesorSolicitado.id}).json`));
                     console.log("");
                    escribir(alumnosDelProfesor,`./Data/alumnosDe${profesorSolicitado.nombre.toLocaleUpperCase()}(${profesorSolicitado.id}).json`)
                // en caso de que no tenga ningun elemento el array(osea que no hay alumnos)
                }else {
                    console.log(chalk.redBright(`El Profesor con el ID: ${profesorSolicitado.id} no tiene alumnos asignados a la/s materia/s que dicta`));
                }
            // en caso de que el alumno solicitado sea Undefine o ingreso un dato incorrecto:
            } else{
            console.log(chalk.redBright(`NO SE HA ENCONTRADO AL PROFESOR O HA INGRESADO UN DNI INCORRECTO`));
            }
        // en caso que no existan los archivos JSON:
        }else {
        console.log("");
            // en caso de no haber un listado de alumnos y profesores:
            console.log(chalk.redBright(`NO HAY ALUMNOS Y/O PROFESORES CREADOS PARA DAR UN LISTADO`));
            console.log("");
        }
    }

    listadoDetodosLosAlumnosConPromedios(){
        if(verificarExitencia("./Data/alumnos.json")){
            // en caso de que exista el archivo lo convierto a objetos y lo almaceno en un array:
            let arrayDealumnos: Alumno[]= leer("./Data/alumnos.json")

            let arrayAlumnosPromedio:object[] =[]
            // creo un ciclo for para extraer del alumno las propiedades nombre, apellido y promediogeneral para crear un objeto:
            for (let i = 0; i < arrayDealumnos.length; i++) {
            let alumnoConSuPromedio = {
                nombre: arrayDealumnos[i].nombre,
                apellido: arrayDealumnos[i].apellido,
                promedioGeneral: arrayDealumnos[i].promedioGeneral,
                id:arrayDealumnos[i].id
            }
            // hago un push de cada objeto creado anteriormente en un array
            arrayAlumnosPromedio.push(alumnoConSuPromedio)
            }
            // convierto el array a string y lo exporto en un archivo JSON.
            fs.writeFileSync("./Data/alumnosPromedios.json",JSON.stringify(arrayAlumnosPromedio, null, 2));

            console.log("");
            console.log(chalk.greenBright(`Se ha creado el listado con exito`));
            console.log(chalk.greenBright(`El mismo ha sido exportado a la siguiente direccion: ./Data/alumnosPromedios.json`));
            console.log("");

        }else {
            console.log("");
            // en caso de no haber un listado de alumnos:
            console.log(chalk.redBright(`NO HAY ALUMNOS CREADOS PARA DAR UN LISTADO`));
            console.log("");
        }
    }

    listadoDeAlumnos(){
        if(verificarExitencia("./Data/alumnos.json")){
            let todosAlumnos:Alumno[]= leer("./Data/alumnos.json");
            let alumnosDatosBasicos:any[]= []
            for (let i = 0; i < todosAlumnos.length; i++) {
            
                let alumno = {
                    nombre: todosAlumnos[i].nombre,
                    apellido: todosAlumnos[i].apellido,
                    dni: todosAlumnos[i].dni,
                    id: todosAlumnos[i].id
                }
            alumnosDatosBasicos.push(alumno) 
            }
            // ordenamos alfabeticamente los objetos por la propiedad apellido:
            let alumnosOrdenados:any = alumnosDatosBasicos.sort((o1,o2)=> {
                // objeto1 es MENOR a objeto2 lexicograficamente
             if(o1.apellido < o2.apellido){
                    return -1;
                // objeto1 es MAYOR a objeto2 lexicograficamente
             }else if (o1.apellido > o2.apellido){
                    return 1;
                // objeto1 es IGUAL a objeto2 lexicograficamente
            } else {
                    return 0;
                }
            })
            fs.writeFileSync("./Data/listado-alumnos.json",JSON.stringify(alumnosOrdenados, null, 2))

            console.log("");
            console.log(chalk.greenBright(`Se ha creado el listado de Alumnos (ordenado alfabeticamente) con exito!`));
            console.log(chalk.greenBright(`El mismo ha sido exportado a la siguiente direccion: ./Data/listado-alumnos.json`));
            console.log("");
        }else {
            console.log("");
            // en caso de no haber un listado de alumnos:
            console.log(chalk.redBright(`NO HAY ALUMNOS CREADOS PARA DAR UN LISTADO`));
            console.log("");
        }
    }

    listadoDeProfesores(){
        if(verificarExitencia("./Data/profesores.json")){
            let todosProfesores:Profesor[]= leer("./Data/profesores.json");
            let profesoresDatosBasicos:any[]= []
            for (let i = 0; i < todosProfesores.length; i++) {
                
                let profesor = {
                    nombre: todosProfesores[i].nombre,
                    apellido: todosProfesores[i].apellido,
                    dni: todosProfesores[i].dni,
                    id: todosProfesores[i].id
                }
                profesoresDatosBasicos.push(profesor)
            }
            // ordenamos alfabeticamente los objetos por la propiedad apellido:
            let profesoresOrdenados:any = profesoresDatosBasicos.sort((o1,o2)=> {
                // objeto1 es MENOR a objeto2 lexicograficamente
                if(o1.apellido < o2.apellido){
                    return -1;
                // objeto1 es MAYOR a objeto2 lexicograficamente
                }else if (o1.apellido > o2.apellido){
                    return 1;
                // objeto1 es IGUAL a objeto2 lexicograficamente
                } else {
                    return 0;
                }
            })
            fs.writeFileSync("./Data/listado-profesores.json",JSON.stringify(profesoresOrdenados, null, 2))

            console.log("");
            console.log(chalk.greenBright(`Se ha creado el listado de Profesores (ordenado alfabeticamente) con exito!`));
            console.log(chalk.greenBright(`El mismo ha sido exportado a la siguiente direccion: ./Data/listado-profesores.json`));
            console.log("");
        }else {
            console.log("");
            // en caso de no haber un listado de Profesores:
            console.log(chalk.redBright(`NO HAY PROFESORES CREADOS PARA DAR UN LISTADO`));
            console.log("");
        }
    }
}

