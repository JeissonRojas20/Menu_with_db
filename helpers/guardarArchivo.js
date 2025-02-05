const fs = require('fs');

const archivo = './db/data.txt';
const guardarDB = (data) => {


    fs.writeFileSync(archivo, JSON.stringify(data));

}

const cargarDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    return JSON.parse(info);
};

module.exports = { guardarDB, cargarDB };