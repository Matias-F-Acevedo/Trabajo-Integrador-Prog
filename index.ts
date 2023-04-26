const chalk = require('chalk');
const fs = require("fs")
const readLineSync = require ("readline-sync")

import GestorColegio from "./gestorColegio";
import Curso from "./Curso";
import Materia from "./Materia";
import Profesor from "./Profesor";
import Alumno from "./Alumno";
import { log } from "console";


let condicion:number = 0

 while(condicion !== -1){

 let opciones:string[] = [chalk.greenBright("Crear Alumno"),chalk.greenBright("Modificar Alumno"),chalk.greenBright("Eliminar Alumno"),chalk.greenBright("Crear Profesor"),chalk.greenBright("Modificar Profesor"),chalk.greenBright("Eliminar Profesor"),chalk.greenBright("Crear listado de UN Alumno"),chalk.greenBright("Crear listado de UN Profesor"),chalk.greenBright("Crear listado de Profesores por Alumno"),chalk.greenBright("Crear listado de Alumnos por Profesor"),chalk.greenBright("Listado de Todos los Alumnos con su Promedio"),chalk.greenBright("Listado de Alumnos con datos basicos"),chalk.greenBright("Listado de Profesores con datos basicos")];

 
 console.log(chalk.italic.bold.bgGreenBright.black('-----------------BIENVENIDO AL GESTOR DE LEGAJOS-----------------'));
 
 let numero = readLineSync.keyInSelect(opciones, chalk.bold.bgWhiteBright.black("Seleccione una opcion: "))

const gestor= new GestorColegio()


let alumnoNuevo:Alumno
let profesorNuevo: Profesor


function listarEliminarEntidad(entidad:string, accion:string){
    let opcionesAlumno:string[] =[chalk.greenBright(`Listar ${entidad}`),chalk.redBright(`Eliminar ${entidad}`)]
    let valor = readLineSync.keyInSelect(opcionesAlumno, chalk.bold.bgWhiteBright.black(`Que quiere hacer con el Alumno ${accion}: `));

    if( valor === 0){
        if(entidad.toLocaleLowerCase() == "alumno"){
        gestor.listarAlumno(alumnoNuevo);
        }else if (entidad.toLocaleLowerCase() == "profesor"){
        gestor.listarProfesor(profesorNuevo);
        }
        console.clear()
        console.log(chalk.greenBright(`El ${entidad} ha sido listado con exito`));
        console.log("");
        
    }else if(valor == 1){
        console.clear();
        console.log(chalk.redBright(`El ${entidad} ha sido eliminado con exito`));
        console.log("");
        
    }else {
        console.clear();
        console.log(chalk.redBright(`El ${entidad} ha sido eliminado con exito`));
        console.log("");
    }
}


switch (numero) {
    case -1:
        console.clear()
        condicion = -1
        break;

    case 0:
        console.clear();
        alumnoNuevo = gestor.crearAlumno();
        console.clear();
        listarEliminarEntidad("ALUMNO","CREADO")
        break;

    case 1:
        console.clear();
        gestor.modificarAlumno();
        
        break;
    case 2:
        console.clear();
        gestor.eliminarAlumno()

        break;
    case 3:
        console.clear();
        profesorNuevo = gestor.crearProfesor();
        console.clear();
        listarEliminarEntidad("PROFESOR","CREADO")
        
        break;        
    case 4:
        console.clear();
        gestor.modificarProfesor();
        
        break;
    
    case 5:
        console.clear();
        gestor.eliminarProfesor()
        
        break;

    case 6:
        console.clear();
        gestor.crearListadoDeunAlumno()
        
        break;
    case 7:
        console.clear();
        gestor.crearListadoDeunProfesor()
        
        break;
    case 8:
        console.clear();
        gestor.crearListadoDeProfesoresXAlumno()
        
        break;
    case 9:
        console.clear();
        gestor.crearListadoDeAlumnosXProfesor()

        break;        
    case 10:
        console.clear();
        gestor.listadoDetodosLosAlumnosConPromedios()
        break;

    case 11:
        console.clear();
        gestor.listadoDeAlumnos()
        break;
    case 12:
        console.clear();
        gestor.listadoDeProfesores()
        break;

    default:
        break;
}

 }