import headerTemplate from './header.html?raw';
import './header.css';

function parseTemplate(template) {
  return new DOMParser().parseFromString(template, 'text/html');
}

export function renderHeader(pathname) {
  const documentFragment = parseTemplate(headerTemplate);
  const links = documentFragment.querySelectorAll('[data-route]');
  const dropdownToggles = documentFragment.querySelectorAll('.dropdown-toggle[data-route]');

  links.forEach((link) => {
    const route = link.getAttribute('data-route');
    const isActive = route === '/scoresheet' ? pathname.startsWith('/scoresheet') : route === pathname;

    if (isActive) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  dropdownToggles.forEach((toggle) => {
    const route = toggle.getAttribute('data-route');
    const isActive = route === '/scoresheet' ? pathname.startsWith('/scoresheet') : route === pathname;

    if (isActive) {
      toggle.classList.add('active');
      toggle.setAttribute('aria-current', 'page');
    }
  });

  return documentFragment.body.innerHTML;
}