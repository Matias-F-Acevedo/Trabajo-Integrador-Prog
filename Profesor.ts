import Materia from "./Materia";
import Persona from "./Persona";

export default class Profesor implements Persona {
    nombre: string;
    apellido: string;
    fechaDeNacimiento:Date;
    dni: number;
    salario: number;
    id: string;
    materiasQueDicta:Materia[];

    constructor(nombre:string, apellido:string, fechaDeNacimiento:Date, dni:number, salario:number, id: string, materiasQueDicta:Materia[]){
        this.nombre= nombre;
        this.apellido= apellido;
        this.fechaDeNacimiento= fechaDeNacimiento;
        this.dni= dni;
        this.salario= salario;
        this.id= id;
        this.materiasQueDicta= materiasQueDicta;
    }
}

