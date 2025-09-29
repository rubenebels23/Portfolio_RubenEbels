/***********************
 * 1) Sticky nav on scroll
 ***********************/
const nav = document.getElementById("nav");

function updateNavOnScroll() {
  const scrolledPastTop = window.scrollY > 10;
  nav.classList.toggle("scrolled", scrolledPastTop);
}

// Run once on load, then on scroll
updateNavOnScroll();
document.addEventListener("scroll", updateNavOnScroll, { passive: true });

/***********************
 * 2) Mobile menu toggle
 ***********************/
const menuToggleBtn = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const srStatus = document.getElementById("sr-status"); // screen-reader live region (optional)

function openMenu() {
  nav.classList.add("open");
  menuToggleBtn.setAttribute("aria-expanded", "true");
  if (srStatus) srStatus.textContent = "Navigation opened";
}

function closeMenu() {
  nav.classList.remove("open");
  menuToggleBtn.setAttribute("aria-expanded", "false");
  if (srStatus) srStatus.textContent = "Navigation closed";
}

function toggleMenu() {
  const isOpen = nav.classList.contains("open");
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

menuToggleBtn.addEventListener("click", toggleMenu);

// Close the menu when a link inside it is clicked (mobile)
const menuLinks = menu.querySelectorAll("a");
menuLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

/*******************************************
 * 3) Reveal-on-scroll animations (IntersectionObserver)
 *******************************************/
const revealObserverOptions = { threshold: 0.15 };
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, revealObserverOptions);

const revealEls = document.querySelectorAll(".reveal");
revealEls.forEach(function (el) {
  revealObserver.observe(el);
});

/***********************
 * 4) Simple horizontal slider controls
 ***********************/
function setupSlider(rootId, prevBtnId, nextBtnId) {
  const root = document.getElementById(rootId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  if (!root) return; // nothing to do if the container is missing

  function scrollAmount() {
    // 90% of the visible width
    return root.clientWidth * 0.9;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      root.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      root.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
  }
}

setupSlider("slides", "prev", "next");

/***********************
 * 5) Stat counters (count up when visible)
 ***********************/
const counterEls = document.querySelectorAll(".stat .num");
const counterObserverOptions = { threshold: 0.6 };

const counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60)); // ~60 steps

    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 18);

    counterObserver.unobserve(el);
  });
}, counterObserverOptions);

counterEls.forEach(function (el) {
  counterObserver.observe(el);
});

/***********************
 * 6) Current year in footer
 ***********************/
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
