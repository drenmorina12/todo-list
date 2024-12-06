import {
  showDialog,
  closeDialog,
  processTodoForm,
  delegateNotesInputHeight,
  showSelectedTodo,
} from "./domManager";
import {
  switchCurrentProject,
  createProjectFromForm,
  switchCurrentTodo,
} from "./appController";

const projectAddBtn = document.querySelector(".project-add");
const cancelDialogBtn = document.querySelector("#cancel-btn");
const projectAddForm = document.querySelector("#project-add-form");
const dialog = document.querySelector("#projects-dialog");
const taskCreateForm = document.querySelector("#task-input-form");
const projects = document.querySelector("#projects");
const todoInfo = document.querySelector("#todo-info");
const todoListWrapper = document.querySelector("#todo-list-wrapper");

function initEvents() {
  projectAddBtn.addEventListener("click", () => showDialog(dialog));
  projectAddForm.addEventListener("submit", (event) => {
    createProjectFromForm(event);
    closeDialog(dialog);
  });
  cancelDialogBtn.addEventListener("click", () => closeDialog(dialog));
  taskCreateForm.addEventListener("submit", processTodoForm);
  projects.addEventListener("click", switchCurrentProject);
  todoInfo.addEventListener("input", delegateNotesInputHeight);
  todoListWrapper.addEventListener("click", (event) => {
    switchCurrentTodo(event);
    showSelectedTodo(event);
  });
}

export { initEvents };
