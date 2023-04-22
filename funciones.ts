const fs = require('fs');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const readLineSync = require ("readline-sync")

import { stringify } from "querystring";
import Alumno from "./Alumno";
import Materia from "./Materia";
import Profesor from "./Profesor";
import { clear, log } from "console";
import Curso from "./Curso";
import NotaPorMateria from "./notaPorMateria";



function verificarExitencia (direccionArchivo:string) {
    if(fs.existsSync(direccionArchivo)) {
        return true
    }
    else return false
}


function escribir(datos:any , direccionArchivo:string){
    return fs.writeFileSync(direccionArchivo, JSON.stringify(datos,null,2))
}

function leer(direccionArchivo:string){
        if(verificarExitencia(direccionArchivo)){
            let resultado = JSON.parse(fs.readFileSync(direccionArchivo))
            return resultado
        }else{
        console.log("El archivo a leer no existe");
        }
}

function guardar(direccionArchivo:string, datos:any){
    if(verificarExitencia(direccionArchivo)){
        let datosGuardar = [...leer(direccionArchivo), datos];
        return escribir(datosGuardar, direccionArchivo)
    }else {
        return escribir([datos], direccionArchivo)
    }

}



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
            console.clear();
            nombredeLasMaterias.splice(materia,1,"---")
            }else {
                console.clear();
                console.log(chalk.red("Ya se matriculo a esa materia, seleccione una opcion valida"));
            }
        condicion=materia
    }
    return materiasSeleccionadas
}


//creo una funcion para reutilizar el codigo en alumnos y profesores, la misma recibe por parametro una entidad (alumno o profesor) y una direccion del archivo JSON:
function eliminarEntidad(entidad:string, direccionArchivo:string){
    // verifico si existe el archivo (la funcion retorno true o false)
    if(verificarExitencia(direccionArchivo)){
        // pregunto por consola el ID de la entidad
        let idEntidad:string= preguntarDato(entidad,"ID");
        // creo una variable donde se almacena el indice de la entidad a eliminar:
        let eliminarEntidad:number;
        // creo una variable que despues sera igual a un array de alumnos o profesores (depende del if que le sigue)
        let listadoEntidades:any;
        
        if(entidad.toLocaleLowerCase()=="alumno"){
            // guardo el archivo json convertido a objeto(funcion leer) en el array:
            let listadoAlumnos:Alumno[]= leer(direccionArchivo)
            // le asigno un valor a las variable declaradas anteriormente.
            eliminarEntidad = listadoAlumnos.findIndex(entidad => entidad.id == idEntidad);
            listadoEntidades = listadoAlumnos;
        }else {
            // en caso de que no sea Alumno, por consecuencia en Profesor:
            // guardo el archivo json convertido a objeto(funcion leer) en el array:
            let listadoProfesores:Profesor[]= leer(direccionArchivo)
            // le asigno un valor a las variable declaradas anteriormente.
            eliminarEntidad = listadoProfesores.findIndex(entidad => entidad.id == idEntidad);
            listadoEntidades = listadoProfesores;
        }
        // busca (metodo findIndex)en el listado de entidades(alumnos o profesores) a la entidad que coincida con el ID brindado(nos devuelve su indice).
        // si encuentra a la entidad:
        if (eliminarEntidad >= 0){
            console.clear();
            console.log(chalk.greenBright(`${entidad} encontrado con EXITO`));
            // compruebo que quiera realmente eliminar a la entidad
            let opciones:string[] = [chalk.greenBright("SI"),chalk.redBright("NO")];
            console.log(chalk.redBright(`ESTA SEGURO QUE QUIERE ELIMINAR AL ${entidad} CON LA ID: ${idEntidad} (${listadoEntidades[eliminarEntidad].nombre}, ${listadoEntidades[eliminarEntidad].apellido})`));
            // tiene que elegir una opcion(si o no/cancel)
            let numero = readLineSync.keyInSelect(opciones, chalk.bold.bgWhiteBright.black("Seleccione una opcion: "))

            switch (numero) {
                case -1:
                    // en caso de que seleccione la opcion "cancel"
                    console.clear();
                    console.log(chalk.greenBright("Volviendo al menu de inicio..."));
                    console.log("");
                    break;
                case 0:
                    // en caso de que seleccione la opcion "si" (eliminar entidad):
                    // se eliminar la entidad:
                    listadoEntidades.splice(eliminarEntidad, 1)
                    console.clear();
                    console.log(chalk.greenBright(`El ${entidad} con la ID: ${idEntidad} HA SIDO ELIMINADO CON EXITO`));
                    console.log("");
                    // sobreescribo/remplazo el archivo anterior con el nuevo(con la entidad eliminada).
                    escribir(listadoEntidades,direccionArchivo)
                    break;
                case 1:
                    // en caso de que seleccione la opcion "no":
                    console.clear();
                    console.log(chalk.greenBright("Volviendo al menu de inicio..."));
                    console.log("");
                    break;
                default:
                    break;
            }
        // si NO encuentra a la entidad(-1):
        } else {
             console.clear();
             console.log(chalk.redBright(`El ${entidad} con el ID: ${idEntidad} NO HA SIDO ENCONTRADO O HA INGRESADO UN ID INCORRECTO`));
             console.log("");
             
        }
    }else {
        console.log("");
        // en el caso de que no exista el archivo:
        console.log(chalk.redBright(`NO HAY ${entidad} CREADOS PARA DAR UN LISTADO Y ELIMINAR`));
        console.log("");
    }
}


