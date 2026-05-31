document.addEventListener("DOMContentLoaded", () => {
  const motivo = document.getElementById("motivo");
  const amenarFields = document.getElementById("amenarFields");
  const amenarRequiredFields = document.querySelectorAll(".amenar-required");
  const contactForm = document.getElementById("contactForm");
  const contactModalElement = document.getElementById("contactModal");
  const contactLinks = document.querySelectorAll(".contact-link");

  function openContactModal() {
    if (!contactModalElement) return;

    const contactModal = new bootstrap.Modal(contactModalElement);
    contactModal.show();
  }

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

    if (isAmenar) {
      setTimeout(() => {
        amenarFields.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 200);
    }
  }

  if (motivo) {
    motivo.addEventListener("change", toggleAmenarFields);
  }

  contactLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (contactModalElement) {
        event.preventDefault();
        openContactModal();
        history.replaceState(null, "", "#contacto");
      }
    });
  });

  if (window.location.hash === "#contacto") {
    openContactModal();
  }

  if (contactModalElement) {
    contactModalElement.addEventListener("hidden.bs.modal", () => {
      if (window.location.hash === "#contacto") {
        history.replaceState(null, "", window.location.pathname);
      }
    });
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

      const modalInstance = bootstrap.Modal.getInstance(contactModalElement);

      if (modalInstance) {
        modalInstance.hide();
      }
    });
  }
});