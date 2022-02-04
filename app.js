require('colors');

const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} = require('./helpers/inquirer.js');
const Tarea = require ('./models/tarea');
const {Tareas} = require ('./models/tareas');
const { guardarDB, leerDB } = require ('./helpers/guardararchivo.js');

console.clear();

const main = async () => {

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
       tareas.cargarTareasFromArray(tareasDB);
    }

        do {
            // esta opcion imprime el menu
            opt = await inquirerMenu();

            switch (opt) {
                case '1':
                    //crear opcion
                        const desc = await leerInput('Descripcion:')
                        tareas.crearTarea(desc);
                break;
                case '2':
                    tareas.listadoCompleto();     
                break;
                case '3':
                    tareas.listarPendientesCompletadas(true);     
                break;
                case '4':
                    tareas.listarPendientesCompletadas(false);     
                break;
                case '5':
                    const ids = await mostrarListadoChecklist(tareas.listadoArr);
                    tareas.toggleCompletadas(ids);
              //      console.log(ids);
                break;
                case '6':
                    const id = await listadoTareasBorrar (tareas.listadoArr);
                    if (id !== '0') 
                    {
                        const ok = await confirmar('Esta seguro?');                    
                        console.log({ ok });
                        if ( ok ) 
                        {
                            tareas.borrarTarea( id );
                            console.log('Tarea Borrada');
                        }
                    }
                break;

            }
            
         guardarDB(tareas.listadoArr);

            await pausa();
        } while(opt !== '0');
}
main();