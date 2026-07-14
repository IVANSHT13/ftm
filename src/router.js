import { renderHeader } from './components/header/header.js';
import { renderFooter } from './components/footer/footer.js';
import { getCurrentSession, getCurrentUserProfile, isSupabaseConfigured, signOutUser } from './services/auth.js';

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
    path: /^\/player-login\/?$/,
    load: () => import('./pages/player-login/player-login.js'),
  },
  {
    path: /^\/admin-login\/?$/,
    load: () => import('./pages/admin-login/admin-login.js'),
  },
  {
    path: /^\/dashboard\/?$/,
    load: () => import('./pages/dashboard/dashboard.js'),
    access: 'authenticated',
  },
  {
    path: /^\/create-team\/?$/,
    load: () => import('./pages/create-team/create-team.js'),
    access: 'manager',
  },
  {
    path: /^\/register-player\/?$/,
    load: () => import('./pages/register-player/register-player.js'),
    access: 'manager',
  },
  {
    path: /^\/transfers\/?$/,
    load: () => import('./pages/transfers/transfers.js'),
    access: 'manager',
  },
  {
    path: /^\/live-scores\/?$/,
    load: () => import('./pages/live-scores/live-scores.js'),
  },
  {
    path: /^\/statistics\/?$/,
    load: () => import('./pages/statistics/statistics.js'),
  },
  {
    path: /^\/teams\/?$/,
    load: () => import('./pages/teams/teams.js'),
  },
  {
    path: /^\/schedule\/?$/,
    load: () => import('./pages/schedule/schedule.js'),
  },
  {
    path: /^\/scoresheet\/([^/]+)\/?$/,
    load: () => import('./pages/scoresheet/scoresheet.js'),
  },
  {
    path: /^\/admin\/?$/,
    load: () => import('./pages/admin/admin.js'),
    access: 'admin',
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

function defaultAuthenticatedRedirect(role) {
  if (role === 'admin') {
    return '/admin';
  }

  return '/dashboard';
}

function isRouteAllowed(access, role, session) {
  if (!access || access === 'public') {
    return true;
  }

  if (access === 'authenticated') {
    return Boolean(session);
  }

  if (access === 'manager') {
    return Boolean(session) && (role === 'manager' || role === 'admin');
  }

  if (access === 'admin') {
    return Boolean(session) && role === 'admin';
  }

  return true;
}

async function getUserContext() {
  if (!isSupabaseConfigured()) {
    return {
      session: null,
      role: null,
      profile: null,
    };
  }

  const session = await getCurrentSession().catch(() => null);
  if (!session) {
    return {
      session: null,
      role: null,
      profile: null,
    };
  }

  const profile = await getCurrentUserProfile(session.user.id).catch(() => null);
  const role = profile?.role || session.user.user_metadata?.role || null;

  return {
    session,
    role,
    profile,
  };
}

async function renderRoute(root) {
  const pathname = normalizePath(window.location.pathname);
  const hash = window.location.hash;
  const resolved = resolveRoute(pathname);

  const userContext = await getUserContext();
  const routeAccess = resolved.route?.access ?? 'public';

  if (!isRouteAllowed(routeAccess, userContext.role, userContext.session)) {
    const fallbackUrl = userContext.session ? defaultAuthenticatedRedirect(userContext.role) : '/login';
    navigateTo(fallbackUrl);
    return;
  }

  const pageModule = resolved.route ? await resolved.route.load() : await import('./pages/not-found/not-found.js');
  const pageHtml = pageModule.render(resolved.params);

  document.title = pageModule.title;
  root.innerHTML = `
    ${renderHeader(pathname, userContext)}
    <main class="container py-5 position-relative">
      ${pageHtml}
    </main>
    ${renderFooter()}
  `;

  if (typeof pageModule.mount === 'function') {
    await pageModule.mount(root, resolved.params);
  }

  if (hash) {
    requestAnimationFrame(() => {
      const target = document.querySelector(hash);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

function navigateTo(url) {
  history.pushState({}, '', url);
  return renderRoute(document.querySelector('#app'));
}

function setupNavigation(root) {
  root.addEventListener('click', (event) => {
    const logoutTrigger = event.target.closest('[data-auth-logout="true"]');
    if (logoutTrigger) {
      event.preventDefault();
      signOutUser()
        .catch(() => undefined)
        .finally(() => {
          window.location.replace('/');
        });
      return;
    }

    const link = event.target.closest('a[data-link="true"]');

    if (!link) {
      return;
    }

    const target = new URL(link.href, window.location.origin);
    if (target.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    navigateTo(`${target.pathname}${target.search}${target.hash}`);
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