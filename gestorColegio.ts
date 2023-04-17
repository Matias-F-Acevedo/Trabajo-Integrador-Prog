const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const readLineSync = require ("readline-sync")

import { stringify } from "querystring";
import Alumno from "./Alumno";
import Materia from "./Materia";
import Profesor from "./Profesor";
import { clear, log } from "console";
import Curso from "./Curso";
import NotaPorMateria from "./notaPorMateria";

// Se crean las materias de primer año:
const naturales:Materia = new Materia("Naturales");
const matematicas:Materia = new Materia("Matematicas");
const fisica:Materia = new Materia("Fisica");
const anatomia:Materia = new Materia("Anatomia");

// Se crean las materias de segundo año:
const algebra:Materia = new Materia("Algebra");
const filosofia:Materia  = new Materia("Filosofia");
const biologia:Materia  = new Materia("Biologia");
const historia:Materia  = new Materia("Historia");

// Se crean las materias de tercer año:
const geografia:Materia = new Materia("Geografia");
const literatura:Materia  = new Materia("Literatura");
const edFi:Materia  = new Materia("EdFi");
const ingles:Materia  = new Materia("Ingles");

// Se crean las materias de cuarto año:
const arte:Materia = new Materia("Arte");
const economia:Materia  = new Materia("Economia");
const finanzas:Materia  = new Materia("Finanzas");
const quimica:Materia  = new Materia("Quimica");

//Se crean materias de quinto año:
const tutoria:Materia = new Materia("Tutoria");
const emprendedorismo:Materia  = new Materia("Emprendedorismo");
const turismo:Materia  = new Materia("Turismo");
const programacion:Materia  = new Materia("Programacion");

//Se crean materias de sexto año:
const ntics:Materia = new Materia("Ntics");
const fip:Materia  = new Materia("Fip");
const administracion:Materia  = new Materia("Administracion");
const comunicacion:Materia  = new Materia("Comunicacion");

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


//creo una funcion para preguntar sobre un dato(nombre,apellido,etc) a una entidad (alumno o profesor) y retorna el dato.
function preguntarDato (entidad:string, dato:string):string{
    let informacion:string = readLineSync.question(chalk.greenBright(`Escriba el ${dato} del ${entidad}: `)).toLocaleLowerCase();
    return informacion
}

//creo una funcion para reutilizar el codigo en "crearProfesor", la misma recibe por parametro los cursos, en este caso dentro del gestorColegio es =this.cursos.
function seleccionarCurso(cursos:Curso[],pregunta:string):Curso {
    // creo un array para almacenar los NOMBRES de los cursos recibidos por parametro, los mismos son extraidos y pusheados(en "propiedadNombreDeLosCursos") con el ciclo for.
    let propiedadNombreDeLosCursos:string[]=[]
    for (let i = 0; i < cursos.length; i++) {
        const curso = cursos[i];
        propiedadNombreDeLosCursos.push(curso.nombre);
    }
    // muestro por consola el array "propiedadNombreDeLosCursos"(son los nombres de los cursos) para que usuario seleccione una opcion: 
    let indiceCurso = readLineSync.keyInSelect(propiedadNombreDeLosCursos,pregunta);
    // guardo la opcion elegida en una variable que despues se retorna. 
    const cursoSeleccionado:Curso = cursos[indiceCurso]
    return cursoSeleccionado
}


//creo una funcion para reutilizar el codigo en "crearProfesor", la misma recibe por parametro un curso y una indicacion, se accede a las materias del curso, las muestra por consola y el usuario selecciona las que quiere. Retornando la funcion un array de materias.
function seleccionarMaterias(curso:Curso, indicacion:string):Materia[] {
    // creo un array para almacenar los NOMBRES de LAS MATERIAS, los mismos son extraidos y pusheados(en "nombredeLasMaterias") con el ciclo for.
    let nombredeLasMaterias:string[] = [];
    for (let i = 0; i < curso.materias.length; i++) {
         const materia = curso.materias[i];
         nombredeLasMaterias.push(materia.nombre);
    }
    // creo un array para almacenar las materias que se matricula/dicta el usuario por consola.
    let materiasSeleccionadas:Materia[] = [];

    // creo un while para que el usuario pueda repetir la seleccion de materias hasta que termine.
    let condicion:number=0
    while (condicion != -1) {
        
        let materia = readLineSync.keyInSelect(nombredeLasMaterias, indicacion);
        // Condiciones para que no pueda anotarse mas de una vez a una misma materia y que no se almacena un dato erroneo en el array "materiasMatriculado"
        if(materia!== -1 && nombredeLasMaterias[materia] != `---`){
            materiasSeleccionadas.push(curso.materias[materia])
            console.log(chalk.green(`Se ha matriculado a ${nombredeLasMaterias[materia]}`));
            nombredeLasMaterias.splice(materia,1,"---")
            }else {
                console.log(chalk.red("Ya se matriculo a esa materia, seleccione una opcion valida"));
            }
        condicion=materia
    }
    return materiasSeleccionadas
}



export default class GestorColegio  {
    alumnos: Alumno[]= []
    profesores: Profesor[] = []
    // hardcodeamos los cursos y por consecuencia las materias dentro de los mismos:
    cursos: Curso[]= [primero,segundo,tercero,cuarto,quinto,sexto]



