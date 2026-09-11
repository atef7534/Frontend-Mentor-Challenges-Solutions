const panelLinksEl = document.querySelector('.panel-links');
const menuToggleEl = document.querySelector('.menu-toggle');
const overlayEl = document.querySelector('.overlay');

const toggleMenu = () => {
  const isActive = panelLinksEl.classList.toggle('active');
  overlayEl.classList.toggle('active');
  menuToggleEl.setAttribute('aria-expanded', isActive);
};

menuToggleEl.addEventListener('click', toggleMenu);
overlayEl.addEventListener('click', toggleMenu);
