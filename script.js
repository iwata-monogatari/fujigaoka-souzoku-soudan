(function () {
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
  menu.addEventListener("click", function (event) {
    if (event.target.tagName === "A") menu.classList.remove("open");
  });
})();
