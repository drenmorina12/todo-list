import { showDialog, closeDialog, processTodoForm } from "./domManager";
import { createNewTodo, switchCurrentProject } from "./appController";

const projectAddBtn = document.querySelector(".project-add");
const cancelDialogBtn = document.querySelector("#cancel-btn");
const dialog = document.querySelector("#projects-dialog");
const taskCreateForm = document.querySelector("#task-input-form");
const projects = document.querySelector("#projects");

// Add event listener to every

function initEvents() {
  projectAddBtn.addEventListener("click", () => showDialog(dialog));
  cancelDialogBtn.addEventListener("click", () => closeDialog(dialog));
  taskCreateForm.addEventListener("submit", processTodoForm);
  projects.addEventListener("click", switchCurrentProject);
}

export { initEvents };
