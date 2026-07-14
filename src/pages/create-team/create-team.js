import createTeamTemplate from './create-team.html?raw';
import './create-team.css';
import { navigateTo } from '../../router.js';
import { getCurrentSession, getCurrentUserProfile, isSupabaseConfigured } from '../../services/auth.js';
import { createTeamRecord } from '../../services/team.js';

export const title = 'Pro League | Create Team';

export function render() {
  return createTeamTemplate;
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

function readFileInput(form, name) {
  const input = form.querySelector(`[name="${name}"]`);
  return input && input.files && input.files.length > 0 ? input.files[0] : null;
}

export async function mount(root) {
  const statusElement = root.querySelector('#createTeamStatus');
  const form = root.querySelector('#createTeamForm');
  const submitButton = root.querySelector('#createTeamButton');

  if (!isSupabaseConfigured()) {
    showStatus(statusElement, 'Supabase is not configured yet. Add the environment variables before creating a team.', 'warning');
    setBusy(submitButton, true);
    return;
  }

  const session = await getCurrentSession();
  if (!session) {
    navigateTo('/login');
    return;
  }

  const profile = await getCurrentUserProfile(session.user.id);
  if (profile?.role === 'player') {
    navigateTo('/dashboard');
    return;
  }

  const managerNameInput = form.querySelector('[name="managerName"]');
  const managerEmailInput = form.querySelector('[name="managerEmail"]');

  if (managerNameInput) {
    managerNameInput.value = profile?.full_name || session.user.user_metadata?.full_name || '';
  }

  if (managerEmailInput) {
    managerEmailInput.value = session.user.email || '';
  }

  if (profile?.role && !['manager', 'admin'].includes(profile.role)) {
    showStatus(statusElement, 'This page is available to manager and admin accounts only.', 'warning');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearStatus(statusElement);

    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const shortName = String(formData.get('shortName') || '').trim();
    const managerName = String(formData.get('managerName') || '').trim();
    const managerEmail = String(formData.get('managerEmail') || '').trim();
    const foundedYearValue = String(formData.get('foundedYear') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const logoFile = readFileInput(form, 'logo');
    const photoFile = readFileInput(form, 'photo');

    if (!name || !shortName || !managerName || !managerEmail || !logoFile || !photoFile) {
      showStatus(statusElement, 'Fill in the required team details and upload both the logo and the team photo.', 'warning');
      return;
    }

    setBusy(submitButton, true);

    try {
      await createTeamRecord({
        name,
        shortName,
        managerId: session.user.id,
        managerName,
        managerEmail,
        description,
        foundedYear: foundedYearValue ? Number(foundedYearValue) : null,
        logoFile,
        photoFile,
      });

      showStatus(statusElement, `Team "${name}" has been created successfully.`, 'success');
      form.reset();
      if (managerNameInput) {
        managerNameInput.value = profile?.full_name || session.user.user_metadata?.full_name || '';
      }
      if (managerEmailInput) {
        managerEmailInput.value = session.user.email || '';
      }
    } catch (error) {
      showStatus(statusElement, error.message || 'Unable to create the team right now.', 'danger');
    } finally {
      setBusy(submitButton, false);
    }
  });
}