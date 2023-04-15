import Alumno from "./Alumno";
import Materia from "./Materia";
import Profesor from "./Profesor";

export default class Curso {
    nombre: string;
    materias: Materia[];

    constructor(nombre: string, materias: Materia[]){
        this.nombre = nombre;
        this.materias = materias;
    }
}

