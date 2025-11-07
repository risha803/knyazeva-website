export function initContactForm() {
  const form = document.querySelector(".contact__form");
  if (!form) return;

  const inputs = form.querySelectorAll(".contact__input, .contact__textarea");
  const sendButton = form.querySelector(".contact__btn-submit");
  const buttonText = sendButton.querySelector(".contact__btn-text");
  const sendIcon = sendButton.querySelector(".icon-send");
  const checkIcon = sendButton.querySelector(".icon-check");

  // --- Проверка одного поля ---
  const validateField = (field) => {
    const errorSpan = field.nextElementSibling;
    let valid = true;

    if (field.hasAttribute("required") && !field.value.trim()) {
      valid = false;
    } else if (field.type === "email") {
      const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(field.value.trim())) valid = false;
    }

    field.classList.toggle("invalid", !valid);
    field.classList.toggle("valid", valid);

    return valid;
  };

  // --- Отправка формы ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let allValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) allValid = false;
    });
    if (!allValid) return;

    // Анимация "взлетает"
    sendButton.classList.add("loading");
    buttonText.textContent = "Взлетает";
    buttonText.classList.add("loading");
    sendIcon.style.transform = "translateX(-80px) translateY(-40px) rotate(-25deg) scale(0.5)";
    sendIcon.style.opacity = "0";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        buttonText.classList.remove("loading");
        buttonText.textContent = "Отправлено";
        checkIcon.style.opacity = "1";
        checkIcon.style.transform = "translateY(0)";
        form.reset();
        inputs.forEach((i) => i.classList.remove("valid"));
      } else {
        showErrorState("Ошибка отправки");
      }
    } catch {
      showErrorState("Ошибка сети");
    } finally {
      sendButton.classList.remove("loading");
      setTimeout(resetButton, 3000);
    }
  });

  // --- Валидация на вводе ---
  inputs.forEach((input) => {
    input.addEventListener("input", () => validateField(input));
  });

  function showErrorState(message) {
    buttonText.textContent = message;
    buttonText.style.color = "#ff8080";
    setTimeout(resetButton, 3000);
  }

  function resetButton() {
    sendIcon.style.transform = "translateX(0) translateY(0) rotate(0) scale(1)";
    sendIcon.style.opacity = "1";
    checkIcon.style.opacity = "0";
    buttonText.style.color = "#fff";
    buttonText.textContent = "Отправить";
  }
}