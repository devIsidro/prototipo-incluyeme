(function () {
  /* ── 1. Scroll-reveal ── */
  const revealMap = [
    [".donar-intro__block", "reveal"],
    [".donar-portal__header", "reveal reveal-d1"],
    [".donar-portal__wrap", "reveal reveal-d2"],
    [".trust-item", "reveal"],
    [".cta-box", "reveal"],
  ];

  revealMap.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      cls.split(" ").forEach((c) => el.classList.add(c));
      if (el.classList.contains("trust-item")) {
        el.classList.add(`reveal-d${Math.min(i + 1, 4)}`);
      }
      if (el.classList.contains("donar-intro__block")) {
        el.classList.add(`reveal-d${Math.min(i + 1, 2)}`);
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
    { threshold: 0.1 },
  );
  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => io.observe(el));

  /* ── 2. Magnetic buttons ── */
  document.querySelectorAll(".btn-primary, .btn-outline").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.22;
      btn.style.transform = `translate(${x}px,${y}px) translateY(-2px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  /* ── 3. Trust items: number pulse on hover ── */
  document.querySelectorAll(".trust-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const icon = item.querySelector(".trust-item__icon");
      if (!icon) return;
      icon.style.transition = "transform 0.2s cubic-bezier(.22,.68,0,1.2)";
      icon.style.transform = "scale(1.18) rotate(-5deg)";
      setTimeout(() => {
        icon.style.transform = "";
      }, 220);
    });
  });

  /* ── 4. Shimmer on intro titles on hover ── */
  document.querySelectorAll(".donar-intro__block").forEach((block) => {
    block.addEventListener("mouseenter", () => {
      block.querySelector(".donar-intro__icon") &&
        (block.querySelector(".donar-intro__icon").style.transform =
          "scale(1.15) rotate(-4deg)");
    });
    block.addEventListener("mouseleave", () => {
      block.querySelector(".donar-intro__icon") &&
        (block.querySelector(".donar-intro__icon").style.transform = "");
    });
  });

  document.querySelectorAll(".donar-intro__icon").forEach((icon) => {
    icon.style.transition = "transform 0.3s cubic-bezier(.22,.68,0,1.2)";
    icon.style.display = "inline-block";
  });
})();
