const tasksArray = []
const tasks = document.getElementById('tasks');
const modal = document.getElementById('modal');
const form = document.getElementById('form-tasks');
const formEdit = document.getElementById('form-edit');
const find = document.getElementById('find')
const search = document.getElementById('btn-find')
const formSearch = document.getElementById('form-search')

// Insertar o actualizar tarea
const redraw = (task, index) => {
    // Crear HTML con plantillas de texto
    const template = `<li>
      <p>${task}</p>
      <button class="delete">Delete</button>
      <button class="edit">Edit</button>
      </li>`;
    if (index < 0) {
        // Agregar tarea
        tasks.innerHTML += template;
        tasksArray.push(task);
    } else {
        // Actualizar tarea
        const items = tasks.querySelectorAll('li');
        if (items && items[index]) {
            // Solo si realmente existe
            // OuterHTML remplaza todo el elemento
            items[index].outerHTML = template;
            tasksArray[index] = task;
        }
    }
    document.getElementById('vacio').innerHTML = '';
};
// Función para obtener índice de elemento
const taskFind = (item) => {
    const items = tasks.querySelectorAll('li');
    // Valor si no se encuentra el elemento
    let index = -1;
    // Recorrer para buscar
    for (let i = 0; i < items.length; i++) {
        if (items[i] == item) {
            // Elemento encontrado, actualizar índice y salir del ciclo
            index = i;
            break;
        }
    }
    // Devolver índice o -1
    return index;
};
//Funcion para buscar
const buscar = (query) => {
    return tasksArray.reduce((acumulator, element, indx) => {
        if (element.toLowerCase().includes(query.toLowerCase())) {
            acumulator.push({ element, indx })
        }
        return acumulator
    }, [])
}

// Función para borrar, recibe evento
const taskDelete = (e) => {
    // e.target es el botón
    // .closest('li') selecciona el contenedor al que pertenece el botón
    index = taskFind(e.target.closest('li'));
    // Agregar confirmación
    if (index >= 0 && confirm('¿Borrar tarea?')) {
        // Eliminar
        e.target.closest('li').remove();
        tasksArray.splice(index, 1);
        if (tasksArray.length == 0) {
            const vacio = document.getElementById('tasks');
            vacio.innerHTML = '<h1>No hay tareas...</h1>';
        }
    }
};
// Función para editar, recibe evento
const taskEdit = (e) => {
    index = taskFind(e.target.closest('li'));
    if (index >= 0) {
        // Abrir modal enviando índice de elemento a editar
        openModal(index);
    }
};

// Abrir modal, recibe índice del elemento
const openModal = (index) => {
    modal.style.display = 'block';
    // Asignar índice a dataset de formulario, para saber cuál se está editando
    formEdit.dataset.index = index;
    // Asignar valor a campo de formulario
    document.querySelector('#edit-task').value = tasksArray[index];
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const task = document.getElementById('task')
    const tasksText = task.value
    task.value = ''
    if (tasksText === '') {
        alert('Escribe una tarea!')
    } else {
        // Insertar elemento en arreglo y mostrar
        redraw(tasksText, -1);
    }
});

formEdit.addEventListener('submit', e => {
    e.preventDefault();
    const edit = document.getElementById('edit-task');
    const value = edit.value;
    if (value == '') {
        alert('Escribe una tarea');
    } else {
        // Cerrar modal
        modal.style.display = 'none';
        // Actualizar valor, en dataset está el índice del elemento
        redraw(value, parseInt(formEdit.dataset.index));
    }
});
//FormSearch
formSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = find.value
    if (value == '') {
        redraw()
    } else {
        console.log(buscar(value));
    }
})

// Delegar clics para activar botones
tasks.addEventListener('click', e => {
    const item = e.target;
    // Buscar botón por clase
    if (item.classList.contains('delete')) {
        taskDelete(e);
    } else if (item.classList.contains('edit')) {
        taskEdit(e);
    }
});

document.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});