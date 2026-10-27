/* ===== PROJECT DATA: edit or add objects here, cards are built automatically ===== */
const projects = [
  {
    id: "banking",
    title: "FinCore - Secure Digital Banking Platform",
    summary: "A digital banking application to manage customers, accounts, transactions, and related banking operations.",
    tech: ["Java", "Spring Boot", "React.js", "MySQL", "REST APIs"],
    overview: "FinCore is a secure digital banking application developed as part of my Infosys Virtual Internship 7.0. It simplifies banking operations through features such as customer management, account management, transaction processing, loan applications, and report generation. Built using React.js, Java, Spring Boot, and MySQL, the platform focuses on security, efficiency, and a user-friendly experience.",
    features: ["Role-Based Access","Customer Management", "Account management","Transaction Management", "Loan Management"],
    github: "https://github.com/SowndaryaLakshmi04/finCoreBankApplication"
  },
  {
    id: "agri",
    title: "FreshLink - Agricultural Marketplace",
    summary: "An online agricultural marketplace that connects farmers directly with buyers, eliminating intermediaries.",
    tech: ["Java", "Spring Boot", "Python", "HTML5", "CSS3","JavaScript"],
    overview: "FreshLink is a digital agricultural marketplace that connects farmers directly with buyers, eliminating intermediaries. It enables farmers to showcase their produce, reach customers, and improve their selling opportunities while helping buyers access fresh agricultural products conveniently.",
    features: ["Farmer & Buyer Interfaces", "Crop Marketplace", "Order Tracking","Multilingual Support","AI-Powered Crop Quality Analysis"],
    github: "https://github.com/SowndaryaLakshmi04/freshLink"
  },
  {
    id: "book",
    title: "Booklyn - Online BookStore",
    summary: "Booklyn is a responsive online bookstore that lets users explore, search, and shop for books through a simple and interactive interface.",
    tech: ["HTML5", "CSS3","JavaScript"],
    overview: "Booklyn is a responsive online bookstore website that allows users to browse, search, and filter books across different categories. It features an interactive shopping cart with persistent storage, providing a smooth and user-friendly book-shopping experience.",
    features: ["Browse books by category", "Search and filter books", "Interactive shopping cart","Cart data persistence using localStorage"],
    github: "https://github.com/SowndaryaLakshmi04/booklyn"
  }
];

/* ===== SMALL HELPERS ===== */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ===== INTRO SCREEN ===== */
function startIntro() {
  const intro = $("#intro");
  const site = $("#site");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let finished = false;

  function showSite() {
    if (finished) return; // run only once
    finished = true;
    intro.classList.add("is-hidden");
    site.classList.add("is-visible");
    setTimeout(() => intro.remove(), 900);
  }

  // Show the cover for about 3.8 seconds (the GIF runs ~3 seconds) (shorter if reduced motion is on).
  // The timer guarantees the intro can never get stuck.
  setTimeout(showSite, reduceMotion ? 800 : 3800);
}

/* ===== THEME TOGGLE ===== */
function setupTheme() {
  const button = $("#themeToggle");
  const root = document.documentElement;

  function updateLabel() {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", `Switch to ${next} theme`);
  }
  button.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    updateLabel();
  });
  updateLabel();
}

/* ===== MOBILE MENU ===== */
function setupMenu() {
  const burger = $("#burger");
  const menu = $("#menu");

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
}

/* ===== ACTIVE NAV LINK + SECTION REVEAL ===== */
function setupScrollEffects() {
  const links = $$(".nav__menu a");
  const sections = $$("main section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach((section) => observer.observe(section));
  // Fallback: reveal the first sections immediately
  $("#home").classList.add("is-in");
}

/* ===== PROJECTS ===== */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderCards() {
  const grid = $("#projectGrid");
  grid.innerHTML = projects.map((p) => `
    <button class="card" type="button" data-id="${p.id}" aria-expanded="false" aria-controls="projectDetails">
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.summary)}</p>
      <span class="card__tech">${p.tech.map(escapeHtml).join(", ")}</span>
      <span class="card__more">View Details +</span>
    </button>`).join("");
}

function detailsMarkup(p) {
  const links = [
    p.github ? `<a class="btn btn--solid" href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub Repository</a>` : "",
    p.demo ? `<a class="btn" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""
  ].join(" ");
  return `
    <h3>${escapeHtml(p.title)}</h3>
    <h4>Overview</h4><p>${escapeHtml(p.overview)}</p>
    <h4>Main features</h4><ul>${p.features.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}</ul>
    <h4>Technologies used</h4><p>${p.tech.map(escapeHtml).join(", ")}</p>
    <div class="hero__buttons">${links}</div>`;
}

function setupProjects() {
  renderCards();
  const grid = $("#projectGrid");
  const box = $("#projectDetails");
  let openId = null;

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;
    const id = card.dataset.id;

    grid.querySelectorAll(".card").forEach((c) => c.setAttribute("aria-expanded", "false"));

    if (openId === id) {          // same card again: close
      box.hidden = true;
      openId = null;
      return;
    }
    openId = id;                  // new card: update the single details box
    card.setAttribute("aria-expanded", "true");
    box.innerHTML = detailsMarkup(projects.find((p) => p.id === id));
    box.hidden = false;
    box.style.animation = "none"; box.offsetHeight; box.style.animation = ""; // replay reveal
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

/* ===== CONTACT ===== */
function setupCopyEmail() {
  const button = $("#copyEmail");
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("#emailText").textContent.trim());
      button.textContent = "Copied";
    } catch (e) {
      button.textContent = "Copy failed";
    }
    setTimeout(() => (button.textContent = "Copy email"), 1800);
  });
}

/* ===== START ===== */
document.documentElement.classList.add("js");
$("#year").textContent = new Date().getFullYear();
startIntro();
setupTheme();
setupMenu();
setupScrollEffects();
setupProjects();
setupCopyEmail();
