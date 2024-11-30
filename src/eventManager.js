import { showDialog, closeDialog, processTodoForm } from "./domManager";
import { createNewTodo } from "./appController";

const projectAddBtn = document.querySelector(".project-add");
const cancelDialogBtn = document.querySelector("#cancel-btn");
const dialog = document.querySelector("#projects-dialog");
const taskCreateForm = document.querySelector("#task-input-form");

function initEvents() {
  taskCreateForm.addEventListener("submit", processTodoForm);
  projectAddBtn.addEventListener("click", () => showDialog(dialog));
  cancelDialogBtn.addEventListener("click", () => closeDialog(dialog));
}

export { initEvents };
