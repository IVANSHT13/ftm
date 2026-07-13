var e=`Pro League | Statistics`;function t(){return`<section class="page-card p-4 p-lg-5">\r
  <div class="row g-4 align-items-center mb-4">\r
    <div class="col-lg-8">\r
      <div class="eyebrow mb-3"><i class="bi bi-graph-up-arrow"></i> Football statistics</div>\r
      <h1 class="page-title mb-3">Statistics</h1>\r
      <p class="lead fs-5 hero-copy">Review the most important football stats from the tournament, from appearances to discipline and goalkeeper records.</p>\r
    </div>\r
    <div class="col-lg-4 text-lg-end">\r
      <a class="btn btn-outline-soft btn-lg px-4" href="/dashboard" data-link="true">Back to dashboard</a>\r
    </div>\r
  </div>\r
\r
  <div class="row g-4 mb-4">\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Players tracked</div>\r
        <div class="display-6 fw-bold mb-2">216</div>\r
        <div class="text-body-secondary">Registered players across all teams.</div>\r
      </div>\r
    </div>\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Stats sections</div>\r
        <div class="display-6 fw-bold mb-2">6</div>\r
        <div class="text-body-secondary">Matches played, goals, assists, cards, and clean sheets.</div>\r
      </div>\r
    </div>\r
    <div class="col-md-4">\r
      <div class="metric-card p-4 h-100">\r
        <div class="muted-label">Updated</div>\r
        <div class="display-6 fw-bold mb-2">Live</div>\r
        <div class="text-body-secondary">Follow every stat as the tournament progresses.</div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="row g-4">\r
    <div class="col-lg-6" id="matches-played">\r
      <div class="screen-card p-4 h-100">\r
        <h2 class="h4 mb-3">Matches Played</h2>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead><tr><th>Player</th><th>Team</th><th>Apps</th></tr></thead>\r
            <tbody>\r
              <tr><td>Alex Petrov</td><td>Riverside FC</td><td>12</td></tr>\r
              <tr><td>Daniel Costa</td><td>Metro City</td><td>11</td></tr>\r
              <tr><td>Ivan Georgiev</td><td>North FC</td><td>11</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-lg-6" id="goalscorers">\r
      <div class="screen-card p-4 h-100">\r
        <h2 class="h4 mb-3">Goalscorers</h2>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead><tr><th>Player</th><th>Team</th><th>Goals</th></tr></thead>\r
            <tbody>\r
              <tr><td>Daniel Costa</td><td>Metro City</td><td>9</td></tr>\r
              <tr><td>Alex Petrov</td><td>Riverside FC</td><td>8</td></tr>\r
              <tr><td>Marko Ivanov</td><td>United Stars</td><td>7</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-lg-6" id="assists">\r
      <div class="screen-card p-4 h-100">\r
        <h2 class="h4 mb-3">Assists</h2>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead><tr><th>Player</th><th>Team</th><th>Assists</th></tr></thead>\r
            <tbody>\r
              <tr><td>Ivan Georgiev</td><td>North FC</td><td>8</td></tr>\r
              <tr><td>Nemanja Stojic</td><td>Steel Town</td><td>7</td></tr>\r
              <tr><td>Petar Kolev</td><td>City Rangers</td><td>6</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-lg-6" id="yellow-cards">\r
      <div class="screen-card p-4 h-100">\r
        <h2 class="h4 mb-3">Yellow Cards</h2>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead><tr><th>Player</th><th>Team</th><th>Yellow</th></tr></thead>\r
            <tbody>\r
              <tr><td>Marko Ivanov</td><td>United Stars</td><td>4</td></tr>\r
              <tr><td>Leon Mitev</td><td>Valley Athletic</td><td>4</td></tr>\r
              <tr><td>Martin Hristov</td><td>Riverside FC</td><td>3</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-lg-6" id="red-cards">\r
      <div class="screen-card p-4 h-100">\r
        <h2 class="h4 mb-3">Red Cards</h2>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead><tr><th>Player</th><th>Team</th><th>Red</th></tr></thead>\r
            <tbody>\r
              <tr><td>Stefan Marinov</td><td>Metro City</td><td>1</td></tr>\r
              <tr><td>Viktor Kolev</td><td>City Rangers</td><td>1</td></tr>\r
              <tr><td>Georgi Vasilev</td><td>North FC</td><td>0</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-lg-6" id="clean-sheets">\r
      <div class="screen-card p-4 h-100">\r
        <h2 class="h4 mb-3">Clean Sheets</h2>\r
        <div class="table-responsive">\r
          <table class="table table-dark-soft align-middle mb-0">\r
            <thead><tr><th>Goalkeeper</th><th>Team</th><th>Clean Sheets</th></tr></thead>\r
            <tbody>\r
              <tr><td>Petar Dimitrov</td><td>Riverside FC</td><td>6</td></tr>\r
              <tr><td>Nikola Petrov</td><td>North FC</td><td>5</td></tr>\r
              <tr><td>Dimitar Stanev</td><td>Steel Town</td><td>4</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</section>`}export{t as render,e as title};