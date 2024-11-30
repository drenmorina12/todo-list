function showDialog(dialog) {
  dialog.showModal();
}

function closeDialog(dialog) {
  dialog.close();
}

function createTodoElement(todo) {
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo-item");

  const statusCircle = document.createElement("div");
  statusCircle.classList.add("status-circle");

  const todoTitle = document.createElement("p");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = todo.title;

  todoElement.appendChild(statusCircle);
  todoElement.appendChild(todoTitle);

  return todoElement;
}

function createTodoList() {
  const todoList = document.createElement("ul");
  todoList.setAttribute("id", "todo-list");

  return todoList;
}

function renderTodos(todoArray) {
  const todoContainer = document.querySelector("#todo-container");
  todoContainer.textContent = "";

  const todoList = createTodoList();
  todoArray.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });

  // Appends the list before the input sections
  todoContainer.insertBefore(todoList, todoContainer.firstChild);
}

export { showDialog, closeDialog, renderTodos };
