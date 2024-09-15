document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (menuButton && dropdownMenu) {
    menuButton.addEventListener("click", function () {
      if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
      } else {
        dropdownMenu.style.display = "block";
      }
    });

    // Optional: Close the dropdown if the user clicks outside of it
    window.addEventListener("click", function (event) {
      if (
        !menuButton.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.style.display = "none";
      }
    });
  }
});
