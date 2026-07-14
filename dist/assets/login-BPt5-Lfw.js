import{a as e,n as t,o as n,s as r,t as i}from"./index-DKsX7h3a.js";var a=`<section class="page-card p-4 p-lg-5">\r
  <div class="row g-4 align-items-center">\r
    <div class="col-lg-5">\r
      <div class="eyebrow mb-3"><i class="bi bi-person-vcard-fill"></i> Secure access</div>\r
      <h1 class="page-title mb-3">Login or Register</h1>\r
      <p class="lead fs-5 hero-copy">\r
        Use your Supabase Auth account to join the tournament platform, manage your team, and access the dashboard after sign in.\r
      </p>\r
      <div class="stack-list mt-4">\r
        <div class="stack-item"><i class="bi bi-shield-lock-fill"></i> Secure Supabase authentication</div>\r
        <div class="stack-item"><i class="bi bi-person-plus-fill"></i> Create a new player or manager account</div>\r
        <div class="stack-item"><i class="bi bi-box-arrow-right"></i> Logout always returns you to the home page</div>\r
      </div>\r
    </div>\r
    <div class="col-lg-7">\r
      <div class="auth-panel p-4 p-md-5">\r
        <div id="authStatus" class="alert mb-4 d-none" role="alert"></div>\r
        <div class="row g-4">\r
          <div class="col-lg-6">\r
            <div class="auth-card p-4 h-100">\r
              <div class="d-flex justify-content-between align-items-start gap-3 mb-3">\r
                <div>\r
                  <div class="muted-label">Returning user</div>\r
                  <h2 class="h4 mb-0">Sign In</h2>\r
                </div>\r
                <span class="badge text-bg-warning-subtle text-warning-emphasis">Dashboard access</span>\r
              </div>\r
              <form id="loginForm" class="d-grid gap-3" novalidate>\r
                <div>\r
                  <label class="form-label auth-form-label" for="loginEmail">Email</label>\r
                  <input class="form-control form-control-lg" id="loginEmail" name="email" type="email" placeholder="manager@proleague.com" autocomplete="email" required>\r
                </div>\r
                <div>\r
                  <label class="form-label auth-form-label" for="loginPassword">Password</label>\r
                  <input class="form-control form-control-lg" id="loginPassword" name="password" type="password" placeholder="••••••••" autocomplete="current-password" required>\r
                </div>\r
                <button class="btn btn-accent btn-lg px-4" id="loginButton" type="submit">Sign in</button>\r
              </form>\r
            </div>\r
          </div>\r
          <div class="col-lg-6">\r
            <div class="auth-card auth-card-accent p-4 h-100">\r
              <div class="d-flex justify-content-between align-items-start gap-3 mb-3">\r
                <div>\r
                  <div class="muted-label">New account</div>\r
                  <h2 class="h4 mb-0">Register</h2>\r
                </div>\r
                <span class="badge text-bg-success-subtle text-success-emphasis">Create account</span>\r
              </div>\r
              <form id="registerForm" class="d-grid gap-3" novalidate>\r
                <div>\r
                  <label class="form-label auth-form-label" for="fullName">Full name</label>\r
                  <input class="form-control form-control-lg" id="fullName" name="fullName" type="text" placeholder="Alex Petrov" autocomplete="name" required>\r
                </div>\r
                <div>\r
                  <label class="form-label auth-form-label" for="registerRole">Role</label>\r
                  <select class="form-select form-select-lg" id="registerRole" name="role" required>\r
                    <option value="player" selected>Player</option>\r
                    <option value="manager">Manager</option>\r
                  </select>\r
                </div>\r
                <div>\r
                  <label class="form-label auth-form-label" for="registerEmail">Email</label>\r
                  <input class="form-control form-control-lg" id="registerEmail" name="registerEmail" type="email" placeholder="player@proleague.com" autocomplete="email" required>\r
                </div>\r
                <div>\r
                  <label class="form-label auth-form-label" for="registerPassword">Password</label>\r
                  <input class="form-control form-control-lg" id="registerPassword" name="registerPassword" type="password" placeholder="Create a strong password" autocomplete="new-password" required>\r
                </div>\r
                <button class="btn btn-outline-soft btn-lg px-4" id="registerButton" type="submit">Create account</button>\r
              </form>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
`,o=`Pro League | Login`;function s(){return a}function c(e,t,n=`info`){e.className=`alert alert-${n} mb-4`,e.textContent=t,e.classList.remove(`d-none`)}function l(e){e.className=`alert mb-4 d-none`,e.textContent=``}function u(e,t){e.forEach(e=>{e.disabled=t})}async function d(e,t,r){e.preventDefault(),l(t);let a=e.currentTarget,o=new FormData(a),s=String(o.get(`email`)||``).trim(),d=String(o.get(`password`)||``);if(!s||!d){c(t,`Enter your email and password to sign in.`,`warning`);return}u([r],!0);try{await n(s,d),i(`/dashboard`)}catch(e){c(t,e.message||`Unable to sign in right now.`,`danger`)}finally{u([r],!1)}}async function f(e,t,n){e.preventDefault(),l(t);let a=e.currentTarget,o=new FormData(a),s=String(o.get(`fullName`)||``).trim(),d=String(o.get(`registerEmail`)||``).trim(),f=String(o.get(`registerPassword`)||``),p=String(o.get(`role`)||`player`);if(!s||!d||!f){c(t,`Fill in your name, email, and password to create an account.`,`warning`);return}u([n],!0);try{if(await r({fullName:s,email:d,password:f,role:p})){i(`/dashboard`);return}c(t,`Account created. Confirm your email if required, then sign in.`,`success`),a.reset()}catch(e){c(t,e.message||`Unable to create the account right now.`,`danger`)}finally{u([n],!1)}}async function p(n){if(!e()){let e=n.querySelector(`#authStatus`);e&&c(e,`Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable login.`,`warning`);return}if(await t()){i(`/dashboard`);return}let r=n.querySelector(`#authStatus`),a=n.querySelector(`#loginForm`),o=n.querySelector(`#registerForm`),s=n.querySelector(`#loginButton`),l=n.querySelector(`#registerButton`);a&&r&&s&&a.addEventListener(`submit`,e=>{d(e,r,s)}),o&&r&&l&&o.addEventListener(`submit`,e=>{f(e,r,l)})}export{p as mount,s as render,o as title};