    crearAlumno() {
        // ejecuto la funcion preguntarDato que recibe por parametro la entidad (en este caso Alumno) y el dato a obtener. retorna un string, pero en edad y dni  lo convierto a number con parseInt. 
        let nombre:string = preguntarDato("Alumno","NOMBRE");
        let apellido:string = preguntarDato("Alumno","APELLIDO");
        let edad:number = parseInt(preguntarDato("Alumno","EDAD"));
        let dni:number = parseInt(preguntarDato("Alumno","DNI"));

        // ejecuto la funcion "seleccionarCurso" (ambito Global) y el retorno se guarda en la variable cursoElegido 
        const cursoElegidoAlumno:Curso = seleccionarCurso(this.cursos,"Seleccione el curso: ");
        console.clear();

        //se le asigna a matricula una id aleatoria de 7 caracteres:
        let matricula:string = uuidv4().slice (0,7); 

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
        }


        // en el acumulador se almacena la suma de todas las notas por materia y es dividida por la cantidad de las mismas para sacar el promedio, el cual se almacena en una variable.
        let acumulador:number = 0
        for (let i = 0; i < notasPorTodasLasMaterias.length; i++) {
            acumulador = acumulador+ notasPorTodasLasMaterias[i].nota
        }
        let promedioGeneral:number = acumulador / notasPorTodasLasMaterias.length
        

        // creo el objeto alumno con todos los datos obtenidos anteriormente:
        const nuevoAlumno: Alumno = new Alumno (nombre, apellido, edad, dni,matricula, cursoElegidoAlumno, materiasMatriculado, notasPorTodasLasMaterias, promedioGeneral);

        return nuevoAlumno;
    }

    modificarAlumno() {
        // pediremos la caracteristica a modificar del alumno

    }

    listarAlumno() {
    //    una vez creado el Alumno lo podremos pushear en el array Alumnos de la clase Colegio

    }

    eliminarAlumno() {
        // lo buscamos por DNI/otro dato y lo eliminadmos del Array alumno de la clase Colegio
    }

    crearProfesor() {
        // ejecuto la funcion preguntarDato que recibe por parametro la entidad (en este caso Profesor) y el dato a obtener. retorna un string, pero en edad, dni y salario lo convierto a number con parseInt. 
        let nombre:string = preguntarDato("Profesor","NOMBRE");
        let apellido:string = preguntarDato("Profesor","APELLIDO");
        let edad:number = parseInt(preguntarDato("Profesor","EDAD"));
        let dni:number = parseInt(preguntarDato("Profesor","DNI"));
        let salario:number = parseInt(preguntarDato("Profesor","SALARIO"));
        
        //se le asigna una id aleatoria de 7 caracteres:
        let idProfesional: string = uuidv4().slice (0,7); 

        //ejecuto la funcion seleccionarCurso (ambito Global) para mostrarle los materias de dicho curso. 
        const cursoElegidoProfesor:Curso = seleccionarCurso(this.cursos,"Seleccione el CURSO donde se encuentra la MATERIA QUE DICTA: ");
        //ejecuto la funcion seleccionarMaterias (ambito Global). las seleccionadas se guardan en la variable "materiaQueDicta".
        const materiaquedicta:Materia[]= seleccionarMaterias(cursoElegidoProfesor, "Seleccione la materia o materias que dicta (Ingrese 0 una vez que finalice): ")
        console.clear();

        // creo el objeto Profesor con todos los datos obtenidos anteriormente:
        const nuevoProfesor: Profesor = new Profesor (nombre, apellido, edad, dni,salario,idProfesional,materiaquedicta);
        
        return nuevoProfesor;
    }

    modificarProfesor() {
      // pediremos la caracteristica a modificar del profesor
    }

    listarProfesor() {
    //    una vez creado el Profesor lo podremos pushear en el array Profesor de la clase Colegio

    }

    eliminarProfesor() {
        // lo eliminamos del Array Profesor de la clase Colegio 

    }

    crearListadoDeAlumnos(){
        // para esto usaremos el array de Alumnos de la clase Colegio, el cual lo convertiremos en un archivo .json (con stringify)
    }

    crearListadoDeProfesores(){
       // para esto usaremos el array de Profesores de la clase Colegio, el cual lo convertiremos en un archivo .json (con stringify)
    }

    crearListadoDeunAlumno(){
        // pediremos el alumno que se desea crear en una lista, lo buscamos y lo exportamos en un archivo .json. (con todas sus caracterisiticas: 
        // materias que cursa, sus calificaciones y el promedio general)
    }

    crearListadoDeunProfesor(){
        // pediremos el profesor que se desea crear en una lista, lo buscamos y lo exportamos en un archivo .json. (con todas sus caracterisiticas:         
        // materia que dicta
        // opcional: un profesor puede dictar mas de una materia)
    }

    crearListadoDeProfesoresXAlumno(){
        // aca tendremos que pedir el alumno que se desea saber los profesores y de objeto alumno buscaremos en que materias esta matriculado y a su vez accedemos a la propiedad profesor de cada materia.
    }

    crearListadoDeAlumnosXProfesor(){
    // pediremos el profesor que se desea saber(verificamos que este contratado), lo buscaremos en el Array de Profesores que se encuentra en la clase Colegio. del objeto profesor buscamos en la propiedad "materiaquedicta", una vez encontrada la materia que da, la buscamos en el array de alumnos de la clase Colegio y de cada alumno buscamos la propiedad materiasMatriculado, en ese array encontraremos todas las conincidencias con la materia que dicta el profesor, creando un array el cual sera convertido en json. (explicado mas o menos, capaz hay que cambiar varias cosas)
    }

    listadoDetodosLosAlumnosConPromedios(){
        // del array de alumnos de la clase colegio accedemos a la propiedad "promedio general" de cada uno y lo mostramos o convertimos en archivo .json
    }

    
}