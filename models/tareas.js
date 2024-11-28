const { guardarDB, cargarDB } = require('../helpers/guardarArchivo');
const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
        this.cargarTareas(); // Cargar las tareas al inicializar
    }

    get listadoArreglo() {
        return Object.values(this._listado);
    }

    get listadoTareasCompletadas() {
        return this.listadoArreglo.filter(tarea => tarea.completadoEn === true);
    }

    get listadoTareasPendientes() {
        return this.listadoArreglo.filter(tarea => tarea.completadoEn !== true);
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        this.guardarTareas();
    }

    listarTareasParaCompletar() {
        return this.listadoArreglo.map((tarea, i) => ({
            value: tarea.id,
            name: `${(i + 1 + '.').green} ${tarea.desc} :: ${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red}`,
            checked: tarea.completadoEn
        }));
    }

    guardarTareas() {
        guardarDB(this._listado);
    }

    cargarTareas() {
        const data = cargarDB();
        if (data) {
            this._listado = data;
        }
    }

    eliminarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
            this.guardarTareas();
        }
    }
}

module.exports = Tareas;
