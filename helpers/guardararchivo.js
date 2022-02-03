const fs = require ('fs');
const { validate } = require('uuid');
const archivo = './db/data.json';

const guardarDB = (data) => {
    
    const valor = JSON.stringify( data );
    fs.writeFileSync( archivo, valor );

}

const leerDB = () => {
    if (!fs.existsSync(archivo) ) {
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);
 //   console.log (data);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}