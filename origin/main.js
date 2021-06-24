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

// Testimonials Swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  // mousewheel: true,
  keyboard: true
});

// ScrollReveal
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
});

scrollReveal.reveal(`
  #home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .cards,
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links`,
  { interval: 100 }
);
