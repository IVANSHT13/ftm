import{a as e,n as t,r as n}from"./index-CaJ4cFz1.js";var r=`<section class="page-card p-4 p-lg-5">\r
  <div class="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">\r
    <div>\r
      <div class="eyebrow mb-3"><i class="bi bi-bar-chart-fill"></i> Operations hub</div>\r
      <h1 class="page-title mb-3">Dashboard</h1>\r
      <p class="lead fs-5 hero-copy" id="dashboardLead">Monitor the tournament from one control center with results, fixtures, clubs, and admin tools.</p>\r
    </div>\r
    <a class="btn btn-outline-soft btn-lg px-4" href="/scoresheet/24" data-link="true">Open scoresheet</a>\r
  </div>\r
\r
  <div class="row g-4 mb-4">\r
    <div class="col-md-6 col-xl-3"><div class="metric-card p-4 h-100"><div class="muted-label">Clubs</div><div class="display-6 fw-bold mb-2" id="dashboardClubs">18</div><div class="text-body-secondary">Active registered teams this season.</div></div></div>\r
    <div class="col-md-6 col-xl-3"><div class="metric-card p-4 h-100"><div class="muted-label">Fixtures</div><div class="display-6 fw-bold mb-2" id="dashboardFixtures">48</div><div class="text-body-secondary">Scheduled and completed matches.</div></div></div>\r
    <div class="col-md-6 col-xl-3"><div class="metric-card p-4 h-100"><div class="muted-label">Admins</div><div class="display-6 fw-bold mb-2" id="dashboardAdmins">6</div><div class="text-body-secondary">Authorized league staff users.</div></div></div>\r
    <div class="col-md-6 col-xl-3"><div class="metric-card p-4 h-100"><div class="muted-label">Reports</div><div class="display-6 fw-bold mb-2" id="dashboardReports">12</div><div class="text-body-secondary">Submitted match reports and logs.</div></div></div>\r
  </div>\r
\r
  <div class="row g-4">\r
    <div class="col-lg-7" id="dashboardMatchesColumn">\r
      <div class="screen-card p-4 h-100">\r
        <div class="d-flex align-items-center justify-content-between mb-3">\r
          <h2 class="h4 mb-0">Recent matches</h2>\r
          <span class="badge text-bg-warning px-3 py-2">Live board</span>\r
        </div>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead>\r
              <tr><th>Match</th><th>Result</th><th>Status</th></tr>\r
            </thead>\r
            <tbody>\r
              <tr><td>Riverside FC vs City Rangers</td><td>2 - 1</td><td class="text-success">Completed</td></tr>\r
              <tr><td>Metro City vs Steel Town</td><td>1 - 0</td><td class="text-warning">In review</td></tr>\r
              <tr><td>North FC vs Valley Athletic</td><td>-</td><td class="text-info">Scheduled</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-lg-5" id="dashboardActionsColumn">\r
      <div class="status-card p-4 h-100" id="dashboardActionsCard">\r
        <div class="muted-label mb-2">Admin actions</div>\r
        <h2 class="h4 mb-3">Season controls</h2>\r
        <div class="d-grid gap-3">\r
          <button class="btn btn-accent btn-lg" type="button">Create fixture</button>\r
          <button class="btn btn-outline-soft btn-lg" type="button">Publish standings</button>\r
          <button class="btn btn-outline-soft btn-lg" type="button">Review match logs</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
`,i=`Pro League | Dashboard`;function a(){return r}function o(e,t){let n=e.querySelector(`#dashboardLead`),r=e.querySelector(`#dashboardActionsColumn`),i=e.querySelector(`#dashboardActionsCard`);if(t===`player`){n&&(n.textContent=`View tournament progress, fixtures, and club standings in read-only mode.`),r&&r.remove();let t=e.querySelector(`#dashboardMatchesColumn`);t&&(t.className=`col-12`),i&&i.remove()}else t===`manager`?n&&(n.textContent=`Manage your club, register players, and keep the season moving from one control center.`):t===`admin`&&n&&(n.textContent=`Oversee the tournament platform, manage league operations, and review administrative work.`)}async function s(r){if(!e())return;let i=await t().catch(()=>null);i&&o(r,(await n(i.user.id).catch(()=>null))?.role||i.user.user_metadata?.role||`player`)}export{s as mount,a as render,i as title};