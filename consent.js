const ANALYTICS_SRC = "";
function loadAnalytics() {
  if (!ANALYTICS_SRC) return;
  const s = document.createElement("script");
  s.defer = true; s.src = ANALYTICS_SRC; document.head.appendChild(s);
}
const KEY = "eightyeight-consent";
let consent = null;
try { consent = localStorage.getItem(KEY); } catch (e) {}
if (consent === "yes") loadAnalytics();
if (!consent) {
  const b = document.createElement("div");
  b.className = "cookie"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", "Consentement aux cookies");
  b.innerHTML = "<p>Nous utilisons une mesure d'audience respectueuse de la vie privée, uniquement si vous l'acceptez. Détails dans notre <a href=\"privacy.html\">politique de confidentialité</a>.</p><div class=\"cookie__actions\"><button class=\"btn\" data-c=\"yes\">ACCEPTER</button><button class=\"btn btn--ghost\" data-c=\"no\">REFUSER</button></div>";
  b.addEventListener("click", (e) => {
    const c = e.target.dataset && e.target.dataset.c; if (!c) return;
    try { localStorage.setItem(KEY, c); } catch (x) {}
    if (c === "yes") loadAnalytics(); b.remove();
  });
  document.body.appendChild(b);
}
