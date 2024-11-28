var colors = require('colors');
const inquirer = require('inquirer');

const preguntas = {

    type: 'list',
    name: 'opciones',
    message: '¿Que acción deseas realizar?',
    choices: [
        {
            value: '1',
            name: `${'1.'.red} Crear tarea`

        },
        {

            value: '2',
            name: `${'2.'.red} Listar tareas`

        },
        {

            value: '3',
            name: `${'3.'.red} Listar tareas completas`

        },
        {

            value: '4',
            name: `${'4.'.red} Listar tareas pendientes`

        },
        {

            value: '5',
            name: `${'5.'.red} Completar tareas`

        },
        {

            value: '6',
            name: `${'6.'.red} Borrar tarea`

        },
        {

            value: '0',
            name: `${'0.'.red} Salir`

        }
    ]
}

// Es el menu que se va a mostrar al ejecutar el programa
const menu = async () => {

    console.clear();
    console.log('='.repeat(24).green);
    console.log('First Application'.blue);
    console.log('='.repeat(24).green);
    console.log('\n');

    const { opciones } = await inquirer.prompt(preguntas);
    return opciones;
    
}

const pausa = async () => {
    const pregunta = [

        {

            type: 'input',
            name: 'enter',
            message: `Presiona la tecla ${'Enter'.green} para continuar`

        }
    ]

    console.log('\n');
    await inquirer.prompt(pregunta);
    
}

const leerInput = async(message) => {

    const pregunta = [

        {

            type: 'input',
            name: 'desc',
            message,
            validate(value){

                if(value.length === 0){

                    return 'Por favor ingresa un valor';

                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(pregunta);
    return desc;

}

const completarTareas = async(tareas) => {

    const pregunta = [

        {

            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas a completar:',
            choices: tareas.listarTareasParaCompletar()

        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

const seleccionarTareaParaEliminar = async (tareas) => {
    const choices = tareas.listadoArreglo.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        };
    });

    // Añade la opción de cancelar
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const pregunta = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea a eliminar:',
            choices
        }
    ];

    const { id } = await inquirer.prompt(pregunta);
    return id; // Retorna el ID de la tarea seleccionada o '0' si se cancela
};


module.exports = {
    menu,
    pausa,
    leerInput,
    completarTareas,
    seleccionarTareaParaEliminar
};