window.onload = () => {
    const todos = []
    const form = document.getElementById('form')
    const todo = document.getElementById('todo')

    const todoSubmit = (e) => {
        e.preventDefault()
        const txt = todo.value
        console.log(txt)
        todo.value = ''
    }

    form.addEventListener('submit', e => todoSubmit(e))
}