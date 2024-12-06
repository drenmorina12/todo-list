class Project {
  #idcounter;
  constructor(title) {
    this.title = title;
    this.todos = [];
    this.#idcounter = 1;
  }

  addTodo(todo) {
    this.todos.push(todo);
    todo.id = this.#idcounter++;
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  getTodos() {
    return this.todos;
  }

  getTodo(todoId) {
    return this.todos.find((p) => p.id === todoId);
  }
}

class Todo {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;

    this.completed = false;
    this.notes = "";
  }

  toggleCompleted() {
    this.completed === false
      ? (this.completed = true)
      : (this.completed = false);
  }

  getCompletedStatus() {
    return this.completed;
  }

  addNotes(notes) {
    this.notes = notes;
  }

  getNotes() {
    return this.notes;
  }

  changePriority(tag) {
    this.priority = tag;
  }
}

class ProjectManager {
  #projectList;
  #idcounter;

  constructor() {
    this.#projectList = [];
    this.#idcounter = 1;
  }

  addProject(project) {
    project.id = this.#idcounter++;
    this.#projectList.push(project);
  }

  removeProject(projectId) {
    const inx = this.#projectList.findIndex((p) => p.id === projectId);
    if (index > -1) {
      this.#projectList.splice(index, 1);
    }
  }

  getProject(projectId) {
    return this.#projectList.find((p) => p.id === projectId);
  }

  getAllProjects() {
    return [...this.#projectList];
  }
}

export { Project, Todo, ProjectManager };
