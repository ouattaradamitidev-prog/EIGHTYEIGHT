const CONFIG = { FORM_ENDPOINT: "" };
const menuBtn = document.getElementById("menu-btn"), navLinks = document.getElementById("nav-links");
const menuIcon = menuBtn.querySelector("i");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuIcon.setAttribute("class", navLinks.classList.contains("open") ? "ri-close-line" : "ri-menu-4-line");
});
const form = document.getElementById("contact-form");
if (form) {
  const p = new URLSearchParams(location.search).get("service");
  if (p) { const o = [...form.service.options].find((x) => x.value === p); if (o) form.service.value = p; }
  const status = document.getElementById("form-status");
  const rules = {
    name: (v) => v.trim().length >= 2 || "Veuillez saisir votre nom.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Veuillez saisir une adresse e-mail valide.",
    message: (v) => v.trim().length >= 10 || "Votre message doit contenir au moins 10 caractères.",
  };
  const check = (n) => {
    const f = form[n], r = rules[n](f.value), err = document.getElementById("err-" + n);
    f.setAttribute("aria-invalid", r !== true); err.textContent = r === true ? "" : r; return r === true;
  };
  Object.keys(rules).forEach((n) => form[n].addEventListener("blur", () => check(n)));
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); status.textContent = "";
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok || form.website.value) return;
    if (!CONFIG.FORM_ENDPOINT) { status.textContent = "Le formulaire n'est pas encore relié à une boîte mail. Votre message n'a pas été envoyé."; return; }
    try {
      const r = await fetch(CONFIG.FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.value, email: form.email.value, phone: form.phone.value, service: form.service.value, message: form.message.value }) });
      if (!r.ok) throw new Error();
      form.reset(); status.textContent = "Merci, votre message a bien été envoyé.";
    } catch (x) { status.textContent = "Une erreur est survenue. Veuillez réessayer plus tard."; }
  });
}
