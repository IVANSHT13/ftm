import adminLoginTemplate from './admin-login.html?raw';
import './admin-login.css';
import { getCurrentSession, getCurrentUserProfile, isSupabaseConfigured, signInWithEmail, signOutUser } from '../../services/auth.js';
import { navigateTo } from '../../router.js';

export const title = 'Pro League | Admin Log In';

export function render() {
  return adminLoginTemplate;
}

function showStatus(statusElement, message, variant = 'info') {
  statusElement.className = `alert alert-${variant} mb-4`;
  statusElement.textContent = message;
  statusElement.classList.remove('d-none');
}

function clearStatus(statusElement) {
  statusElement.className = 'alert mb-4 d-none';
  statusElement.textContent = '';
}

function setBusy(button, isBusy) {
  button.disabled = isBusy;
}

async function ensureAdminAccess(session) {
  const profile = await getCurrentUserProfile(session.user.id).catch(() => null);
  const role = profile?.role || session.user.user_metadata?.role || null;

  if (role !== 'admin') {
    await signOutUser().catch(() => undefined);
    return false;
  }

  return true;
}

async function handleSubmit(event, statusElement, submitButton) {
  event.preventDefault();
  clearStatus(statusElement);

  const form = event.currentTarget;
  const formData = new FormData(form);
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    showStatus(statusElement, 'Enter the administrator email and password to continue.', 'warning');
    return;
  }

  setBusy(submitButton, true);

  try {
    const session = await signInWithEmail(email, password);
    const isAdmin = session ? await ensureAdminAccess(session) : false;

    if (!isAdmin) {
      showStatus(statusElement, 'This account is not an administrator. Use an admin account to access this page.', 'danger');
      return;
    }

    navigateTo('/admin');
  } catch (error) {
    showStatus(statusElement, error.message || 'Unable to sign in right now.', 'danger');
  } finally {
    setBusy(submitButton, false);
  }
}

export async function mount(root) {
  if (!isSupabaseConfigured()) {
    const statusElement = root.querySelector('#adminAuthStatus');
    if (statusElement) {
      showStatus(statusElement, 'Supabase is not configured yet. Add the environment variables before signing in.', 'warning');
    }
    return;
  }

  const session = await getCurrentSession().catch(() => null);
  if (session && (await ensureAdminAccess(session))) {
    navigateTo('/admin');
    return;
  }

  const statusElement = root.querySelector('#adminAuthStatus');
  const form = root.querySelector('#adminLoginForm');
  const submitButton = root.querySelector('#adminLoginButton');

  if (form && statusElement && submitButton) {
    form.addEventListener('submit', (event) => {
      handleSubmit(event, statusElement, submitButton);
    });
  }
}
