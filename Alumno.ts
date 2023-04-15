import Persona from "./Persona";
import Materia from "./Materia";
import Curso from "./Curso";
import NotaPorMateria from "./notaPorMateria";


export default class Alumno implements Persona {
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    // la matricula esta por ahora de tipo number, pero debe ir una id aleatoria(la cual se le deberia de asignar desde la funcion del gestor "crear alumno"):
    matricula:number
    curso: Curso; 
    materiasMatriculado:Materia[]
    notaPorMateria:NotaPorMateria[];
    promedioGeneral: number;
    

    constructor(nombre:string, apellido:string, edad:number, dni:number, matricula:number, curso:Curso, materiasMatriculado: Materia[], notaPorMateria:NotaPorMateria[], promedioGeneral: number){
        this.nombre= nombre;
        this.apellido= apellido;
        this.edad= edad;
        this.dni= dni;
        this.matricula= matricula;
        this.curso= curso;
        this.materiasMatriculado= materiasMatriculado;
        this.notaPorMateria= notaPorMateria;
        this.promedioGeneral= promedioGeneral;
    }
}

