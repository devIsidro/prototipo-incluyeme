(function () {
  /* ── 1. Scroll-reveal ── */
  const targets = [
    [".blog-page-header__inner", "reveal"],
    [".bcard", "reveal"],
    [".cta-box", "reveal"],
  ];
  targets.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      cls.split(" ").forEach((c) => el.classList.add(c));
      if (el.classList.contains("bcard")) {
        el.classList.add(`reveal-d${Math.min(i + 1, 4)}`);
      }
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ── 2. Magnetic buttons ── */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.2;
      const y = (e.clientY - r.top - r.height / 2) * 0.2;
      btn.style.transform = `translate(${x}px,${y}px) translateY(-2px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
})();
