const Tarea = require('./tarea');
/*
* _listado:
*  { 'uuid-124234-32452345-2: {id:2, desc:asd, completadoEn:92231}}
*  */

class Tareas {
    
    _listado = {};
    
    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor () {
        this._listado = {};
    }


    borrarTarea(id = ''){
        if(this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach ( tarea => {
            this._listado [tarea.id] = tarea;
        });
    
    }

    crearTarea(desc = '' ){
        
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        //1. TAREA :: Completada en verde | Pendiente en rojo
  //      console.log (this._listado);
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea
            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.blue;
            console.log(`${idx} ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas ( completadas = true ) {
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea
            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;
        if (completadas) {
            //mostrarCompletadas
            if (completadoEn) {
                contador += 1;
                console.log(`${contador.toString().green } . ${desc} :: ${estado}`);
            }
        }
        else{
            //mostrar pendientes
            if (!completadoEn) {
                contador += 1;
                console.log(`${contador.toString().green } . ${desc} :: ${estado}`);
            }
        }    
        })
    }

}




module.exports = {
    Tareas
}