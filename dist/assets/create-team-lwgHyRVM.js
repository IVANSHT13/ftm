var e=`Pro League | Create Team`;function t(){return`<section class="page-card p-4 p-lg-5">\r
  <div class="row g-4 align-items-center mb-4">\r
    <div class="col-lg-8">\r
      <div class="eyebrow mb-3"><i class="bi bi-person-plus-fill"></i> Club registration</div>\r
      <h1 class="page-title mb-3">Create Team</h1>\r
      <p class="lead fs-5 hero-copy">Register a new club for the tournament with team details, manager contact, and branding information.</p>\r
    </div>\r
    <div class="col-lg-4 text-lg-end">\r
      <a class="btn btn-outline-soft btn-lg px-4" href="/dashboard" data-link="true">Back to dashboard</a>\r
    </div>\r
  </div>\r
\r
  <div class="row g-4">\r
    <div class="col-lg-7">\r
      <div class="screen-card p-4 h-100">\r
        <h2 class="h4 mb-3">New club details</h2>\r
        <div class="row g-3">\r
          <div class="col-md-6">\r
            <label class="form-label">Team name</label>\r
            <input class="form-control form-control-lg" type="text" placeholder="Riverside FC">\r
          </div>\r
          <div class="col-md-6">\r
            <label class="form-label">Short name</label>\r
            <input class="form-control form-control-lg" type="text" placeholder="RIV">\r
          </div>\r
          <div class="col-md-6">\r
            <label class="form-label">Manager</label>\r
            <input class="form-control form-control-lg" type="text" placeholder="Manager name">\r
          </div>\r
          <div class="col-md-6">\r
            <label class="form-label">Contact email</label>\r
            <input class="form-control form-control-lg" type="email" placeholder="manager@club.com">\r
          </div>\r
          <div class="col-12">\r
            <label class="form-label">Team logo / badge</label>\r
            <input class="form-control form-control-lg" type="file">\r
          </div>\r
          <div class="col-12">\r
            <label class="form-label">Team photo</label>\r
            <input class="form-control form-control-lg" type="file" accept="image/*">\r
            <div class="form-text text-body-secondary">Upload a squad photo or promotional team image.</div>\r
          </div>\r
          <div class="col-12">\r
            <label class="form-label">Description</label>\r
            <textarea class="form-control" rows="4" placeholder="Add a short team summary, home ground, or notes."></textarea>\r
          </div>\r
          <div class="col-12 d-flex flex-wrap gap-3 mt-2">\r
            <button class="btn btn-accent btn-lg px-4" type="button">Create team</button>\r
            <a class="btn btn-outline-soft btn-lg px-4" href="/schedule" data-link="true">Go to schedule</a>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-lg-5">\r
      <div class="status-card p-4 h-100">\r
        <div class="muted-label mb-2">Team setup</div>\r
        <h2 class="h4 mb-3">What gets stored</h2>\r
        <ul class="list-unstyled mb-0 create-team-notes">\r
          <li><i class="bi bi-check2-circle text-success"></i> Club identity and manager details.</li>\r
          <li><i class="bi bi-check2-circle text-success"></i> Badge or logo for branding across the app.</li>\r
          <li><i class="bi bi-check2-circle text-success"></i> Future roster and fixture assignment support.</li>\r
        </ul>\r
      </div>\r
    </div>\r
  </div>\r
</section>`}export{t as render,e as title};