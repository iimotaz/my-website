var EDIT_PASSWORD = "motaz2024";

(function () {
  var gate = document.getElementById("pwGate");
  if (!gate) return;

  function readFlag() {
    try { return sessionStorage.getItem("ed_pw"); } catch (e) { return null; }
  }
  function writeFlag() {
    try { sessionStorage.setItem("ed_pw", "1"); } catch (e) {}
  }

  if (readFlag() === "1") {
    gate.remove();
    return;
  }

  var input = document.getElementById("pwInput");
  var button = document.getElementById("pwBtn");
  var error = document.getElementById("pwErr");

  function login() {
    if (input.value === EDIT_PASSWORD) {
      writeFlag();
      gate.remove();
      return;
    }
    error.style.display = "block";
    input.value = "";
    input.focus();
  }

  button.addEventListener("click", login);
  input.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    login();
  });
  input.focus();
})();