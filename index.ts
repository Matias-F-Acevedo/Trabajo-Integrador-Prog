
const fs = require("fs")
const readLineSync = require ("readline-sync")

import GestorColegio from "./gestorColegio";
import Curso from "./Curso";
import Materia from "./Materia";
import Profesor from "./Profesor";
import Alumno from "./Alumno";
import { log } from "console";


 // --------(INTERFAZ) IDEAL PARA HACER EL MENU DE ENTRADA Y SALIDA------------

let opciones = ["Crear Alumno", "Listar Alumno","Modificar Alumno","Listar Alumno","Eliminar Alumno","Crear Profesor", "Listar Profesor","Modificar Profesor","Listar Profesor","Eliminar Profesor","Crear Listado de Alumnos","Crear Listado de Profesores","Crear listado de UN Alumno","Crear listado de UN Profesor","Crear listado de Profesores por Alumno","Crear listado de Alumnos por Profesor","Listado de Todos los Alumnos con su Promedio"];

console.log("-----------------BIENVENIDO AL MENU DE LEGAJOS-----------------");


let numero = readLineSync.keyInSelect(opciones, "Seleccione una opcion: ")

const gestorDelColegioMatias= new GestorColegio()

switch (numero) {
    case 0:
        console.clear()
        // gestorDelColegioMatias.crearAlumno()
        break;

    case 1:
        console.clear()
        // gestorDelColegioMatias.crearAlumno()
        break;

    case 2:
        console.clear()
        // gestorDelColegioMatias.crearAlumno()
        break;

    default:
        break;
}

// ------------------------------------------------------------------------------