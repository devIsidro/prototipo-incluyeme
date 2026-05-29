(function () {
  /* ── Scroll-reveal ── */
  document
    .querySelectorAll(
      ".post-header__inner, .post-body__inner, .post-tips li, .cta-box",
    )
    .forEach((el, i) => {
      el.classList.add("reveal");
      if (el.tagName === "LI")
        el.classList.add(`reveal-d${Math.min((i % 6) + 1, 3)}`);
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

  /* ── Magnetic buttons ── */
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

  /* ── Progress bar on scroll ── */
  const bar = document.createElement("div");
  bar.style.cssText =
    "position:fixed;top:0;left:0;height:3px;background:var(--gold);z-index:9999;transition:width 0.1s linear;width:0%;";
  document.body.appendChild(bar);
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrolled / total) * 100}%`;
  });
})();
