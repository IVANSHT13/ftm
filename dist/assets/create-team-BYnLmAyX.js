import{a as e,i as t,n,r,t as i}from"./index-CaJ4cFz1.js";var a=`<section class="page-card p-4 p-lg-5">\r
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
        <div id="createTeamStatus" class="alert mb-4 d-none" role="alert"></div>\r
        <form id="createTeamForm" class="row g-3" novalidate>\r
          <div class="col-md-6">\r
            <label class="form-label" for="teamName">Team name</label>\r
            <input class="form-control form-control-lg" id="teamName" name="name" type="text" placeholder="Riverside FC" required>\r
          </div>\r
          <div class="col-md-6">\r
            <label class="form-label" for="teamShortName">Short name</label>\r
            <input class="form-control form-control-lg" id="teamShortName" name="shortName" type="text" placeholder="RIV" maxlength="10" required>\r
          </div>\r
          <div class="col-md-6">\r
            <label class="form-label" for="managerName">Manager</label>\r
            <input class="form-control form-control-lg" id="managerName" name="managerName" type="text" placeholder="Manager name" required>\r
          </div>\r
          <div class="col-md-6">\r
            <label class="form-label" for="managerEmail">Contact email</label>\r
            <input class="form-control form-control-lg" id="managerEmail" name="managerEmail" type="email" placeholder="manager@club.com" required>\r
          </div>\r
          <div class="col-md-6">\r
            <label class="form-label" for="teamFoundedYear">Founded year</label>\r
            <input class="form-control form-control-lg" id="teamFoundedYear" name="foundedYear" type="number" min="1800" max="2100" placeholder="2020">\r
          </div>\r
          <div class="col-12">\r
            <label class="form-label" for="teamLogo">Team logo / badge</label>\r
            <input class="form-control form-control-lg" id="teamLogo" name="logo" type="file" accept="image/*" required>\r
          </div>\r
          <div class="col-12">\r
            <label class="form-label" for="teamPhoto">Team photo</label>\r
            <input class="form-control form-control-lg" id="teamPhoto" name="photo" type="file" accept="image/*" required>\r
            <div class="form-text text-body-secondary">Upload a squad photo or promotional team image.</div>\r
          </div>\r
          <div class="col-12">\r
            <label class="form-label" for="teamDescription">Description</label>\r
            <textarea class="form-control" id="teamDescription" name="description" rows="4" placeholder="Add a short team summary, home ground, or notes."></textarea>\r
          </div>\r
          <div class="col-12 d-flex flex-wrap gap-3 mt-2">\r
            <button class="btn btn-accent btn-lg px-4" id="createTeamButton" type="submit">Create team</button>\r
            <a class="btn btn-outline-soft btn-lg px-4" href="/schedule" data-link="true">Go to schedule</a>\r
          </div>\r
        </form>\r
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
</section>`,o=`team-assets`;function s(e){let t=e.name.match(/\.([^.]+)$/);return t?t[1].toLowerCase():`bin`}async function c(e,t,n,r){let i=s(r),a=`${t}/${`${n}-${crypto.randomUUID()}.${i}`}`,{error:c}=await e.storage.from(o).upload(a,r,{contentType:r.type||`application/octet-stream`,upsert:!0});if(c)throw c;let{data:l}=e.storage.from(o).getPublicUrl(a);return l.publicUrl}async function l({name:e,shortName:n,managerId:r,managerName:i,managerEmail:a,description:o,foundedYear:s,logoFile:l,photoFile:u}){let d=t(),f=crypto.randomUUID(),[p,m]=await Promise.all([l?c(d,f,`logo`,l):Promise.resolve(null),u?c(d,f,`photo`,u):Promise.resolve(null)]),{data:h,error:g}=await d.from(`teams`).insert({id:f,name:e,short_name:n,manager_id:r,manager_name:i,manager_email:a,description:o,founded_year:s||null,logo_url:p,photo_url:m}).select(`*`).single();if(g)throw g;return h}var u=`Pro League | Create Team`;function d(){return a}function f(e,t,n=`info`){e.className=`alert alert-${n} mb-4`,e.textContent=t,e.classList.remove(`d-none`)}function p(e){e.className=`alert mb-4 d-none`,e.textContent=``}function m(e,t){e.disabled=t}function h(e,t){let n=e.querySelector(`[name="${t}"]`);return n&&n.files&&n.files.length>0?n.files[0]:null}async function g(t){let a=t.querySelector(`#createTeamStatus`),o=t.querySelector(`#createTeamForm`),s=t.querySelector(`#createTeamButton`);if(!e()){f(a,`Supabase is not configured yet. Add the environment variables before creating a team.`,`warning`),m(s,!0);return}let c=await n();if(!c){i(`/login`);return}let u=await r(c.user.id);if(u?.role===`player`){i(`/dashboard`);return}let d=o.querySelector(`[name="managerName"]`),g=o.querySelector(`[name="managerEmail"]`);d&&(d.value=u?.full_name||c.user.user_metadata?.full_name||``),g&&(g.value=c.user.email||``),u?.role&&![`manager`,`admin`].includes(u.role)&&f(a,`This page is available to manager and admin accounts only.`,`warning`),o.addEventListener(`submit`,async e=>{e.preventDefault(),p(a);let t=new FormData(o),n=String(t.get(`name`)||``).trim(),r=String(t.get(`shortName`)||``).trim(),i=String(t.get(`managerName`)||``).trim(),_=String(t.get(`managerEmail`)||``).trim(),v=String(t.get(`foundedYear`)||``).trim(),y=String(t.get(`description`)||``).trim(),b=h(o,`logo`),x=h(o,`photo`);if(!n||!r||!i||!_||!b||!x){f(a,`Fill in the required team details and upload both the logo and the team photo.`,`warning`);return}m(s,!0);try{await l({name:n,shortName:r,managerId:c.user.id,managerName:i,managerEmail:_,description:y,foundedYear:v?Number(v):null,logoFile:b,photoFile:x}),f(a,`Team "${n}" has been created successfully.`,`success`),o.reset(),d&&(d.value=u?.full_name||c.user.user_metadata?.full_name||``),g&&(g.value=c.user.email||``)}catch(e){f(a,e.message||`Unable to create the team right now.`,`danger`)}finally{m(s,!1)}})}export{g as mount,d as render,u as title};