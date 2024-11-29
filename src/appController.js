import { Project, Todo } from "./dataModel";

let project1 = new Project("Project 1");

let todo1 = new Todo("Todo1", "today", 1);
let todo2 = new Todo("Todo2", "tomorrow", 2);

project1.addTodo(todo1);
project1.addTodo(todo2);

todo1.toggleCompleted();
todo1.addDescription("Helloooo");

function test() {
  console.log(project1.getTodos());
}

export { test };
