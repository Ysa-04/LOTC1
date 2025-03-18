const karakterButtons = document.querySelectorAll("#karakter button");
const filmButtons = document.querySelectorAll("#film button");

function changeButtonColor(button) {
  button.classList.toggle("active");

  const parent = button.parentElement;
  const siblings = parent.querySelectorAll("button");
  siblings.forEach((sibling) => {
    if (sibling !== button) {
      sibling.classList.remove("active");
    }
  });
}

karakterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeButtonColor(button);
  });
});

filmButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeButtonColor(button);
  });
});
