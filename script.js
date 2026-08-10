const root = document.documentElement;
const body = document.body;
const header = document.querySelector(".site-header");
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("primary-navigation");
const currentYear = document.getElementById("current-year");

const storedTheme = localStorage.getItem("theme");
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = storedTheme || (systemPrefersLight ? "light" : "dark");

function applyTheme(theme) {
    const isLight = theme === "light";

    root.dataset.theme = theme;
    themeToggle.querySelector("span").textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", isLight ? "#f3f0e9" : "#0b0b0b");
}

applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
});

function closeMenu() {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
        closeMenu();
        return;
    }

    navigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    body.classList.add("menu-open");
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

function updateHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

window.matchMedia("(min-width: 993px)").addEventListener("change", (event) => {
    if (event.matches) {
        closeMenu();
    }
});

const revealItems = document.querySelectorAll("[data-reveal]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.14 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

currentYear.textContent = String(new Date().getFullYear());
g