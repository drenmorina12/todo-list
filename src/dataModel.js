class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  getTodos() {
    return this.todos;
  }
}

class Todo {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;

    this.completed = false;
    this.description = "";
  }

  toggleCompleted() {
    this.completed === false
      ? (this.completed = true)
      : (this.completed = false);
  }

  getCompletedStatus() {
    return this.completed;
  }

  addDescription(description) {
    this.description = description;
  }

  changePriority(tag) {
    this.priority = tag;
  }
}

export { Project, Todo };
