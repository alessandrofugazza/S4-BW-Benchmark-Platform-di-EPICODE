function checkCheckbox() {
  const checkbox = document.getElementById("agree-checkbox");
  const proceedButton = document.querySelector(".custom-button");
  proceedButton.disabled = !checkbox.checked;
  const fakeCheckbox = document.querySelector(".tick>div");
  if (checkbox.checked) {
    fakeCheckbox.parentElement.style.padding = "2px";
  } else {
    fakeCheckbox.parentElement.style.padding = "0px";
  }
  fakeCheckbox.classList.toggle("fakeTick");
}

document.getElementById("agree-checkbox").addEventListener("change", checkCheckbox);
document.querySelector(".custom-button").addEventListener("click", function (event) {
  event.preventDefault(); // Evita il comportamento predefinito del pulsante (submit del form)
  if (document.getElementById("agree-checkbox").checked) {
    // Inserisci qui il link alla pagina successiva
    window.location.href = "benchmark.html";
  } else {
    alert("please tick the box");
  }
});
