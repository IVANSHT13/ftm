import dashboardTemplate from './dashboard.html?raw';
import { getCurrentSession, getCurrentUserProfile, isSupabaseConfigured } from '../../services/auth.js';

export const title = 'Pro League | Dashboard';

export function render() {
  return dashboardTemplate;
}

function setPlayerView(root, role) {
  const lead = root.querySelector('#dashboardLead');
  const actionsColumn = root.querySelector('#dashboardActionsColumn');
  const actionsCard = root.querySelector('#dashboardActionsCard');

  if (role === 'player') {
    if (lead) {
      lead.textContent = 'View tournament progress, fixtures, and club standings in read-only mode.';
    }

    if (actionsColumn) {
      actionsColumn.remove();
    }

    const matchesColumn = root.querySelector('#dashboardMatchesColumn');
    if (matchesColumn) {
      matchesColumn.className = 'col-12';
    }

    if (actionsCard) {
      actionsCard.remove();
    }
  } else if (role === 'manager') {
    if (lead) {
      lead.textContent = 'Manage your club, register players, and keep the season moving from one control center.';
    }
  } else if (role === 'admin') {
    if (lead) {
      lead.textContent = 'Oversee the tournament platform, manage league operations, and review administrative work.';
    }
  }
}

export async function mount(root) {
  if (!isSupabaseConfigured()) {
    return;
  }

  const session = await getCurrentSession().catch(() => null);
  if (!session) {
    return;
  }

  const profile = await getCurrentUserProfile(session.user.id).catch(() => null);
  setPlayerView(root, profile?.role || session.user.user_metadata?.role || 'player');
}
