import Materia from "./Materia";
import Persona from "./Persona";

export default class Profesor implements Persona {
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    salario: number;
    idProfesional: string;
    materiasQueDicta:Materia[];

    constructor(nombre:string, apellido:string, edad:number, dni:number, salario:number, idProfesional: string, materiasQueDicta:Materia[]){
        this.nombre= nombre;
        this.apellido= apellido;
        this.edad= edad;
        this.dni= dni;
        this.salario= salario;
        this.idProfesional= idProfesional;
        this.materiasQueDicta= materiasQueDicta;
    }
}

