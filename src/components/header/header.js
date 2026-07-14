import headerTemplate from './header.html?raw';
import './header.css';

function parseTemplate(template) {
  return new DOMParser().parseFromString(template, 'text/html');
}

export function renderHeader(pathname) {
  const documentFragment = parseTemplate(headerTemplate);
  const links = documentFragment.querySelectorAll('[data-route]');
  const navGroups = documentFragment.querySelectorAll('.nav-item.dropdown');

  links.forEach((link) => {
    const route = link.getAttribute('data-route');
    const isActive = route === '/scoresheet' ? pathname.startsWith('/scoresheet') : route === pathname;

    if (isActive) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  navGroups.forEach((group) => {
    const hasActiveItem = group.querySelector('.dropdown-item.active');
    const activeTopLink = group.querySelector('.nav-link.active');

    if (hasActiveItem && !activeTopLink) {
      const toggle = group.querySelector('.nav-dropdown-toggle');
      toggle.classList.add('active');
      toggle.setAttribute('aria-current', 'page');
    }
  });

  return documentFragment.body.innerHTML;
}