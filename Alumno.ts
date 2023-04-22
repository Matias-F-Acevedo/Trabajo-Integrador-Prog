import Persona from "./Persona";
import Materia from "./Materia";
import Curso from "./Curso";
import NotaPorMateria from "./notaPorMateria";


export default class Alumno implements Persona {
    nombre: string;
    apellido: string;
    fechaDeNacimiento:Date;
    dni: number;
    id:string;
    curso: Curso; 
    materiasMatriculado:Materia[]
    notaPorMateria:NotaPorMateria[];
    promedioGeneral: number;
    

    constructor(nombre:string, apellido:string, fechaDeNacimiento:Date, dni:number, id:string, curso:Curso, materiasMatriculado: Materia[], notaPorMateria:NotaPorMateria[], promedioGeneral: number){
        this.nombre= nombre;
        this.apellido= apellido;
        this.fechaDeNacimiento= fechaDeNacimiento;
        this.dni= dni;
        this.id= id;
        this.curso= curso;
        this.materiasMatriculado= materiasMatriculado;
        this.notaPorMateria= notaPorMateria;
        this.promedioGeneral= promedioGeneral;
    }
}

