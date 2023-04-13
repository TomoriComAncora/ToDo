//Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelarEditBtn = document.querySelector("#cancelar-edit-btn");

let oldInputValue;

//Funções
const saveTodo = (text) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finaliza-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("editar-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
  
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })
}
//Eventos
todoForm.addEventListener("submit", (e) => {

    e.preventDefault();

     const inputValue = todoInput.value

     if(inputValue){
        saveTodo(inputValue);
     }
})

document.addEventListener("click", (e) => {
    const targetE1 = e.target;
    const parentE1 = targetE1.closest("div");
    let todoTitle;

    if(parentE1 && parentE1.querySelector("h3")){
        todoTitle = parentE1.querySelector("h3").innerText;
    }

    if(targetE1.classList.contains("finaliza-todo")){
        parentE1.classList.toggle("done");
    }

    if(targetE1.classList.contains("remove-todo")){
        parentE1.remove();
    }

    if(targetE1.classList.contains("editar-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelarEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
});