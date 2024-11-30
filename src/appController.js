import { Project, Todo } from "./dataModel";
import { renderTodos } from "./domManager";

let project1 = new Project("Project 1");

let todo1 = new Todo("Todo1", "today", 1);
let todo2 = new Todo("Todo2", "tomorrow", 2);
let todo3 = new Todo("SEWYYY", "1", 1);

project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);

todo1.toggleCompleted();
todo1.addDescription("Helloooo");

function test() {
  let todoList = project1.getTodos();
  todoList.forEach((todo) => {
    // console.log(todo.title);
    // console.log("__________");
  });
  renderTodos(todoList);
}

export { test };
