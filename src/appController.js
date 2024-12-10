import { Project, Todo, ProjectManager } from "./dataModel";
import {
  renderTodos,
  renderProjects,
  changeProjectTitle,
  renderTodoDetails,
  showSelectedTodo,
} from "./domManager";

const projects = new ProjectManager();

function createProject(title) {
  let project = new Project(title);
  projects.addProject(project);
}

let currentProject = null;
let currentTodo = null;

function tempTesting() {
  createProject("Projekti2");
  createProject("Mugiwara");
  createProject("SUI");

  console.log(projects.getAllProjects);

  currentProject = projects.getProject(1);

  let todo11 = new Todo("Todo1111", "today", 1);
  let todo22 = new Todo("MUGIWARA", "tomorrow", 2);
  let todo33 = new Todo("SEWYYY", "1", 1);

  projects.getProject(1).addTodo(todo11);
  projects.getProject(1).addTodo(todo22);
  projects.getProject(1).addTodo(todo33);

  projects.getProject(3).addTodo(todo11);

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
};
