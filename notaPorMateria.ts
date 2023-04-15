import Materia from "./Materia";

export default class NotaPorMateria {
    materia:Materia;
    nota:number;

constructor(materia:Materia, nota:number){
    this.materia= materia;
    this.nota= nota;
}
}