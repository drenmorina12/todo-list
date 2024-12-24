import { createNewTodo } from "./appController";

function showDialog(dialog) {
  dialog.showModal();
}

function closeDialog(dialog) {
  dialog.close();
}

function createTodoElement(todo) {
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo-item");
  todoElement.dataset.id = todo.id;
  todoElement.setAttribute("tabindex", "0");
  if (todo.getCompletedStatus()) {
    todoElement.classList.add("checked");
  }

  const statusCircle = document.createElement("div");
  statusCircle.classList.add("status-circle");

  const todoTitle = document.createElement("p");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = todo.title;

  const removeTodo = document.createElement("div");
  removeTodo.classList.add("remove-todo");

  todoElement.appendChild(statusCircle);
  todoElement.appendChild(todoTitle);
  todoElement.appendChild(removeTodo);

  return todoElement;
}

function createTodoList() {
  const todoList = document.createElement("ul");
  todoList.setAttribute("id", "todo-list");

  return todoList;
}

function showSelectedTodo(event) {
  const clickedTodo = event.target.closest(".todo-item");

  if (!clickedTodo) return;

  document.querySelectorAll(".todo-item").forEach((todo) => {
    todo.classList.remove("selected");
  });

  clickedTodo.classList.add("selected");
}

function renderTodos(todoArray) {
  const todoContainer = document.querySelector("#todo-list-wrapper");
  todoContainer.textContent = "";

  const todoList = createTodoList();
  todoArray.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.insertBefore(todoElement, todoList.firstChild);
  });

  // Appends the list before the input sections
  todoContainer.insertBefore(todoList, todoContainer.firstChild);
}

function processTodoForm(event) {
  event.preventDefault();

  const form = event.target;
  const title = document.querySelector("#task-input").value.trim();
  const dueDate = "";
  const priority = 0;

  if (!title) {
    alert("Taks title cannot be empty");
    return;
  }

  createNewTodo({ title, dueDate, priority });
  form.reset();
}

function renderTodoDetails(todo) {
  const todoInfoContainer = document.querySelector("#todo-info");
  todoInfoContainer.textContent = "";

  if (todo === undefined) {
    return;
  }

  const todoTitle = document.createElement("div");
  todoTitle.classList.add("task-title");
  todoTitle.textContent = todo.title;

  const dueDate = document.createElement("div");
  dueDate.classList.add("due-date");
  dueDate.textContent = todo.dueDate;

  const notes = document.createElement("div");
  notes.classList.add("notes");
  notes.textContent = "NOTES";

  const notesTextarea = document.createElement("textarea");
  notesTextarea.id = "notes-input";
  notesTextarea.name = "notes-input";
  notesTextarea.placeholder = "Insert your notes here";
  notesTextarea.rows = "1";
  notesTextarea.textContent = todo.getNotes();

  todoInfoContainer.appendChild(todoTitle);
  todoInfoContainer.appendChild(dueDate);
  todoInfoContainer.appendChild(notes);
  todoInfoContainer.appendChild(notesTextarea);

  notesInputHeight(notesTextarea);
}

function notesInputHeight(notesInput) {
  if (notesInput.scrollHeight > 120) {
    notesInput.style.overflow = "auto";
  } else {
    notesInput.style.height = "auto";
    notesInput.style.overflow = "hidden";

    notesInput.style.height = `${notesInput.scrollHeight}px`;
  }
}

function delegateNotesInputHeight(event) {
  if (event.target.matches("#notes-input")) {
    notesInputHeight(event.target);
  }
}

function createProjectElement(project) {
  const projectContainer = document.createElement("li");
  projectContainer.classList.add("project");
  projectContainer.dataset.id = project.id;

  const projectTitle = document.createElement("p");
  projectTitle.textContent = project.title;

  const projectCount = document.createElement("div");
  projectCount.classList.add("project-count");
  projectCount.textContent = project.getTodos().length;

  projectContainer.appendChild(projectTitle);
  projectContainer.appendChild(projectCount);

  return projectContainer;
}

function renderProjects(projectArray) {
  const projects = document.querySelector("#projects");
  projects.textContent = "";

  projectArray.forEach((project) => {
    const projectElement = createProjectElement(project);
    projects.appendChild(projectElement);
  });
}

function changeProjectTitle(project) {
  const currentProjectName = document.querySelector(".current-project-name");

  currentProjectName.textContent = project.title;
  // removeClearButton();
}

// function removeClearButton() {
//   if (!isRemovableProject()) {
//     const clearProjectBtn = document.querySelector(".clear-project-btn");
//   }
// }

export {
  showDialog,
  closeDialog,
  renderTodos,
  processTodoForm,
  renderProjects,
  changeProjectTitle,
  renderTodoDetails,
  delegateNotesInputHeight,
  showSelectedTodo,
};
