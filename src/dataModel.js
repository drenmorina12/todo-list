class Project {
  #idcounter;
  constructor(title, isDefault = false) {
    this.title = title;
    this.todos = [];
    this.#idcounter = 1;
    this.isDefault = isDefault;
  }

  addTodo(todo) {
    this.todos.push(todo);
    todo.id = this.#idcounter++;
  }

  removeTodo(todo) {
    const index = this.todos.indexOf(todo);

    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }

  getTodos() {
    return this.todos;
  }

  getTodo(todoId) {
    return this.todos.find((p) => p.id === todoId);
  }
}

class Todo {
  constructor(title, dueDate, priority, completed = false, notes = "") {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;

    this.completed = completed;
    this.notes = notes;
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

  removeProject(project) {
    const index = this.#projectList.indexOf(project);

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
