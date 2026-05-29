/* =========================================================
   GLOBAL.JS
   Funcionalidades compartidas en todas las páginas:
   - Carrusel HERO
   - Menú móvil (hamburguesa)
   - Bloqueo de enlaces no implementados
========================================================= */

"use strict";

/* =========================================================
   1. HERO CAROUSEL (SLIDER PRINCIPAL)
   - Maneja navegación manual (sin autoplay)
   - Seguro: no se ejecuta si no existe el carrusel en la página
========================================================= */
(function () {
  /* ── 1.1 Referencias al DOM ── */
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const dots = Array.from(document.querySelectorAll(".carousel-dot"));
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  /* ── 1.2 Protección global ── */
  if (!slides.length || !dots.length || !btnPrev || !btnNext) return;

  /* ── 1.3 Estado interno ── */
  let current = slides.findIndex((s) => s.classList.contains("active"));
  if (current === -1) current = 0;
  let isAnimating = false;

  /* ── 1.4 Navegación central ── */
  function goTo(index) {
    if (isAnimating || index === current) return;

    isAnimating = true;

    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = ((index % slides.length) + slides.length) % slides.length;

    slides[current].classList.add("active");
    dots[current].classList.add("active");

    setTimeout(() => (isAnimating = false), 400);
  }

  /* ── 1.5 Controles ── */
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  /* ── 1.6 Eventos de interacción ── */
  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
})();

/* =========================================================
   2. MENÚ MÓVIL (HAMBURGUESA)
========================================================= */

let isMobileMenuOpen = false;

function toggleMobileMenu() {
  const menu = document.getElementById("menu");
  const nav = document.getElementById("navbarNav");
  const button = document.querySelector(".mobile-toggle");

  if (!menu || !nav || !button) return;

  isMobileMenuOpen = !isMobileMenuOpen;

  menu.classList.toggle("mobile-open");
  nav.classList.toggle("open");

  button.setAttribute("aria-expanded", isMobileMenuOpen);
}

function handleLinkClick() {
  const menu = document.getElementById("menu");
  const nav = document.getElementById("navbarNav");
  const button = document.querySelector(".mobile-toggle");

  if (!menu || !nav || !button) return;

  menu.classList.remove("mobile-open");
  nav.classList.remove("open");

  button.setAttribute("aria-expanded", "false");

  window.scrollTo(0, 0);
}

/* =========================================================
   3. ENLACES NO IMPLEMENTADOS
========================================================= */

document.querySelectorAll(".no-click").forEach((link) => {
  link.addEventListener("click", (e) => e.preventDefault());
});

// ── Scroll progress bar ──
const bar = document.createElement("div");
bar.style.cssText =
  "position:fixed;top:0;left:0;height:3px;background:var(--gold);z-index:9999;transition:width 0.1s linear;width:0%;";
document.body.appendChild(bar);
window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${(window.scrollY / total) * 100}%`;
});
