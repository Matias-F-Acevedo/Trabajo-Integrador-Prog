const fs = require('fs');


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



module.exports = {verificarExitencia, escribir, leer, guardar}