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
function changeHeaderWhenScroll() {

  if (window.scrollY >= navHeight) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
}

// Testimonials Swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  // mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
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
  #contact .text, #contact .links,
  footer .brand, footer .social`,
  { interval: 100 }
);

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

// Activate menu item at current sections
const sections = document.querySelectorAll('main section[id]');
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    const checkpointStart = checkpoint >= sectionTop;
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

    if (checkpointStart && checkpointEnd) {
      document.querySelector(`nav ul li a[href*=${sectionId}]`).classList.add('active');
    } else {
      document.querySelector(`nav ul li a[href*=${sectionId}]`).classList.remove('active');
    }
  });
}

// Scroll animations
window.addEventListener('scroll', () => {
  changeHeaderWhenScroll();
  backToTop();
  activateMenuAtCurrentSection();
});
