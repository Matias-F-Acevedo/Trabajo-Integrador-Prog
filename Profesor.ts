import Materia from "./Materia";
import Persona from "./Persona";

export default class Profesor implements Persona {
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    salario: number;
    // el numDeIdentificacion esta por ahora de tipo number, pero debe ir una id aleatoria(la cual se le deberia de asignar desde la funcion del gestor "crear profesor"):
    numDeIdentificacion: number;
    materiaQueDicta:Materia;

    constructor(nombre:string, apellido:string, edad:number, dni:number, salario:number, numDeIdentificacion:number, materiaQueDicta:Materia){
        this.nombre= nombre;
        this.apellido= apellido;
        this.edad= edad;
        this.dni= dni;
        this.salario= salario;
        this.numDeIdentificacion= numDeIdentificacion;
        this.materiaQueDicta= materiaQueDicta;
    }
}

