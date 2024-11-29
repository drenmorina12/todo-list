const addProject = document.querySelector(".project-add");
const cancelDialog = document.querySelector("#cancel-btn");
const dialog = document.querySelector("#projects-dialog");

function initEvents() {
  addProject.addEventListener("click", function () {
    dialog.showModal();
    // dialog.style.display = "flex";
  });

  cancelDialog.addEventListener("click", () => {
    dialog.close();
    // dialog.style.display = "none";
  });
}

export { initEvents };
