var e=`Pro League | Live Scores`;function t(){return`<section class="page-card p-4 p-lg-5">\r
  <div class="row g-4 align-items-center mb-4">\r
    <div class="col-lg-8">\r
      <div class="eyebrow mb-3"><i class="bi bi-broadcast-pin"></i> Live match center</div>\r
      <h1 class="page-title mb-3">Live Scores</h1>\r
      <p class="lead fs-5 hero-copy">Track matches in progress, instantly see goals, and keep the league audience updated in real time.</p>\r
    </div>\r
    <div class="col-lg-4 text-lg-end">\r
      <a class="btn btn-outline-soft btn-lg px-4" href="/dashboard" data-link="true">Back to dashboard</a>\r
    </div>\r
  </div>\r
\r
  <div class="row g-4 mb-4">\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Live matches</div>\r
        <div class="display-6 fw-bold mb-2">3</div>\r
        <div class="text-body-secondary">Games currently being tracked.</div>\r
      </div>\r
    </div>\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Goals today</div>\r
        <div class="display-6 fw-bold mb-2">7</div>\r
        <div class="text-body-secondary">Scored across the live fixtures board.</div>\r
      </div>\r
    </div>\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Updated</div>\r
        <div class="display-6 fw-bold mb-2">Now</div>\r
        <div class="text-body-secondary">Automatic refresh for score changes and events.</div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="row g-4">\r
    <div class="col-lg-8">\r
      <div class="screen-card p-4 h-100">\r
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">\r
          <h2 class="h4 mb-0">Matches in progress</h2>\r
          <span class="badge text-bg-danger px-3 py-2">Live now</span>\r
        </div>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead>\r
              <tr>\r
                <th>Fixture</th>\r
                <th>Score</th>\r
                <th>Minute</th>\r
                <th>Status</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              <tr>\r
                <td>Riverside FC vs City Rangers</td>\r
                <td class="fw-bold">2 - 1</td>\r
                <td>84'</td>\r
                <td class="text-success">Goal just scored</td>\r
              </tr>\r
              <tr>\r
                <td>Metro City vs Steel Town</td>\r
                <td class="fw-bold">1 - 1</td>\r
                <td>67'</td>\r
                <td class="text-warning">Second half</td>\r
              </tr>\r
              <tr>\r
                <td>North FC vs Valley Athletic</td>\r
                <td class="fw-bold">0 - 0</td>\r
                <td>31'</td>\r
                <td class="text-info">First half</td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="col-lg-4">\r
      <div class="status-card p-4 h-100">\r
        <div class="muted-label mb-2">Live feed</div>\r
        <h2 class="h4 mb-3">Recent updates</h2>\r
        <ul class="list-unstyled mb-0 feed-list">\r
          <li><i class="bi bi-bullseye text-success"></i> 84' - Riverside FC scored to retake the lead.</li>\r
          <li><i class="bi bi-clock-history text-warning"></i> 72' - Steel Town equalized after a corner routine.</li>\r
          <li><i class="bi bi-flag-fill text-info"></i> 30' - Match control checked and confirmed by referee.</li>\r
        </ul>\r
      </div>\r
    </div>\r
  </div>\r
</section>`}export{t as render,e as title};