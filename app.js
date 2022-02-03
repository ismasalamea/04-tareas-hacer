require('colors');

const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer.js');
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
                    console.log(tareas.listadoArr);       
                break;
            }
            
         guardarDB(tareas.listadoArr);

            await pausa();
        } while(opt !== '0');
}
main();