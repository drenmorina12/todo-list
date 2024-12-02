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
}

export {
  showDialog,
  closeDialog,
  renderTodos,
  processTodoForm,
  renderProjects,
  changeProjectTitle,
};