function crearlistaDeUnaEntidad(entidad:string, direccionlistadoDeEntidades:string){
    // pregunto por consola el ID de la entidad
    let idEntidad:string= preguntarDato(entidad,"ID");
    if(verificarExitencia(direccionlistadoDeEntidades)){
            // creo una variable donde se almacena el indice de la entidad a listar:
            let entidadEncontrada:number;
            // creo una variable que despues sera igual a un array de alumnos o profesores (depende del if que le sigue)
            let listadoEntidades:any;
            
            if(entidad.toLocaleLowerCase()=="alumno"){
                // guardo el archivo json convertido a objeto(funcion leer) en el array:
                let listadoAlumnos:Alumno[]= leer(direccionlistadoDeEntidades)
                // le asigno un valor a las variable declaradas anteriormente.
                entidadEncontrada = listadoAlumnos.findIndex(entidad => entidad.id == idEntidad);
                listadoEntidades = listadoAlumnos;
            }else {
                // en caso de que no sea Alumno, por consecuencia es Profesor:
                // guardo el archivo json convertido a objeto(funcion leer) en el array:
                let listadoProfesores:Profesor[]= leer(direccionlistadoDeEntidades)
                // le asigno un valor a las variable declaradas anteriormente.
                entidadEncontrada = listadoProfesores.findIndex(entidad => entidad.id == idEntidad);
                listadoEntidades = listadoProfesores;
            }
            // en caso de que no encuentre la entidad(findindex retorna -1):
            if(entidadEncontrada == -1){
                console.log("");
                console.log(chalk.redBright(`NO se encontro el alumno con el ID: ${idEntidad}`));
                console.log("");
            }else {
                console.log("");
                console.log(chalk.greenBright(`Se ha encontrado el ${entidad} y ha sido exportado a la siguiente direccion: ./Data/${listadoEntidades[entidadEncontrada].nombre}-${listadoEntidades[entidadEncontrada].apellido}.json`));
                console.log("");
                // creo un archivo con la entidad encontrada:
                fs.writeFileSync(`./Data/${listadoEntidades[entidadEncontrada].nombre}-${listadoEntidades[entidadEncontrada].apellido}.json`,JSON.stringify(listadoEntidades[entidadEncontrada], null, 2));
            }
    }else {
    console.log("");
    // en el caso de que no exista el archivo:
    console.log(chalk.redBright(`NO HAY ${entidad.toLocaleUpperCase()} CREADOS PARA DAR UN LISTADO`));
    console.log("");
}
}

module.exports = {verificarExitencia, escribir, leer, guardar,preguntarDato,seleccionarCurso,seleccionarMaterias,eliminarEntidad,crearlistaDeUnaEntidad}