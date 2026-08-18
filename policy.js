(function() {
  "use strict";
  var saved = localStorage.getItem("motaz-theme");
  if (saved) document.body.setAttribute("data-theme", saved);
  else if (window.matchMedia("(prefers-color-scheme: light)").matches) document.body.setAttribute("data-theme", "light");

  var btn = document.getElementById("themeToggleBtn");
  if (btn) {
    btn.addEventListener("click", function () {
      var next = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", next);
      localStorage.setItem("motaz-theme", next);
    });
  }
})();
