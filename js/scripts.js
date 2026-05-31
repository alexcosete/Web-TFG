document.addEventListener("DOMContentLoaded", () => {
  const motivo = document.getElementById("motivo");
  const amenarFields = document.getElementById("amenarFields");
  const amenarRequiredFields = document.querySelectorAll(".amenar-required");
  const contactForm = document.getElementById("contactForm");

  function toggleAmenarFields() {
    if (!motivo || !amenarFields) return;

    const isAmenar = motivo.value === "amenar";

    amenarFields.classList.toggle("d-none", !isAmenar);

    amenarRequiredFields.forEach((field) => {
      if (isAmenar) {
        field.setAttribute("required", "required");
      } else {
        field.removeAttribute("required");
        field.value = "";
      }
    });
  }

  if (motivo) {
    motivo.addEventListener("change", toggleAmenarFields);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
      }

      alert("Formulario enviado correctamente.");

      contactForm.reset();
      contactForm.classList.remove("was-validated");
      toggleAmenarFields();

      const modal = document.getElementById("contactModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);

      if (modalInstance) {
        modalInstance.hide();
      }
    });
  }
});