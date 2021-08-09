window.onload = () => {
    let todos = []
    const form = document.getElementById('form')
    const todoInput = document.getElementById('text')
    const done = document.getElementById('done')
    const todosList = document.getElementById('todos')
    const empty = document.getElementById('empty')
    const modal = document.getElementById('modal')
    const closeModal = document.getElementById('closeModal')

    const todoSubmit = (e) => {
        e.preventDefault()
        const title = todoInput.value
        const status = false
        todos.push({ title, status })
        render()
        todoInput.value = ''
    }
    const todoSearch = (e) => {
        e.preventDefault()
    }

    const render = () => {
        if (!todos.length === 0) {
            empty.classList.add('isEmpty')
        }
        const template = todos.map((todo, index) => ` 
        <div class="todos">
            <p class="subtitle">
                <strong>${todo.title}</strong>
            </p>
            <label class="checkbox">
                <input type="checkbox" id="done">
                Done
            </label><br/>
            <button type="button" class="button" data-id=${index} id='edit'>Edit</button>
            <button type="button" class="button is-danger" data-id=${index} id='remove'>Delete</button>
        </div>
        `)

        todosList.innerHTML = template.join('')
    }


    const removeTodo = e => {
        const todoTarget = e.target.id
        if (todoTarget === 'remove') {
            const idTodo = Number(e.target.getAttribute('data-id'))
            todos = todos.filter((x, index) => index !== idTodo)
            render()
        }
    }

    const todoEdit = e => {
        const showHideModal = e.target.id
        if (showHideModal === 'edit') {
            const idTodo = Number(e.target.getAttribute('data-id'))
            modal.classList.add('is-active')
                //console.log(modal)
            todos.filter((x, i) => i === idTodo && textEdit(x.title, i))
                //todoTextEdit()
        }
    }

    const textEdit = (tittle, i) => {
        console.log(tittle)
        const editButton = document.getElementById('todoEdit')
        const fielEdit = document.getElementById('todo')
        fielEdit.value = tittle
        editButton.addEventListener('click', () => todoEdited(i))
    }

    const todoEdited = index => {
        const fielEdit = document.getElementById('todo')
        const newTodo = {
            tittle: fielEdit.value,
            status: false
        }
        todos.splice(index, 1, newTodo)
            //todos.splice(index, 1, newTodo)
            //console.log(index)
            //console.log(newTodo)
            /* todos = todos.splice(index, 1, newTodo)
            console.log(todos) */
        console.log(todos)
        modal.classList.remove('is-active')
            //modal.classList.remove('is-active')
    }


    const openCloseModal = () => {
        modal.classList.remove('is-active')
    }

    closeModal.addEventListener('click', openCloseModal)
    todosList.addEventListener('click', removeTodo)
    todosList.addEventListener('click', todoEdit)
    form.addEventListener('submit', e => todoSubmit(e))
    form.addEventListener('submit', e => todoSearch(e))
}