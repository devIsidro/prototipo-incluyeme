(function () {
  /* ── 1. Scroll-reveal ── */
  const revealMap = [
    [".tdah-intro__content", "reveal-left"],
    [".tdah-intro__visual", "reveal-right"],
    [".tdah-accordion-section__header", "reveal reveal-d1"],
    [".accordion details", "reveal"],
    [".tdah-cta-strip__text", "reveal-left"],
    [".tdah-cta-strip__btns", "reveal-right"],
    [".cta-box", "reveal"],
  ];

  revealMap.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      cls.split(" ").forEach((c) => el.classList.add(c));
      if (el.tagName === "DETAILS") {
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
  document
    .querySelectorAll(".reveal,.reveal-left,.reveal-right")
    .forEach((el) => io.observe(el));

  /* ── 2. Title underline ── */
  const titleIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("title-underlined");
          titleIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  document
    .querySelectorAll(".tdah-intro__title")
    .forEach((el) => titleIO.observe(el));

  /* ── 3. Magnetic buttons ── */
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

  /* ── 4. 3D tilt on intro image ── */
  const introVisual = document.querySelector(".tdah-intro__visual");
  const introImg = introVisual && introVisual.querySelector(".tdah-intro__img");
  if (introVisual && introImg) {
    introVisual.addEventListener("mousemove", (e) => {
      const r = introVisual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      introImg.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.03)`;
      introImg.style.boxShadow = `${-x * 20}px ${y * 14}px 56px rgba(0,51,102,0.18)`;
    });
    introVisual.addEventListener("mouseleave", () => {
      introImg.style.transform = "";
      introImg.style.boxShadow = "";
    });
  }

  /* ── 5. Stats hover bounce ── */
  document.querySelectorAll(".tdah-stat").forEach((stat) => {
    stat.addEventListener("mouseenter", () => {
      const num = stat.querySelector(".tdah-stat__num");
      if (!num) return;
      num.style.transition = "transform 0.2s cubic-bezier(.22,.68,0,1.2)";
      num.style.transform = "scale(1.12)";
      setTimeout(() => {
        num.style.transform = "";
      }, 220);
    });
  });

  /* ── 6. Accordion: close others on open ── */
  document.querySelectorAll(".accordion details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        document.querySelectorAll(".accordion details").forEach((other) => {
          if (other !== detail) other.removeAttribute("open");
        });
      }
    });
  });
})();
