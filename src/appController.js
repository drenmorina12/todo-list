import { Project, Todo, ProjectManager } from "./dataModel";
import { renderTodos, renderProjects } from "./domManager";

const projects = new ProjectManager();

function createProject(title) {
  let project = new Project(title);
  projects.addProject(project);
}

createProject("Projekti2");
createProject("Mugiwara");
createProject("SUI");

console.log(projects.getAllProjects);

let currentProject = projects.getProject(1);

let todo11 = new Todo("Todo1111", "today", 1);
let todo22 = new Todo("MUGIWARA", "tomorrow", 2);
let todo33 = new Todo("SEWYYY", "1", 1);

currentProject.addTodo(todo11);
currentProject.addTodo(todo22);
currentProject.addTodo(todo33);

function createNewTodo({
  project = currentProject,
  title,
  dueDate = "",
  priority = 0,
}) {
  let todo = new Todo(title, dueDate, priority);
  project.addTodo(todo);

  renderTodos(project.getTodos());
  renderProjects(projects.getAllProjects());
}

function test() {
  // let todoList = currentProject.getTodos();
  let todoList2 = currentProject.getTodos();

  // renderTodos(todoList);
  renderTodos(todoList2);
  renderProjects(projects.getAllProjects());
}

export { test, createNewTodo };
