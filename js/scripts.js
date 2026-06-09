
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("active")));
}
document.querySelectorAll(".counter").forEach(counter => {
  const target = Number(counter.dataset.target || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 70));
  const update = () => {
    current += step;
    if (current >= target) counter.textContent = target + "+";
    else { counter.textContent = current + "+"; requestAnimationFrame(update); }
  };
  update();
});


// V3 Premium interactions
window.addEventListener("load", () => {
  const loader = document.querySelector(".site-loader");
  if (loader) {
    setTimeout(() => loader.classList.add("hidden"), 350);
  }
});

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
});

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));

document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    if (!item) return;
    document.querySelectorAll(".faq-item").forEach(other => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

document.querySelectorAll("a[href$='.html']").forEach(link => {
  link.addEventListener("click", (e) => {
    const url = link.getAttribute("href");
    if (!url || url.startsWith("http") || url.startsWith("mailto:")) return;
    e.preventDefault();
    document.body.style.opacity = "0";
    setTimeout(() => { window.location.href = url; }, 180);
  });
});
