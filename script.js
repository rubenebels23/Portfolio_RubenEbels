


//  Mobile menu toggle

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
