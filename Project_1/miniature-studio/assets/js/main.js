const ThemeModule = (() => {
  const THEME_KEY = "studio-theme";
  const DIR_KEY = "studio-dir";
  const root = document.documentElement;

  const preferredTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const applyTheme = (theme, persist = true) => {
    root.setAttribute("data-theme", theme);
    if (persist) {
      localStorage.setItem(THEME_KEY, theme);
    }
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.textContent = theme === "dark" ? "🌙" : "☀️";
    });
  };

  const applyDir = (direction, persist = true) => {
    root.setAttribute("dir", direction);
    if (persist) {
      localStorage.setItem(DIR_KEY, direction);
    }
    document.querySelectorAll("[data-dir-toggle]").forEach((button) => {
      const isRtl = direction === "rtl";
      button.setAttribute("aria-pressed", String(isRtl));
      button.textContent = isRtl ? "RTL" : "LTR";
    });
  };

  const init = () => {
    const storedTheme = localStorage.getItem(THEME_KEY) || preferredTheme();
    const storedDir = localStorage.getItem(DIR_KEY) || root.getAttribute("dir") || "ltr";
    applyTheme(storedTheme, false);
    applyDir(storedDir, false);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    });

    document.querySelectorAll("[data-dir-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = root.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
        applyDir(next);
      });
    });

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(event.matches ? "dark" : "light", false);
        }
      });
  };

  return { init };
})();

const MenuModule = (() => {
  const init = () => {
    document.querySelectorAll("[data-menu-toggle]").forEach((toggle) => {
      const mobileMenu = toggle
        .closest("header")
        .querySelector("[data-mobile-menu]");
      if (!mobileMenu) {
        return;
      }
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        mobileMenu.classList.toggle("hidden");
      });
    });
  };

  return { init };
})();

const RevealModule = (() => {
  const init = () => {
    const targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-3");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((target) => observer.observe(target));
  };
  return { init };
})();

const SkeletonModule = (() => {
  const hideSkeleton = (wrapper) => {
    const skeleton = wrapper.querySelector("[data-skeleton]");
    if (!skeleton) {
      return;
    }
    skeleton.classList.add("opacity-0");
    setTimeout(() => skeleton.remove(), 280);
  };

  const init = () => {
    document.querySelectorAll("[data-image-wrap]").forEach((wrapper) => {
      const image = wrapper.querySelector("img");
      if (!image) {
        return;
      }
      if (image.complete) {
        hideSkeleton(wrapper);
        return;
      }
      image.addEventListener("load", () => hideSkeleton(wrapper), { once: true });
      image.addEventListener("error", () => hideSkeleton(wrapper), { once: true });
    });
  };

  return { init };
})();

const PortfolioFilterModule = (() => {
  const FILTER_ACTIVE = "filter-active";
  const FILTER_IDLE = "filter-idle";

  const parseTokenSet = (value) =>
    String(value || "")
      .split(",")
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean);

  const init = () => {
    const grid = document.querySelector("#portfolioGrid");
    if (!grid) {
      return;
    }
    const items = Array.from(grid.querySelectorAll("[data-item]"));
    const groups = Array.from(document.querySelectorAll("[data-filter-group]"));
    const active = { genre: "all", service: "all" };

    const matches = (item) => {
      const genres = parseTokenSet(item.dataset.genre);
      const services = parseTokenSet(item.dataset.service);
      const byGenre = active.genre === "all" || genres.includes(active.genre);
      const byService = active.service === "all" || services.includes(active.service);
      return byGenre && byService;
    };

    const showItem = (item) => {
      item.style.display = "";
      requestAnimationFrame(() => item.classList.remove("hidden-item"));
      item.setAttribute("aria-hidden", "false");
    };

    const hideItem = (item) => {
      item.classList.add("hidden-item");
      item.setAttribute("aria-hidden", "true");
      setTimeout(() => {
        if (item.classList.contains("hidden-item")) {
          item.style.display = "none";
        }
      }, 260);
    };

    const paint = () => {
      items.forEach((item) => {
        if (matches(item)) {
          showItem(item);
        } else {
          hideItem(item);
        }
      });
    };

    const refreshButtons = () => {
      groups.forEach((group) => {
        const key = group.dataset.filterGroup;
        group.querySelectorAll("[data-filter-value]").forEach((button) => {
          const isActive = button.dataset.filterValue === active[key];
          button.classList.remove(isActive ? FILTER_IDLE : FILTER_ACTIVE);
          button.classList.add(isActive ? FILTER_ACTIVE : FILTER_IDLE);
          button.setAttribute("aria-pressed", String(isActive));
        });
      });
    };

    groups.forEach((group) => {
      const key = group.dataset.filterGroup;
      group.querySelectorAll("[data-filter-value]").forEach((button) => {
        button.addEventListener("click", () => {
          active[key] = button.dataset.filterValue;
          refreshButtons();
          paint();
        });
      });
    });

    refreshButtons();
    paint();
  };

  return { init };
})();

const FormValidationModule = (() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const rules = {
    full_name: (value) => value.trim().length >= 2 || "Enter at least 2 characters.",
    email: (value) => emailRegex.test(value.trim()) || "Enter a valid email address.",
    service: (value) => value.trim().length > 0 || "Choose one service type.",
    budget: (value) =>
      value.trim().length === 0 || /^\$?\d+([,-]\d+)?(\+)?$/.test(value.trim())
        ? true
        : "Use a simple amount format like 500 or 1,200+.",
    message: (value) => value.trim().length >= 20 || "Message must be at least 20 characters.",
  };

  const renderFieldError = (form, field, message) => {
    const error = form.querySelector(`[data-error-for="${field.id}"]`);
    const tooltip = form.querySelector(`[data-tooltip-for="${field.id}"]`);
    if (error) {
      error.textContent = message || "";
    }
    if (tooltip) {
      tooltip.textContent = message || "";
      tooltip.classList.toggle("hidden", !message);
    }
    field.setAttribute("aria-invalid", String(Boolean(message)));
    field.classList.toggle("border-red-600", Boolean(message));
  };

  const validateField = (form, field) => {
    const rule = rules[field.id];
    if (!rule) {
      return true;
    }
    const result = rule(field.value);
    const message = result === true ? "" : result;
    renderFieldError(form, field, message);
    return result === true;
  };

  const init = () => {
    document.querySelectorAll("[data-validate-form]").forEach((form) => {
      const fields = Array.from(form.querySelectorAll("[data-validate]"));
      const successBanner = form.querySelector("[data-form-success]");

      fields.forEach((field) => {
        const handler = () => validateField(form, field);
        field.addEventListener("input", handler);
        field.addEventListener("blur", handler);
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const valid = fields.every((field) => validateField(form, field));
        if (!valid) {
          return;
        }
        if (successBanner) {
          successBanner.classList.remove("hidden");
        }
        form.reset();
        fields.forEach((field) => renderFieldError(form, field, ""));
      });
    });
  };

  return { init };
})();

const UtilityModule = (() => {
  const init = () => {
    document.querySelectorAll("[data-current-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  };
  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  ThemeModule.init();
  MenuModule.init();
  RevealModule.init();
  SkeletonModule.init();
  PortfolioFilterModule.init();
  FormValidationModule.init();
  UtilityModule.init();
});
