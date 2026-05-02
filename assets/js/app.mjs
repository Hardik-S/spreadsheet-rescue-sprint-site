const app = document.querySelector('#app');

const prefersReducedMotion = typeof window.matchMedia === 'function'
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: false };
const revealElements = document.querySelectorAll('.reveal');
const supportsIntersectionObserver = typeof window.IntersectionObserver === 'function';

if (prefersReducedMotion.matches || !supportsIntersectionObserver) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.18
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

const header = document.querySelector('.site-header');
const updateHeaderState = () => {
  if (!header) {
    return;
  }

  if (window.scrollY > 24) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

if (app) {
  app.dataset.enhanced = 'true';
}
