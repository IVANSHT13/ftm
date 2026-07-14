import loginTemplate from './login.html?raw';
import './login.css';
import { getCurrentSession, getCurrentUserProfile, isSupabaseConfigured, signInWithEmail, signUpWithEmail } from '../../services/auth.js';
import { navigateTo } from '../../router.js';

export const title = 'Pro League | Login';

export function render() {
  return loginTemplate;
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

function setBusy(buttons, isBusy) {
  buttons.forEach((button) => {
    button.disabled = isBusy;
  });
}

function routeByRole(role) {
  if (role === 'admin') {
    return '/admin';
  }

  return '/dashboard';
}

async function getLandingRoute(session) {
  const profile = await getCurrentUserProfile(session.user.id).catch(() => null);
  const role = profile?.role || session.user.user_metadata?.role || 'player';

  return routeByRole(role);
}

async function handleLoginSubmit(event, statusElement, submitButton) {
  event.preventDefault();
  clearStatus(statusElement);

  const form = event.currentTarget;
  const formData = new FormData(form);
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    showStatus(statusElement, 'Enter your email and password to sign in.', 'warning');
    return;
  }

  setBusy([submitButton], true);

  try {
    const session = await signInWithEmail(email, password);
    const landingRoute = session ? await getLandingRoute(session) : '/dashboard';
    navigateTo(landingRoute);
  } catch (error) {
    showStatus(statusElement, error.message || 'Unable to sign in right now.', 'danger');
  } finally {
    setBusy([submitButton], false);
  }
}

async function handleRegisterSubmit(event, statusElement, submitButton) {
  event.preventDefault();
  clearStatus(statusElement);

  const form = event.currentTarget;
  const formData = new FormData(form);
  const fullName = String(formData.get('fullName') || '').trim();
  const email = String(formData.get('registerEmail') || '').trim();
  const password = String(formData.get('registerPassword') || '');
  const role = String(formData.get('role') || 'player');

  if (!fullName || !email || !password) {
    showStatus(statusElement, 'Fill in your name, email, and password to create an account.', 'warning');
    return;
  }

  setBusy([submitButton], true);

  try {
    const session = await signUpWithEmail({ fullName, email, password, role });

    if (session) {
      navigateTo(routeByRole(role));
      return;
    }

    showStatus(statusElement, 'Account created. Confirm your email if required, then sign in.', 'success');
    form.reset();
  } catch (error) {
    showStatus(statusElement, error.message || 'Unable to create the account right now.', 'danger');
  } finally {
    setBusy([submitButton], false);
  }
}

export async function mount(root) {
  if (!isSupabaseConfigured()) {
    const statusElement = root.querySelector('#authStatus');
    if (statusElement) {
      showStatus(statusElement, 'Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable login.', 'warning');
    }
    return;
  }

  const session = await getCurrentSession();
  if (session) {
    navigateTo(await getLandingRoute(session));
    return;
  }

  const statusElement = root.querySelector('#authStatus');
  const loginForm = root.querySelector('#loginForm');
  const registerForm = root.querySelector('#registerForm');
  const loginButton = root.querySelector('#loginButton');
  const registerButton = root.querySelector('#registerButton');

  if (loginForm && statusElement && loginButton) {
    loginForm.addEventListener('submit', (event) => {
      handleLoginSubmit(event, statusElement, loginButton);
    });
  }

  if (registerForm && statusElement && registerButton) {
    registerForm.addEventListener('submit', (event) => {
      handleRegisterSubmit(event, statusElement, registerButton);
    });
  }
}
