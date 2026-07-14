import headerTemplate from './header.html?raw';
import './header.css';

function parseTemplate(template) {
  return new DOMParser().parseFromString(template, 'text/html');
}

function matchesRole(element, role) {
  const roles = (element.getAttribute('data-roles') || '').split(/\s+/).filter(Boolean);

  if (!roles.length) {
    return true;
  }

  return Boolean(role) && roles.includes(role);
}

function matchesAuthState(element, isAuthenticated) {
  const authState = element.getAttribute('data-auth-state');

  if (!authState) {
    return true;
  }

  if (authState === 'authenticated') {
    return isAuthenticated;
  }

  if (authState === 'guest') {
    return !isAuthenticated;
  }

  return true;
}

function applyVisibility(root, userContext) {
  const elements = root.querySelectorAll('[data-auth-state], [data-roles]');

  elements.forEach((element) => {
    const isVisible = matchesAuthState(element, Boolean(userContext.session)) && matchesRole(element, userContext.role);

    if (!isVisible) {
      element.remove();
    }
  });

  const roleBadge = root.querySelector('[data-role-badge]');
  if (roleBadge && userContext.role) {
    roleBadge.textContent = userContext.role.charAt(0).toUpperCase() + userContext.role.slice(1);
  }
}

export function renderHeader(pathname, userContext = {}) {
  const documentFragment = parseTemplate(headerTemplate);
  applyVisibility(documentFragment, userContext);
  const roleTarget = documentFragment.querySelector('[data-role-target="true"]');

  if (roleTarget) {
    const targetHref = userContext.role === 'admin' ? '/admin' : '/dashboard';
    const targetRoute = userContext.role === 'admin' ? '/admin' : '/dashboard';
    roleTarget.setAttribute('href', targetHref);
    roleTarget.setAttribute('data-route', targetRoute);
    roleTarget.textContent = userContext.role === 'admin' ? 'Admin Area' : 'My Area';
  }

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