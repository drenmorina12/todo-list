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
    const index = this.#projectList.findIndex((p) => p.id === projectId);
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
