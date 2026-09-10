const panelLinksEl = document.querySelector('.panel-links')
const iconEl = document.querySelector('.icon')
const overlayEl = document.querySelector('.overlay')


iconEl.addEventListener('click', () => {
  if (panelLinksEl.classList.contains('active')) {
    panelLinksEl.classList.remove('active')
    overlayEl.classList.remove('active')
  } else {
    panelLinksEl.classList.add('active')
    overlayEl.classList.add('active')
  }
})