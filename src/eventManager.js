import { showDialog, closeDialog } from "./domManager";

const projectAddBtn = document.querySelector(".project-add");
const cancelDialogBtn = document.querySelector("#cancel-btn");
const dialog = document.querySelector("#projects-dialog");

function initEvents() {
  projectAddBtn.addEventListener("click", () => showDialog(dialog));

  cancelDialogBtn.addEventListener("click", () => closeDialog(dialog));
}

export { initEvents };
