(function () {
  /* ── 1. Scroll-reveal ── */
  const revealMap = [
    [".form-card", "reveal-left"],
    [".info-sidebar", "reveal-right"],
    [".cta-box", "reveal"],
  ];
  revealMap.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el) => {
      cls.split(" ").forEach((c) => el.classList.add(c));
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

  /* ── 3. Magnetic submit button ── */
  const submitBtn = document.querySelector(".btn-submit");
  if (submitBtn) {
    submitBtn.addEventListener("mousemove", (e) => {
      const r = submitBtn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.18;
      submitBtn.style.transform = `translate(${x}px,${y}px) translateY(-2px)`;
    });
    submitBtn.addEventListener("mouseleave", () => {
      submitBtn.style.transform = "";
    });
  }

  /* ── 4. Form input focus lift ── */
  document
    .querySelectorAll(".field input, .field textarea")
    .forEach((input) => {
      input.addEventListener("focus", () => {
        input.closest(".field").style.transform = "translateY(-1px)";
      });
      input.addEventListener("blur", () => {
        input.closest(".field").style.transform = "";
      });
    });

  /* ── 5. Form validation + submission ── */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      // Required fields
      const required = form.querySelectorAll("[required]");
      required.forEach((field) => {
        field.classList.remove("error");
        if (!field.value.trim()) {
          field.classList.add("error");
          valid = false;
        }
      });

      // Email format
      const emailField = document.getElementById("email");
      if (
        emailField &&
        emailField.value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)
      ) {
        emailField.classList.add("error");
        valid = false;
      }

      if (!valid) {
        // Shake the first error field
        const firstError = form.querySelector(".error");
        if (firstError) {
          firstError.style.animation = "shake 0.4s ease";
          setTimeout(() => {
            firstError.style.animation = "";
          }, 400);
        }
        return;
      }

      // Success state
      form.style.opacity = "0";
      form.style.transition = "opacity 0.3s ease";
      setTimeout(() => {
        form.style.display = "none";
        success.style.display = "block";
        success.style.opacity = "0";
        success.style.transition = "opacity 0.4s ease";
        requestAnimationFrame(() => {
          success.style.opacity = "1";
        });
      }, 300);
    });

    // Clear error on input
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => input.classList.remove("error"));
    });
  }
})();
