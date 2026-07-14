create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'manager', 'player');
create type public.match_status as enum ('scheduled', 'live', 'finished', 'postponed', 'cancelled');
create type public.match_event_type as enum ('goal', 'assist', 'yellow_card', 'red_card', 'substitution', 'own_goal', 'penalty_saved');

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.app_role not null default 'player',
  full_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text not null,
  manager_id uuid not null references public.users (id) on delete restrict,
  logo_url text,
  founded_year smallint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint teams_name_unique unique (name),
  constraint teams_short_name_unique unique (short_name),
  constraint teams_founded_year_check check (founded_year is null or founded_year between 1800 and 2100)
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  full_name text not null,
  position text not null,
  jersey_number integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint players_user_unique unique (user_id),
  constraint players_team_jersey_unique unique (team_id, jersey_number),
  constraint players_jersey_number_check check (jersey_number between 1 and 99)
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  home_team_id uuid not null references public.teams (id) on delete cascade,
  away_team_id uuid not null references public.teams (id) on delete cascade,
  venue text not null,
  kickoff_at timestamptz not null,
  matchday integer not null,
  home_score integer,
  away_score integer,
  status public.match_status not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint matches_distinct_teams_check check (home_team_id <> away_team_id),
  constraint matches_score_check check (
    (home_score is null and away_score is null)
    or (home_score is not null and away_score is not null and home_score >= 0 and away_score >= 0)
  )
);

create table if not exists public.match_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches (id) on delete cascade,
  player_id uuid not null references public.players (id) on delete cascade,
  type public.match_event_type not null,
  minute integer not null,
  created_at timestamptz not null default now(),
  constraint match_events_minute_check check (minute between 0 and 130)
);

create table if not exists public.standings (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  played integer not null default 0,
  won integer not null default 0,
  drawn integer not null default 0,
  lost integer not null default 0,
  goals_for integer not null default 0,
  goals_against integer not null default 0,
  points integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint standings_team_unique unique (team_id),
  constraint standings_non_negative_check check (
    played >= 0
    and won >= 0
    and drawn >= 0
    and lost >= 0
    and goals_for >= 0
    and goals_against >= 0
    and points >= 0
  ),
  constraint standings_totals_check check (played = won + drawn + lost)
);

create index if not exists teams_manager_id_idx on public.teams (manager_id);
create index if not exists players_team_id_idx on public.players (team_id);
create index if not exists players_position_idx on public.players (position);
create index if not exists matches_home_team_id_idx on public.matches (home_team_id);
create index if not exists matches_away_team_id_idx on public.matches (away_team_id);
create index if not exists matches_kickoff_at_idx on public.matches (kickoff_at);
create index if not exists matches_matchday_idx on public.matches (matchday);
create index if not exists match_events_match_id_idx on public.match_events (match_id);
create index if not exists match_events_player_id_idx on public.match_events (player_id);
create index if not exists standings_points_idx on public.standings (points desc);

create trigger touch_users_updated_at
before update on public.users
for each row
execute function public.touch_updated_at();

create trigger touch_teams_updated_at
before update on public.teams
for each row
execute function public.touch_updated_at();

create trigger touch_players_updated_at
before update on public.players
for each row
execute function public.touch_updated_at();

create trigger touch_matches_updated_at
before update on public.matches
for each row
execute function public.touch_updated_at();

create trigger touch_standings_updated_at
before update on public.standings
for each row
execute function public.touch_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  metadata_role text;
  metadata_full_name text;
begin
  metadata_role := new.raw_user_meta_data ->> 'role';
  metadata_full_name := nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), '');

  insert into public.users (id, role, full_name)
  values (
    new.id,
    case
      when metadata_role = 'admin' then 'admin'::public.app_role
      when metadata_role = 'manager' then 'manager'::public.app_role
      when metadata_role = 'player' then 'player'::public.app_role
      else 'player'::public.app_role
    end,
    coalesce(metadata_full_name, split_part(coalesce(new.email, ''), '@', 1), 'Player')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

alter table public.users enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;
alter table public.match_events enable row level security;
alter table public.standings enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.is_manager_or_admin_for_team(team_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users u
    left join public.teams t on t.manager_id = u.id
    where u.id = auth.uid()
      and (u.role = 'admin' or t.id = team_uuid)
  );
$$;

create policy "Users can read their own profile" on public.users
for select
to authenticated
using (auth.uid() = id or public.is_admin());

create policy "Users can update their own profile" on public.users
for update
to authenticated
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

create policy "Admins can insert users" on public.users
for insert
to authenticated
with check (public.is_admin());

create policy "Public teams are readable" on public.teams
for select
to anon, authenticated
using (true);

create policy "Admins and team managers can manage teams" on public.teams
for all
to authenticated
using (public.is_admin() or manager_id = auth.uid())
with check (public.is_admin() or manager_id = auth.uid());

create policy "Public players are readable" on public.players
for select
to anon, authenticated
using (true);

create policy "Admins and team managers can manage players" on public.players
for all
to authenticated
using (
  public.is_admin()
  or public.is_manager_or_admin_for_team(team_id)
)
with check (
  public.is_admin()
  or public.is_manager_or_admin_for_team(team_id)
);

create policy "Public matches are readable" on public.matches
for select
to anon, authenticated
using (true);

create policy "Admins can manage matches" on public.matches
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public match events are readable" on public.match_events
for select
to anon, authenticated
using (true);

create policy "Admins can manage match events" on public.match_events
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public standings are readable" on public.standings
for select
to anon, authenticated
using (true);

create policy "Admins can manage standings" on public.standings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
