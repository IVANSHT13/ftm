import{a as e,i as t}from"./index-BzGzNCOl.js";var n=`<section class="page-card p-4 p-lg-5">\r
  <div class="row g-4 align-items-center mb-4">\r
    <div class="col-lg-8">\r
      <div class="eyebrow mb-3"><i class="bi bi-people-fill"></i> Tournament teams</div>\r
      <h1 class="page-title mb-3">Teams</h1>\r
      <p class="lead fs-5 hero-copy">Browse all registered teams in the tournament, view team details, player rosters, and their individual statistics.</p>\r
      <div class="alert alert-info mt-4 mb-0" id="teamsStatus" role="status">Loading teams from Supabase...</div>\r
    </div>\r
    <div class="col-lg-4 text-lg-end">\r
      <a class="btn btn-outline-soft btn-lg px-4" href="/create-team" data-link="true">Add Team</a>\r
    </div>\r
  </div>\r
\r
  <div class="row g-4 mb-4">\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Teams registered</div>\r
        <div class="display-6 fw-bold mb-2" id="teamsCount">--</div>\r
        <div class="text-body-secondary">Active teams in the current tournament.</div>\r
      </div>\r
    </div>\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Total players</div>\r
        <div class="display-6 fw-bold mb-2" id="playersCount">--</div>\r
        <div class="text-body-secondary">Registered across all squads.</div>\r
      </div>\r
    </div>\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Average squad size</div>\r
        <div class="display-6 fw-bold mb-2" id="averageSquadSize">--</div>\r
        <div class="text-body-secondary">Per team including substitutes.</div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="teams-grid" id="teamsGrid" aria-busy="true"></div>\r
</section>\r
`,r=`Pro League | Teams`;function i(){return n}function a(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function o(e,t,n=`info`){e.className=`alert alert-${n} mt-4 mb-0`,e.textContent=t}function s(e,t){return e.get(t)??[]}function c(e,t){return e.get(t)??null}function l(e){return e.length?e.slice(0,4).map(e=>{let t=e.jersey_number?`#${e.jersey_number}`:`No number`,n=e.position?` - ${a(e.position)}`:``;return`<li><i class="bi bi-person-fill"></i> ${a(e.full_name)} <span class="text-body-secondary">(${a(t)}${n})</span></li>`}).join(``):`<li class="text-body-secondary">No players added yet.</li>`}function u(e,t,n){let r=t.length,i=e.photo_url||e.logo_url||``,o=e.logo_url||e.photo_url||``,s=e.founded_year?`EST: ${e.founded_year}`:`EST: n/a`,c=e.manager_name||`Unassigned`,u=e.manager_email||`No contact email`,d=n?.played??0,f=n?.won??0,p=n?.drawn??0,m=n?.lost??0,h=n?.points??0,g=n?.goals_for??0,_=n?.goals_against??0;return`
    <article class="team-card p-4">
      <div class="team-header mb-3">
        <div class="team-header-top mb-3">
          <div class="team-badge team-badge-image">
            ${o?`<img src="${a(o)}" alt="${a(e.name)} logo">`:`<i class="bi bi-shield-fill"></i>`}
          </div>
          <div class="flex-grow-1">
            <h3 class="h5 mb-1">${a(e.name)}</h3>
            <p class="text-body-secondary small mb-2">${a(s)}</p>
            <span class="badge text-bg-success px-2 py-1">Live</span>
          </div>
          ${i?`<img class="team-photo" src="${a(i)}" alt="${a(e.name)} team photo">`:``}
        </div>
        ${e.description?`<p class="team-description text-body-secondary mb-0">${a(e.description)}</p>`:``}
      </div>
      <div class="team-info mb-3">
        <div class="team-stat"><span class="stat-label">Short name:</span> <span>${a(e.short_name)}</span></div>
        <div class="team-stat"><span class="stat-label">Manager:</span> <span>${a(c)}</span></div>
        <div class="team-stat"><span class="stat-label">Email:</span> <span>${a(u)}</span></div>
        <div class="team-stat"><span class="stat-label">Players:</span> <span>${r}</span></div>
        <div class="team-stat"><span class="stat-label">Matches:</span> <span>${d}</span></div>
      </div>
      <div class="team-stats-summary mb-3">
        <div class="team-stat"><span class="stat-label">Record:</span> <span>${f}W / ${p}D / ${m}L</span></div>
        <div class="team-stat"><span class="stat-label">Goals:</span> <span>${g} / ${_}</span></div>
        <div class="team-stat"><span class="stat-label">Points:</span> <span>${h}</span></div>
      </div>
      <div class="team-players-preview mb-0">
        <div class="muted-label mb-2">Key players</div>
        <ul class="list-unstyled mb-0">
          ${l(t)}
        </ul>
      </div>
    </article>
  `}async function d(n){let r=n.querySelector(`#teamsStatus`),i=n.querySelector(`#teamsCount`),a=n.querySelector(`#playersCount`),l=n.querySelector(`#averageSquadSize`),d=n.querySelector(`#teamsGrid`);if(!e()){o(r,`Supabase is not configured yet. Add the environment variables before browsing teams.`,`warning`),d.innerHTML=`<div class="alert alert-warning mb-0">No live team data is available until Supabase is configured.</div>`,d.removeAttribute(`aria-busy`);return}let f=t(),[p,m,h,g]=await Promise.all([f.from(`teams`).select(`id, name, short_name, manager_name, manager_email, logo_url, photo_url, founded_year, description, created_at`).order(`created_at`,{ascending:!1}),f.from(`players`).select(`id, team_id, full_name, position, jersey_number, created_at`).order(`created_at`,{ascending:!0}),f.from(`matches`).select(`id, home_team_id, away_team_id, status, home_score, away_score`),f.from(`standings`).select(`team_id, played, won, drawn, lost, goals_for, goals_against, points`)]),_=p.error;if(_){o(r,_.message||`Unable to load teams right now.`,`danger`),d.innerHTML=`<div class="alert alert-danger mb-0">The team list could not be loaded.</div>`,d.removeAttribute(`aria-busy`);return}let v=p.data??[],y=m.data??[],b=h.data??[],x=g.data??[],S=new Map;for(let e of y){let t=S.get(e.team_id)??[];t.push(e),S.set(e.team_id,t)}let C=new Map(x.map(e=>[e.team_id,e]));if(i.textContent=String(v.length),a.textContent=String(y.length),l.textContent=v.length?`${(y.length/v.length).toFixed(1)} players`:`0 players`,!v.length){o(r,`No teams have been registered yet.`,`info`),d.innerHTML=`<div class="alert alert-info mb-0">The Teams page will populate once a club is created.</div>`,d.removeAttribute(`aria-busy`);return}let w=b.length;o(r,`Loaded ${v.length} teams, ${y.length} players, and ${w} matches from Supabase.`,`success`),d.innerHTML=v.map(e=>u(e,s(S,e.id),c(C,e.id))).join(``),d.removeAttribute(`aria-busy`)}export{d as mount,i as render,r as title};