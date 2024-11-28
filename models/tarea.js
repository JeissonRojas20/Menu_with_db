const { v4: uuidv4 } = require('uuid');

class Tarea {

    id = '';
    desc= '';
    completadoEn = false;

    constructor(desc) {

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = false;
    }
}

module.exports = Tarea;