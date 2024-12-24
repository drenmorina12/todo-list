import { Project, Todo, ProjectManager } from "./dataModel";
import {
  renderTodos,
  renderProjects,
  changeProjectTitle,
  renderTodoDetails,
  showSelectedTodo,
} from "./domManager";

let projectsFromLocalStorage = JSON.parse(localStorage.getItem("projects"));
let projects = new ProjectManager();

let currentProject = null;
let currentTodo = null;

function createProject(title, isDefault = false) {
  let project = new Project(title, isDefault);
  projects.addProject(project);
}

function tempTesting() {
  projectsFromLocalStorage.forEach((project) => {
    let newProject = new Project(project.title, project.isDefault);
    let todos = project.todos;
    todos.forEach((todo) => {
      let newTodo = new Todo(
        todo.title,
        todo.dueDate,
        todo.priority,
        todo.completed,
        todo.notes
      );
      newProject.addTodo(newTodo);
    });

    projects.addProject(newProject);
  });

  currentProject = projects.getProject(1);
  currentTodo = currentProject.getTodos()[currentProject.getTodos().length - 1];
}

tempTesting();

function createNewTodo({
  project = currentProject,
  title,
  dueDate = "",
  priority = 0,
}) {
  let todo = new Todo(title, dueDate, priority);
  project.addTodo(todo);

  renderProjectsAndTodos();
}

function renderProjectsAndTodos() {
  renderTodos(currentProject.getTodos());
  renderProjects(projects.getAllProjects());
  changeProjectTitle(currentProject);
}

function switchCurrentProject(event) {
  const clickedProject = event.target.closest(".project");
  const clickedProjectId = parseInt(clickedProject.dataset.id);

  currentProject = projects.getProject(clickedProjectId);
  renderProjectsAndTodos();
  currentTodo = currentProject.getTodos()[currentProject.getTodos().length - 1];
  renderTodoDetails(currentTodo);
  highlightInitialTodo();
}

function removeProject() {
  projects.removeProject(currentProject);
  currentProject = projects.getAllProjects()[0];
  renderProjectsAndTodos();
}

// function isRemovableProject() {
//   if (currentProject.isDefault) {
//     return false;
//   } else {
//     return true;
//   }
// }

function switchCurrentTodo(event) {
  // TODO: Remove stuff that doesnt fit in this function to other function
  const clickedTodo = event.target.closest(".todo-item");
  if (!clickedTodo) return;

  const clickedTodoId = parseInt(clickedTodo.dataset.id);
  currentTodo = currentProject.getTodo(clickedTodoId);

  if (event.target.classList.contains("status-circle")) {
    checkTodo();
    return;
  }

  if (event.target.classList.contains("remove-todo")) {
    currentProject.removeTodo(currentTodo);
    renderProjectsAndTodos();
    return;
  }

  renderTodoDetails(currentTodo);
  showSelectedTodo(event);

  // TODO
}

function checkTodo() {
  currentTodo.toggleCompleted();
  renderTodos(currentProject.getTodos());
}

function createProjectFromForm(event) {
  const projectTitle = document.querySelector("#project-title").value;
  const form = event.target;

  event.preventDefault();
  createProject(projectTitle);
  renderProjectsAndTodos();

  form.reset();
}

function highlightInitialTodo() {
  if (!currentTodo) return;
  document
    .querySelector(`.todo-item[data-id="${currentTodo.id}"]`)
    .classList.add("selected");
}

function updateNote(event) {
  const noteInput = event.target;
  if (noteInput.matches("#notes-input")) {
    currentTodo.addNotes(noteInput.value);
  }
}

function test() {
  renderProjectsAndTodos();
  highlightInitialTodo();
  renderTodoDetails(currentTodo);
}

export {
  test,
  createNewTodo,
  switchCurrentProject,
  createProjectFromForm,
  switchCurrentTodo,
  updateNote,
  removeProject,
};
