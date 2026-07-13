var e=`Pro League | Score Sheet`;function t(e={}){return`<section class="page-card p-4 p-lg-5">\r
  <div class="row g-4 align-items-center mb-4">\r
    <div class="col-lg-8">\r
      <div class="eyebrow mb-3"><i class="bi bi-clipboard-data-fill"></i> Match records</div>\r
      <h1 class="page-title mb-3">Score Sheet <span class="sheet-id">#{{id}}</span></h1>\r
      <p class="lead fs-5 hero-copy">Review match details, goals, cards, and official notes for the selected fixture.</p>\r
    </div>\r
    <div class="col-lg-4 text-lg-end">\r
      <a class="btn btn-outline-soft btn-lg px-4" href="/dashboard" data-link="true">Back to dashboard</a>\r
    </div>\r
  </div>\r
\r
  <div class="scoreboard p-4 p-lg-5 mb-4">\r
    <div class="row align-items-center g-4 text-center">\r
      <div class="col-md-5">\r
        <div class="team-name">Riverside FC</div>\r
        <div class="team-meta">Home side</div>\r
      </div>\r
      <div class="col-md-2">\r
        <div class="score-badge">2 - 1</div>\r
        <div class="team-meta mt-2">Final</div>\r
      </div>\r
      <div class="col-md-5">\r
        <div class="team-name">City Rangers</div>\r
        <div class="team-meta">Away side</div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="row g-4">\r
    <div class="col-lg-7">\r
      <div class="screen-card p-4 h-100">\r
        <h2 class="h4 mb-3">Match events</h2>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead>\r
              <tr><th>Minute</th><th>Type</th><th>Detail</th></tr>\r
            </thead>\r
            <tbody>\r
              <tr><td>12'</td><td>Goal</td><td>Riverside FC - A. Markov</td></tr>\r
              <tr><td>55'</td><td>Goal</td><td>City Rangers - J. Cole</td></tr>\r
              <tr><td>81'</td><td>Goal</td><td>Riverside FC - D. Petrov</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-lg-5">\r
      <div class="status-card p-4 h-100">\r
        <h2 class="h4 mb-3">Official notes</h2>\r
        <ul class="list-unstyled mb-0 notes-list">\r
          <li><i class="bi bi-check2-circle text-success"></i> Match verified by referee crew.</li>\r
          <li><i class="bi bi-check2-circle text-success"></i> Result synced to league standings.</li>\r
          <li><i class="bi bi-check2-circle text-success"></i> Discipline records archived for review.</li>\r
        </ul>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
`.replaceAll(`{{id}}`,e.id??`unknown`)}export{t as render,e as title};