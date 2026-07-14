import{a as e,n as t,o as n,r,s as i,t as a}from"./index-tu5lXcoU.js";var o=`<section class="page-card p-4 p-lg-5">\r
  <div class="row g-4 align-items-center">\r
    <div class="col-lg-5">\r
      <div class="eyebrow mb-3"><i class="bi bi-shield-lock-fill"></i> Administrator access</div>\r
      <h1 class="page-title mb-3">Admin Log In</h1>\r
      <p class="lead fs-5 hero-copy">\r
        Administrators sign in here to manage platform settings, user access, and league operations.\r
      </p>\r
      <div class="stack-list mt-4">\r
        <div class="stack-item"><i class="bi bi-diagram-3-fill"></i> Platform oversight and security</div>\r
        <div class="stack-item"><i class="bi bi-people-fill"></i> Review manager and player accounts</div>\r
        <div class="stack-item"><i class="bi bi-gear-fill"></i> Open the protected admin console after sign in</div>\r
      </div>\r
    </div>\r
    <div class="col-lg-7">\r
      <div class="auth-panel auth-panel-admin p-4 p-md-5">\r
        <div id="adminAuthStatus" class="alert mb-4 d-none" role="alert"></div>\r
        <div class="admin-chip mb-4">\r
          <i class="bi bi-lock-fill"></i>\r
          Admin credentials required\r
        </div>\r
        <form id="adminLoginForm" class="row g-3" novalidate>\r
          <div class="col-12">\r
            <label class="form-label" for="adminEmail">Email</label>\r
            <input class="form-control form-control-lg" id="adminEmail" name="email" type="email" placeholder="admin.test@proleague.test" autocomplete="email" required>\r
          </div>\r
          <div class="col-12">\r
            <label class="form-label" for="adminPassword">Password</label>\r
            <input class="form-control form-control-lg" id="adminPassword" name="password" type="password" placeholder="••••••••" autocomplete="current-password" required>\r
          </div>\r
          <div class="col-12 d-flex flex-wrap gap-3 align-items-center mt-2">\r
            <button class="btn btn-accent btn-lg px-4" id="adminLoginButton" type="submit">Sign in as admin</button>\r
            <a class="btn btn-outline-soft btn-lg px-4" href="/dashboard" data-link="true">Go to dashboard</a>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
`,s=`Pro League | Admin Log In`;function c(){return o}function l(e,t,n=`info`){e.className=`alert alert-${n} mb-4`,e.textContent=t,e.classList.remove(`d-none`)}function u(e){e.className=`alert mb-4 d-none`,e.textContent=``}function d(e,t){e.disabled=t}async function f(e){return((await r(e.user.id).catch(()=>null))?.role||e.user.user_metadata?.role||null)===`admin`?!0:(await i().catch(()=>void 0),!1)}async function p(e,t,r){e.preventDefault(),u(t);let i=e.currentTarget,o=new FormData(i),s=String(o.get(`email`)||``).trim(),c=String(o.get(`password`)||``);if(!s||!c){l(t,`Enter the administrator email and password to continue.`,`warning`);return}d(r,!0);try{let e=await n(s,c);if(!(e&&await f(e))){l(t,`This account is not an administrator. Use an admin account to access this page.`,`danger`);return}a(`/admin`)}catch(e){l(t,e.message||`Unable to sign in right now.`,`danger`)}finally{d(r,!1)}}async function m(n){if(!e()){let e=n.querySelector(`#adminAuthStatus`);e&&l(e,`Supabase is not configured yet. Add the environment variables before signing in.`,`warning`);return}let r=await t().catch(()=>null);if(r&&await f(r)){a(`/admin`);return}let i=n.querySelector(`#adminAuthStatus`),o=n.querySelector(`#adminLoginForm`),s=n.querySelector(`#adminLoginButton`);o&&i&&s&&o.addEventListener(`submit`,e=>{p(e,i,s)})}export{m as mount,c as render,s as title};