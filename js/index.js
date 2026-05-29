(function () {
  /* ── 1. Scroll-reveal ── */
  const revealMap = [
    [".mission__text-col", "reveal-left"],
    [".mission-cards", "reveal-right"],
    [".pcard", "reveal"],
    [".impact-item", "reveal"],
    [".story-card.story-main", "reveal-left"],
    [".story-small", "reveal-right"],
    [".volunteer-img", "reveal-left"],
    [".volunteer-content", "reveal-right"],
    [".bcard", "reveal"],
    [".cta-box", "reveal"],
  ];

  revealMap.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      cls.split(" ").forEach((c) => el.classList.add(c));
      if (
        ["pcard", "bcard", "impact-item"].some((c) => el.classList.contains(c))
      ) {
        el.classList.add(`reveal-d${Math.min((i % 4) + 1, 4)}`);
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
    .querySelectorAll(".reveal,.reveal-left,.reveal-right")
    .forEach((el) => io.observe(el));

  /* ── 2. Hero glow parallax ── */
  const glow = document.querySelector(".hero__glow");
  if (glow) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      glow.style.transform = `translate(${x}px,${y}px)`;
    });
  }

  /* ── 3. Hero image 3D tilt ── */
  const heroVisual = document.querySelector(".hero__visual");
  const heroCard = heroVisual && heroVisual.querySelector(".hero__img-card");
  if (heroVisual && heroCard) {
    heroVisual.addEventListener("mousemove", (e) => {
      const r = heroVisual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      heroCard.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.02)`;
      heroCard.style.boxShadow = `${-x * 20}px ${y * 14}px 56px rgba(0,0,0,0.28)`;
    });
    heroVisual.addEventListener("mouseleave", () => {
      heroCard.style.transform = "";
      heroCard.style.boxShadow = "";
    });
  }

  /* ── 4. Magnetic buttons ── */
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

  /* ── 5. mcard stagger entrance ── */
  const mcardIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".mcard").forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "none";
            }, i * 100);
          });
          mcardIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".mission-cards").forEach((el) => {
    el.querySelectorAll(".mcard").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateX(20px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    mcardIO.observe(el);
  });

  /* ── 6. Hero entrance animations ── */
  const heroEls = document.querySelectorAll(
    ".hero__eyebrow, .hero__title, .hero__desc, .hero__btns",
  );
  heroEls.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.85s ${i * 0.14}s cubic-bezier(.22,.68,0,1.2), transform 0.85s ${i * 0.14}s cubic-bezier(.22,.68,0,1.2)`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
      }),
    );
  });

  /* ── 7. Hero visual entrance ── */
  const heroVisualEl = document.querySelector(".hero__visual");
  if (heroVisualEl) {
    heroVisualEl.style.opacity = "0";
    heroVisualEl.style.transform = "translateX(40px)";
    heroVisualEl.style.transition =
      "opacity 0.9s 0.5s cubic-bezier(.22,.68,0,1.2), transform 0.9s 0.5s cubic-bezier(.22,.68,0,1.2)";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        heroVisualEl.style.opacity = "1";
        heroVisualEl.style.transform = "none";
      }),
    );
  }

  /* ── 8. Impact items: glow on hover ── */
  document.querySelectorAll(".impact-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const num = item.querySelector(".impact-num");
      if (num) {
        num.style.transition = "transform 0.2s cubic-bezier(.22,.68,0,1.2)";
        num.style.transform = "scale(1.08)";
        setTimeout(() => {
          num.style.transform = "";
        }, 220);
      }
    });
  });
})();
