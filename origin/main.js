// Open/close mobile navigation
const nav = document.querySelector('#header nav');
const toggle = document.querySelectorAll('nav .toggle');

toggle.forEach(item => {
  item.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
});

const navItems = document.querySelectorAll('nav ul li a');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    nav.classList.remove('show');
  });
});

// Header shadow animation
const header = document.querySelector('#header');
const navHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
  if (window.scrollY >= navHeight) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
});
