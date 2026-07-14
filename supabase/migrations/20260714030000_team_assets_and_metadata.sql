alter table public.teams
add column if not exists manager_name text,
add column if not exists manager_email text,
add column if not exists photo_url text,
add column if not exists description text;

insert into storage.buckets (id, name, public)
values ('team-assets', 'team-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Team assets are publicly readable" on storage.objects;
drop policy if exists "Authenticated users can upload team assets" on storage.objects;

create policy "Team assets are publicly readable"
on storage.objects
for select
using (bucket_id = 'team-assets');

create policy "Authenticated users can upload team assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'team-assets');