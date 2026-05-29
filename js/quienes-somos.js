(function () {
  /* ── 2. Assign scroll-reveal classes ── */
  const revealMap = [
    [".qs-intro__visual", "reveal-left"],
    [".qs-intro__content", "reveal-right"],
    [".qs-comprometidos__content", "reveal-left"],
    [".qs-comprometidos__visual", "reveal-right"],
    [".qs-proyecto__header", "reveal reveal-d1"],
    [".qs-video-wrap", "reveal reveal-d2"],
    [".quote-card", "reveal"],
    [".qs-visitanos__info", "reveal-left"],
    [".qs-visitanos__map", "reveal-right"],
    [".pillar-card", "reveal"],
    [".gallery-item", "reveal"],
    [".section-break", "reveal"],
    [".cta-box", "reveal"],
  ];
  revealMap.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      cls.split(" ").forEach((c) => el.classList.add(c));
      if (
        el.classList.contains("pillar-card") ||
        el.classList.contains("gallery-item")
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

  /* ── 3. Section title underline ── */
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
    .querySelectorAll(".section-title")
    .forEach((el) => titleIO.observe(el));

  /* ── 4. Vision-values + keyword-chips staggered entrance ── */
  const featureIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target
            .querySelectorAll("li")
            .forEach((el, i) =>
              setTimeout(() => el.classList.add("feature-visible"), i * 120),
            );
          featureIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  document
    .querySelectorAll(".vision-values")
    .forEach((ul) => featureIO.observe(ul));

  // chips
  document.querySelectorAll(".keyword-chips .chip").forEach((chip) => {
    chip.style.cssText +=
      "opacity:0;transform:translateY(12px);transition:opacity 0.45s ease,transform 0.45s ease;";
  });
  const chipIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".chip").forEach((chip, i) =>
            setTimeout(() => {
              chip.style.opacity = "1";
              chip.style.transform = "none";
            }, i * 100),
          );
          chipIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  document
    .querySelectorAll(".keyword-chips")
    .forEach((el) => chipIO.observe(el));

  /* ── 5. 3D tilt on image cards ── */
  document
    .querySelectorAll(".qs-intro__visual, .qs-comprometidos__visual")
    .forEach((wrapper) => {
      const card = wrapper.querySelector("img");
      if (!card) return;
      wrapper.addEventListener("mousemove", (e) => {
        const r = wrapper.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.03)`;
        card.style.boxShadow = `${-x * 24}px ${y * 18}px 56px rgba(0,51,102,0.18)`;
      });
      wrapper.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    });

  /* ── 6. Magnetic buttons ── */
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

  /* ── 8. Section-break icon pause on hover ── */
  document.querySelectorAll(".section-break__icon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.animationPlayState = "paused";
      icon.style.background = "var(--gold)";
    });
    icon.addEventListener("mouseleave", () => {
      icon.style.animationPlayState = "running";
      icon.style.background = "var(--white)";
    });
  });

  /* ── 9. Gallery lightbox-feel: scale on focus ── */
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;
      // simple pulse on click
      img.style.transition = "transform 0.15s ease";
      img.style.transform = "scale(0.97)";
      setTimeout(() => {
        img.style.transform = "";
      }, 150);
    });
  });

  /* ── 10. Quote card avatar: spin border on hover ── */
  const avatar = document.querySelector(".avatar-circle");
  if (avatar) {
    avatar.addEventListener("mouseenter", () => {
      avatar.style.borderColor = "var(--blue-dark)";
    });
    avatar.addEventListener("mouseleave", () => {
      avatar.style.borderColor = "var(--gold)";
    });
  }
})();
