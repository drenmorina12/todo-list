import { Project, Todo } from "./dataModel";
import { renderTodos } from "./domManager";

// let project1 = new Project("Project 1");

// let currentProject = project1;

// let todo1 = new Todo("Todo1", "today", 1);
// let todo2 = new Todo("Todo2", "tomorrow", 2);
// let todo3 = new Todo("SEWYYY", "1", 1);

let project2 = new Project("Project 1");

let todo11 = new Todo("Todo1111", "today", 1);
let todo22 = new Todo("MUGIWARA", "tomorrow", 2);
let todo33 = new Todo("SEWYYY", "1", 1);

project2.addTodo(todo11);
project2.addTodo(todo22);
project2.addTodo(todo33);
project2.addTodo(todo1);

// currentProject.addTodo(todo1);
// currentProject.addTodo(todo2);
// currentProject.addTodo(todo3);

// todo1.toggleCompleted();
// todo1.addDescription("Helloooo");

function createNewTodo({
  project = project2,
  title,
  dueDate = "",
  priority = 0,
}) {
  let todo = new Todo(title, dueDate, priority);
  project.addTodo(todo);

  renderTodos(project.getTodos());
}

function test() {
  // let todoList = currentProject.getTodos();
  let todoList2 = project2.getTodos();

  // renderTodos(todoList);
  renderTodos(todoList2);
}

export { test, createNewTodo };
