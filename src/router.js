import { renderHeader } from './components/header/header.js';
import { renderFooter } from './components/footer/footer.js';

const routes = [
  {
    path: /^\/$/,
    load: () => import('./pages/home/home.js'),
  },
  {
    path: /^\/login\/?$/,
    load: () => import('./pages/login/login.js'),
  },
  {
    path: /^\/dashboard\/?$/,
    load: () => import('./pages/dashboard/dashboard.js'),
  },
  {
    path: /^\/create-team\/?$/,
    load: () => import('./pages/create-team/create-team.js'),
  },
  {
    path: /^\/live-scores\/?$/,
    load: () => import('./pages/live-scores/live-scores.js'),
  },
  {
    path: /^\/schedule\/?$/,
    load: () => import('./pages/schedule/schedule.js'),
  },
  {
    path: /^\/scoresheet\/([^/]+)\/?$/,
    load: () => import('./pages/scoresheet/scoresheet.js'),
  },
];

function resolveRoute(pathname) {
  for (const route of routes) {
    const match = pathname.match(route.path);
    if (match) {
      return { route, params: { id: match[1] } };
    }
  }

  return { route: null, params: {} };
}

function normalizePath(pathname) {
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

async function renderRoute(root) {
  const pathname = normalizePath(window.location.pathname);
  const resolved = resolveRoute(pathname);
  const pageModule = resolved.route ? await resolved.route.load() : await import('./pages/not-found/not-found.js');
  const pageHtml = pageModule.render(resolved.params);

  document.title = pageModule.title;
  root.innerHTML = `
    ${renderHeader(pathname)}
    <main class="container py-5 position-relative">
      ${pageHtml}
    </main>
    ${renderFooter()}
  `;
}

function navigateTo(pathname) {
  history.pushState({}, '', pathname);
  return renderRoute(document.querySelector('#app'));
}

function setupNavigation(root) {
  root.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-link="true"]');

    if (!link) {
      return;
    }

    const target = new URL(link.href, window.location.origin);
    if (target.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    navigateTo(target.pathname);
  });

  window.addEventListener('popstate', () => {
    renderRoute(root);
  });
}

export function startApp(root) {
  setupNavigation(root);
  renderRoute(root);
}

export { navigateTo };