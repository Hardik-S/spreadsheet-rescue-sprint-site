import { siteContent } from '../../content/site-content.mjs';
import { renderSite } from './render-site.mjs';

const app = document.querySelector('#app');
const { meta } = siteContent;

const descriptionTag = document.querySelector('meta[name="description"]');
if (descriptionTag) {
  descriptionTag.setAttribute('content', meta.description);
}

const ogTitle = document.querySelector('meta[property="og:title"]');
if (ogTitle) {
  ogTitle.setAttribute('content', meta.title);
}

const ogDescription = document.querySelector('meta[property="og:description"]');
if (ogDescription) {
  ogDescription.setAttribute('content', meta.description);
}

const ogImage = document.querySelector('meta[property="og:image"]');
if (ogImage) {
  ogImage.setAttribute('content', meta.ogImage);
}

app.innerHTML = renderSite(siteContent);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = document.querySelectorAll('.reveal');

if (prefersReducedMotion.matches) {
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
  if (window.scrollY > 24) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });
