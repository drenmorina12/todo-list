import { Project, Todo, ProjectManager } from "./dataModel";
import {
  renderTodos,
  renderProjects,
  changeProjectTitle,
  renderTodoDetails,
  showSelectedTodo,
} from "./domManager";

// Initialize project manager and current selections
let projects = new ProjectManager();
let currentProject = null;
let currentTodo = null;

initializeProjects();

// Function to initialize projects from localStorage or create a default project
function initializeProjects() {
  let projectsFromLocalStorage = JSON.parse(localStorage.getItem("projects"));

  if (!projectsFromLocalStorage || projectsFromLocalStorage.length === 0) {
    createProject("Personal", true);
    currentProject = projects.getProject(1);
  } else {
    loadProjectsFromLocalStorage(projectsFromLocalStorage);
    currentProject = projects.getProject(1);
    currentTodo =
      currentProject.getTodos()[currentProject.getTodos().length - 1];
  }
}

// Function to load projects from localStorage
function loadProjectsFromLocalStorage(projectsFromLocalStorage) {
  projectsFromLocalStorage.forEach((project) => {
    let newProject = new Project(project.title, project.isDefault);
    project.todos.forEach((todo) => {
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
}

function createProject(title, isDefault = false) {
  let project = new Project(title, isDefault);
  projects.addProject(project);
}

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
  localStorage.setItem("projects", JSON.stringify(projects.getAllProjects()));
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

// Function to remove the current project
function removeProject() {
  projects.removeProject(currentProject);
  currentProject = projects.getAllProjects()[0];
  renderProjectsAndTodos();
}

// Function to switch the current todo
function switchCurrentTodo(event) {
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
}

// Function to toggle the completion status of the current todo
function checkTodo() {
  currentTodo.toggleCompleted();
  renderTodos(currentProject.getTodos());
}

// Function to create a project from a form submission
function createProjectFromForm(event) {
  const projectTitle = document.querySelector("#project-title").value;
  const form = event.target;

  event.preventDefault();
  createProject(projectTitle);
  renderProjectsAndTodos();

  form.reset();
}

// Function to highlight the initial todo
function highlightInitialTodo() {
  if (!currentTodo) return;
  document
    .querySelector(`.todo-item[data-id="${currentTodo.id}"]`)
    .classList.add("selected");
}

// Function to update the notes of the current todo
function updateNote(event) {
  const noteInput = event.target;
  if (noteInput.matches("#notes-input")) {
    currentTodo.addNotes(noteInput.value);
    localStorage.setItem("projects", JSON.stringify(projects.getAllProjects()));
  }
}

// Function for testing purposes
function initializeApp() {
  renderProjectsAndTodos();
  highlightInitialTodo();
  renderTodoDetails(currentTodo);
}

export {
  initializeApp,
  createNewTodo,
  switchCurrentProject,
  createProjectFromForm,
  switchCurrentTodo,
  updateNote,
  removeProject,
};
