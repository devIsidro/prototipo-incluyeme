(function () {
  /* ── 2. Assign reveal classes ── */
  const map = [
    [".mision-visual", "reveal-left"],
    [".mision-content", "reveal-right"],
    [".vision-content", "reveal-left"],
    [".vision-visual", "reveal-right"],
    [".mision-content .section-eyebrow", "reveal reveal-d1"],
    [".mision-content .section-title", "reveal reveal-d2"],
    [".vision-content .section-eyebrow", "reveal reveal-d1"],
    [".vision-content .section-title", "reveal reveal-d2"],
    [".ods-strip", "reveal reveal-d3"],
    [".section-break", "reveal"],
    [".pillar-card", "reveal"],
    [".cta-box", "reveal"],
  ];
  map.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      cls.split(" ").forEach((c) => el.classList.add(c));
      if (el.classList.contains("pillar-card")) {
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
    .querySelectorAll(".reveal,.reveal-left,.reveal-right")
    .forEach((el) => io.observe(el));

  /* ── 3. Feature list stagger (vision values + chips) ── */
  const featureIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll("li, .chip").forEach((el, i) => {
            setTimeout(() => el.classList.add("feature-visible"), i * 120);
          });
          featureIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  document
    .querySelectorAll(".vision-values, .keyword-chips")
    .forEach((ul) => featureIO.observe(ul));

  // keyword chips initial hidden state
  document.querySelectorAll(".keyword-chips .chip").forEach((chip) => {
    chip.style.opacity = "0";
    chip.style.transform = "translateY(12px)";
    chip.style.transition = "opacity 0.45s ease, transform 0.45s ease";
  });
  // override feature-visible for chips
  const chipIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".chip").forEach((chip, i) => {
            setTimeout(() => {
              chip.style.opacity = "1";
              chip.style.transform = "none";
            }, i * 100);
          });
          chipIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  document
    .querySelectorAll(".keyword-chips")
    .forEach((el) => chipIO.observe(el));

  /* ── 4. Section title underline ── */
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

  /* ── 5. 3D Tilt on visual cards ── */
  document
    .querySelectorAll(".mision-visual, .vision-visual")
    .forEach((wrapper) => {
      const card = wrapper.querySelector(
        ".mision-img-placeholder, .vision-img-placeholder",
      );
      if (!card) return;
      wrapper.addEventListener("mousemove", (e) => {
        const r = wrapper.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.03)`;
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
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  /* ── 7. Pillar cards: emoji bounce on hover ── */
  document.querySelectorAll(".pillar-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const emoji = card.querySelector(".pillar-card__emoji");
      if (!emoji) return;
      emoji.style.animation = "none";
      setTimeout(() => {
        emoji.style.animation = "";
      }, 10);
    });
  });

  /* ── 9. Divider image upload ── */
  const dividerWrap = document.getElementById("divider-icon-wrap");
  const dividerInput = document.getElementById("divider-upload");
  const dividerImg = document.getElementById("divider-img");
  const dividerPH = document.getElementById("divider-placeholder");

  if (dividerWrap) {
    // click opens file picker
    dividerWrap.addEventListener("click", () => dividerInput.click());

    // hover effect (only when no image loaded)
    dividerWrap.addEventListener("mouseenter", () => {
      if (!dividerImg.style.display || dividerImg.style.display === "none") {
        dividerWrap.style.background = "rgba(244,194,13,0.15)";
        dividerWrap.style.borderColor = "var(--gold)";
      }
    });
    dividerWrap.addEventListener("mouseleave", () => {
      dividerWrap.style.background = "";
      dividerWrap.style.borderColor = "";
    });

    dividerInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        dividerImg.src = ev.target.result;
        dividerImg.style.display = "block";
        dividerPH.style.display = "none";
        // stop spin animation once image is loaded
        dividerWrap.style.animation = "none";
        dividerWrap.style.cursor = "default";
        dividerWrap.style.width = "64px";
        dividerWrap.style.height = "64px";
      };
      reader.readAsDataURL(file);
    });
  }
})();
