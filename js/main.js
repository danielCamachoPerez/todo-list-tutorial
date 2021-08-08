window.onload = () => {
    let todos = []
    const form = document.getElementById('form')
    const todoInput = document.getElementById('text')
    const done = document.getElementById('done')
    const todosList = document.getElementById('todos')
    const empty = document.getElementById('empty')
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
            <button type="button" class="button">Edit</button>
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

    todosList.addEventListener('click', removeTodo)
    form.addEventListener('submit', e => todoSubmit(e))
    form.addEventListener('submit', e => todoSearch(e))
}