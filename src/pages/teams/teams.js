import teamsTemplate from './teams.html?raw';
import './teams.css';
import { getSupabaseClient, isSupabaseConfigured } from '../../services/auth.js';

export const title = 'Pro League | Teams';

export function render() {
  return teamsTemplate;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function setStatus(statusElement, message, variant = 'info') {
  statusElement.className = `alert alert-${variant} mt-4 mb-0`;
  statusElement.textContent = message;
}

function getTeamPlayers(playersByTeamId, teamId) {
  return playersByTeamId.get(teamId) ?? [];
}

function getTeamStandings(standingsByTeamId, teamId) {
  return standingsByTeamId.get(teamId) ?? null;
}

function renderPlayerItems(players) {
  if (!players.length) {
    return '<li class="text-body-secondary">No players added yet.</li>';
  }

  return players
    .slice(0, 4)
    .map((player) => {
      const jersey = player.jersey_number ? `#${player.jersey_number}` : 'No number';
      const position = player.position ? ` - ${escapeHtml(player.position)}` : '';

      return `<li><i class="bi bi-person-fill"></i> ${escapeHtml(player.full_name)} <span class="text-body-secondary">(${escapeHtml(jersey)}${position})</span></li>`;
    })
    .join('');
}

function renderTeamCard(team, players, standings) {
  const squadSize = players.length;
  const photoUrl = team.photo_url || team.logo_url || '';
  const logoUrl = team.logo_url || team.photo_url || '';
  const foundedYear = team.founded_year ? `EST: ${team.founded_year}` : 'EST: n/a';
  const managerName = team.manager_name || 'Unassigned';
  const managerEmail = team.manager_email || 'No contact email';
  const played = standings?.played ?? 0;
  const won = standings?.won ?? 0;
  const drawn = standings?.drawn ?? 0;
  const lost = standings?.lost ?? 0;
  const points = standings?.points ?? 0;
  const goalsFor = standings?.goals_for ?? 0;
  const goalsAgainst = standings?.goals_against ?? 0;

  return `
    <article class="team-card p-4">
      <div class="team-header mb-3">
        <div class="team-header-top mb-3">
          <div class="team-badge team-badge-image">
            ${logoUrl ? `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(team.name)} logo">` : '<i class="bi bi-shield-fill"></i>'}
          </div>
          <div class="flex-grow-1">
            <h3 class="h5 mb-1">${escapeHtml(team.name)}</h3>
            <p class="text-body-secondary small mb-2">${escapeHtml(foundedYear)}</p>
            <span class="badge text-bg-success px-2 py-1">Live</span>
          </div>
          ${photoUrl ? `<img class="team-photo" src="${escapeHtml(photoUrl)}" alt="${escapeHtml(team.name)} team photo">` : ''}
        </div>
        ${team.description ? `<p class="team-description text-body-secondary mb-0">${escapeHtml(team.description)}</p>` : ''}
      </div>
      <div class="team-info mb-3">
        <div class="team-stat"><span class="stat-label">Short name:</span> <span>${escapeHtml(team.short_name)}</span></div>
        <div class="team-stat"><span class="stat-label">Manager:</span> <span>${escapeHtml(managerName)}</span></div>
        <div class="team-stat"><span class="stat-label">Email:</span> <span>${escapeHtml(managerEmail)}</span></div>
        <div class="team-stat"><span class="stat-label">Players:</span> <span>${squadSize}</span></div>
        <div class="team-stat"><span class="stat-label">Matches:</span> <span>${played}</span></div>
      </div>
      <div class="team-stats-summary mb-3">
        <div class="team-stat"><span class="stat-label">Record:</span> <span>${won}W / ${drawn}D / ${lost}L</span></div>
        <div class="team-stat"><span class="stat-label">Goals:</span> <span>${goalsFor} / ${goalsAgainst}</span></div>
        <div class="team-stat"><span class="stat-label">Points:</span> <span>${points}</span></div>
      </div>
      <div class="team-players-preview mb-0">
        <div class="muted-label mb-2">Key players</div>
        <ul class="list-unstyled mb-0">
          ${renderPlayerItems(players)}
        </ul>
      </div>
    </article>
  `;
}

export async function mount(root) {
  const statusElement = root.querySelector('#teamsStatus');
  const teamsCountElement = root.querySelector('#teamsCount');
  const playersCountElement = root.querySelector('#playersCount');
  const averageSquadSizeElement = root.querySelector('#averageSquadSize');
  const teamsGridElement = root.querySelector('#teamsGrid');

  if (!isSupabaseConfigured()) {
    setStatus(statusElement, 'Supabase is not configured yet. Add the environment variables before browsing teams.', 'warning');
    teamsGridElement.innerHTML = '<div class="alert alert-warning mb-0">No live team data is available until Supabase is configured.</div>';
    teamsGridElement.removeAttribute('aria-busy');
    return;
  }

  const client = getSupabaseClient();

  const [teamsResult, playersResult, matchesResult, standingsResult] = await Promise.all([
    client.from('teams').select('id, name, short_name, manager_name, manager_email, logo_url, photo_url, founded_year, description, created_at').order('created_at', { ascending: false }),
    client.from('players').select('id, team_id, full_name, position, jersey_number, created_at').order('created_at', { ascending: true }),
    client.from('matches').select('id, home_team_id, away_team_id, status, home_score, away_score'),
    client.from('standings').select('team_id, played, won, drawn, lost, goals_for, goals_against, points'),
  ]);

  const teamsError = teamsResult.error;
  if (teamsError) {
    setStatus(statusElement, teamsError.message || 'Unable to load teams right now.', 'danger');
    teamsGridElement.innerHTML = '<div class="alert alert-danger mb-0">The team list could not be loaded.</div>';
    teamsGridElement.removeAttribute('aria-busy');
    return;
  }

  const teams = teamsResult.data ?? [];
  const players = playersResult.data ?? [];
  const matches = matchesResult.data ?? [];
  const standings = standingsResult.data ?? [];

  const playersByTeamId = new Map();
  for (const player of players) {
    const teamPlayers = playersByTeamId.get(player.team_id) ?? [];
    teamPlayers.push(player);
    playersByTeamId.set(player.team_id, teamPlayers);
  }

  const standingsByTeamId = new Map(standings.map((entry) => [entry.team_id, entry]));

  teamsCountElement.textContent = String(teams.length);
  playersCountElement.textContent = String(players.length);
  averageSquadSizeElement.textContent = teams.length ? `${(players.length / teams.length).toFixed(1)} players` : '0 players';

  if (!teams.length) {
    setStatus(statusElement, 'No teams have been registered yet.', 'info');
    teamsGridElement.innerHTML = '<div class="alert alert-info mb-0">The Teams page will populate once a club is created.</div>';
    teamsGridElement.removeAttribute('aria-busy');
    return;
  }

  const totalMatches = matches.length;
  const liveMessage = `Loaded ${teams.length} teams, ${players.length} players, and ${totalMatches} matches from Supabase.`;
  setStatus(statusElement, liveMessage, 'success');

  teamsGridElement.innerHTML = teams
    .map((team) => renderTeamCard(team, getTeamPlayers(playersByTeamId, team.id), getTeamStandings(standingsByTeamId, team.id)))
    .join('');

  teamsGridElement.removeAttribute('aria-busy');
}
