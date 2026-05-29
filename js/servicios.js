(function () {
  /* ── 2. Scroll-reveal: add classes to elements ── */
  const revealTargets = [
    [".overview-card", "reveal"],
    [".servicio-detail__visual", "reveal-left"],
    [".servicio-detail__content", "reveal-right"],
    [
      ".servicio-detail__inner--reverse .servicio-detail__visual",
      "reveal-right",
    ],
    [
      ".servicio-detail__inner--reverse .servicio-detail__content",
      "reveal-left",
    ],
    [".stat-item", "reveal"],
    [".cta-section__box", "reveal"],
    [".servicio-detail__number", "reveal reveal-d1"],
    [".servicio-detail__title", "reveal reveal-d2"],
  ];

  revealTargets.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      cls.split(" ").forEach((c) => el.classList.add(c));
      // stagger siblings
      if (el.closest(".servicios-overview")) {
        el.classList.add(`reveal-d${Math.min(i + 1, 4)}`);
      }
      if (el.closest(".stats-strip")) {
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
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => io.observe(el));

  /* ── 3. Feature list staggered reveal ── */
  const featureIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const items = e.target.querySelectorAll("li");
          items.forEach((li, i) => {
            setTimeout(() => li.classList.add("feature-visible"), i * 110);
          });
          featureIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  document
    .querySelectorAll(".servicio-features")
    .forEach((ul) => featureIO.observe(ul));

  /* ── 4. h2 title underline trigger ── */
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
    .querySelectorAll(".servicio-detail__title")
    .forEach((el) => titleIO.observe(el));

  /* ── 5. Stats animated count-up ── */
  function countUp(el, target, suffix, duration) {
    const isFloat = target % 1 !== 0;
    const start = performance.now();
    const from = 0;
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(from + (target - from) * ease);
      el.textContent =
        (suffix === "+" ? "+" : "") +
        val +
        (suffix && suffix !== "+" ? suffix : "");
      if (progress < 1) requestAnimationFrame(frame);
      else
        el.textContent =
          (suffix === "+" ? "+" : "") +
          target +
          (suffix && suffix !== "+" ? suffix : "");
    }
    requestAnimationFrame(frame);
  }

  const statIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const raw = el.textContent.trim();
          const hasPlus = raw.startsWith("+");
          const hasPct = raw.endsWith("%");
          const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
          const suffix = hasPlus ? "+" : hasPct ? "%" : "";
          countUp(el, num, suffix, 1400);
          statIO.unobserve(el);
        }
      });
    },
    { threshold: 0.6 },
  );
  document
    .querySelectorAll(".stat-item__number")
    .forEach((el) => statIO.observe(el));

  /* ── 6. 3D tilt on detail cards (mouse move) ── */
  document.querySelectorAll(".servicio-detail__visual").forEach((wrapper) => {
    const card = wrapper.querySelector(".servicio-detail__card");
    if (!card) return;
    wrapper.addEventListener("mousemove", (e) => {
      const r = wrapper.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.02)`;
      card.style.boxShadow = `${-x * 20}px ${y * 16}px 48px rgba(0,51,102,0.22)`;
    });
    wrapper.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });

  /* ── 7. Magnetic buttons (subtle pull effect) ── */
  document
    .querySelectorAll(".btn-servicio, .btn-primary, .btn-outline")
    .forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.22;
        btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });

  /* ── 8. Stats strip: ripple on stat hover ── */
  document.querySelectorAll(".stat-item").forEach((stat) => {
    stat.addEventListener("mouseenter", () => {
      const num = stat.querySelector(".stat-item__number");
      if (!num) return;
      num.style.transition = "transform 0.2s cubic-bezier(.22,.68,0,1.2)";
      num.style.transform = "scale(1.12)";
      setTimeout(() => {
        num.style.transform = "";
      }, 250);
    });
  });
})();
