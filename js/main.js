window.onload = () => {
    const todos = []
    const form = document.getElementById('form')
    const todoInput = document.getElementById('text')
    const done = document.getElementById('done')
    const todosText = document.getElementById('todos')

    const todoSubmit = (e) => {
        e.preventDefault()
        const title = todoInput.value
        const status = false
        todos.push({ title, status })
        render()
        todoInput.value = ''
    }
    const render = () => {
        const template = todos.map(todo => `
        <div class="todos">
            <p class="subtitle">
                <strong>${todo.title}</strong>
            </p>
            <label class="checkbox">
                <input type="checkbox" id="done">
                Done
            </label><br/>
            <button type="button" class="button">Edit</button>
            <button type="button" class="button is-danger">Delete</button>
        </div>
        `)

        todosText.innerHTML = template.join('')
    }

    const todoSearch = (e) => {
        e.preventDefault()
    }
    form.addEventListener('submit', e => todoSubmit(e))
    form.addEventListener('submit', e => todoSearch(e))
}