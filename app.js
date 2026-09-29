const progress = document.getElementById("progress");
const backTop = document.getElementById("backTop");
const printButton = document.getElementById("printButton");
const themeToggle = document.getElementById("themeToggle");
const sections = [...document.querySelectorAll(".document-section[id]")];
const tocLinks = [...document.querySelectorAll("#toc a")];

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
  progress.style.width = `${Math.min(100, ratio * 100)}%`;
  backTop.classList.toggle("visible", scrollTop > 700);
}

function updateActiveSection() {
  const marker = window.scrollY + 140;
  let current = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= marker) current = section.id;
  }

  tocLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.section === current);
  });
}

window.addEventListener("scroll", () => {
  updateScrollUI();
  updateActiveSection();
}, { passive: true });

printButton.addEventListener("click", () => window.print());

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dinepa-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("dinepa-theme") === "dark") {
  document.body.classList.add("dark");
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

updateScrollUI();
updateActiveSection();
