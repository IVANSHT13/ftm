insert into auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  is_sso_user,
  is_anonymous
)
values
  (
    '10000000-0000-4000-8000-000000000001',
    'authenticated',
    'authenticated',
    'admin@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Tournament Admin","role":"admin"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'authenticated',
    'authenticated',
    'manager.riverside@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Alex Petrov","role":"manager"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000003',
    'authenticated',
    'authenticated',
    'manager.metro@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Daniel Costa","role":"manager"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000004',
    'authenticated',
    'authenticated',
    'manager.north@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Ivan Georgiev","role":"manager"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000005',
    'authenticated',
    'authenticated',
    'manager.stars@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Marko Ivanov","role":"manager"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000006',
    'authenticated',
    'authenticated',
    'martin.slavov@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Martin Slavov","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000007',
    'authenticated',
    'authenticated',
    'ivan.hristov@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Ivan Hristov","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000008',
    'authenticated',
    'authenticated',
    'daniel.costa@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Daniel Costa","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000009',
    'authenticated',
    'authenticated',
    'stefan.marinov@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Stefan Marinov","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-00000000000a',
    'authenticated',
    'authenticated',
    'nikola.petrov@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Nikola Petrov","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-00000000000b',
    'authenticated',
    'authenticated',
    'petar.dimitrov@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Petar Dimitrov","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-00000000000c',
    'authenticated',
    'authenticated',
    'marko.ivanov@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Marko Ivanov","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-00000000000d',
    'authenticated',
    'authenticated',
    'vasil.iliev@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Vasil Iliev","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-00000000000e',
    'authenticated',
    'authenticated',
    'dimitar.stanev@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Dimitar Stanev","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-00000000000f',
    'authenticated',
    'authenticated',
    'leon.mitev@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Leon Mitev","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000010',
    'authenticated',
    'authenticated',
    'nemanja.stojic@proleague.test',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Nemanja Stojic","role":"player"}'::jsonb,
    now(),
    now(),
    false,
    false
  )
on conflict (id) do nothing;

insert into public.teams (id, name, short_name, manager_id, logo_url, founded_year)
values
  (
    '20000000-0000-4000-8000-000000000001',
    'Riverside FC',
    'RIV',
    '10000000-0000-4000-8000-000000000001',
    'https://placehold.co/256x256?text=RIV',
    2020
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    'Metro City',
    'MTC',
    '10000000-0000-4000-8000-000000000003',
    'https://placehold.co/256x256?text=MTC',
    2019
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    'North FC',
    'NOR',
    '10000000-0000-4000-8000-000000000004',
    'https://placehold.co/256x256?text=NOR',
    2021
  ),
  (
    '20000000-0000-4000-8000-000000000004',
    'United Stars',
    'UNI',
    '10000000-0000-4000-8000-000000000005',
    'https://placehold.co/256x256?text=UNI',
    2020
  )
on conflict (id) do nothing;

insert into public.players (id, team_id, user_id, full_name, position, jersey_number)
values
  (
    '30000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    'e24bd78b-5c43-4681-b6b4-90f13b4b3ea7',
    'kaloivan',
    'Goalkeeper',
    1
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000006',
    'Martin Slavov',
    'Defender',
    5
  ),
  (
    '30000000-0000-4000-8000-000000000003',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000007',
    'Ivan Hristov',
    'Forward',
    9
  ),
  (
    '30000000-0000-4000-8000-000000000004',
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000008',
    'Daniel Costa',
    'Goalkeeper',
    1
  ),
  (
    '30000000-0000-4000-8000-000000000005',
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000009',
    'Stefan Marinov',
    'Midfielder',
    8
  ),
  (
    '30000000-0000-4000-8000-000000000006',
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-00000000000a',
    'Nikola Petrov',
    'Forward',
    10
  ),
  (
    '30000000-0000-4000-8000-000000000007',
    '20000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-00000000000b',
    'Petar Dimitrov',
    'Goalkeeper',
    1
  ),
  (
    '30000000-0000-4000-8000-000000000008',
    '20000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-00000000000c',
    'Marko Ivanov',
    'Defender',
    4
  ),
  (
    '30000000-0000-4000-8000-000000000009',
    '20000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-00000000000d',
    'Vasil Iliev',
    'Forward',
    11
  ),
  (
    '30000000-0000-4000-8000-00000000000a',
    '20000000-0000-4000-8000-000000000004',
    '10000000-0000-4000-8000-00000000000e',
    'Dimitar Stanev',
    'Goalkeeper',
    1
  ),
  (
    '30000000-0000-4000-8000-00000000000b',
    '20000000-0000-4000-8000-000000000004',
    '10000000-0000-4000-8000-00000000000f',
    'Leon Mitev',
    'Defender',
    3
  ),
  (
    '30000000-0000-4000-8000-00000000000c',
    '20000000-0000-4000-8000-000000000004',
    '10000000-0000-4000-8000-000000000010',
    'Nemanja Stojic',
    'Forward',
    9
  )
on conflict (id) do nothing;

insert into public.matches (
  id,
  home_team_id,
  away_team_id,
  venue,
  kickoff_at,
  matchday,
  home_score,
  away_score,
  status
)
values
  (
    '40000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000002',
    'Central Stadium',
    '2026-07-10 17:00:00+00',
    1,
    2,
    1,
    'finished'
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    '20000000-0000-4000-8000-000000000003',
    '20000000-0000-4000-8000-000000000004',
    'North Arena',
    '2026-07-10 19:00:00+00',
    1,
    0,
    0,
    'finished'
  ),
  (
    '40000000-0000-4000-8000-000000000003',
    '20000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000003',
    'Riverside Park',
    '2026-07-11 17:30:00+00',
    2,
    3,
    2,
    'finished'
  ),
  (
    '40000000-0000-4000-8000-000000000004',
    '20000000-0000-4000-8000-000000000002',
    '20000000-0000-4000-8000-000000000004',
    'Metro Dome',
    '2026-07-11 20:00:00+00',
    2,
    1,
    4,
    'finished'
  ),
  (
    '40000000-0000-4000-8000-000000000005',
    '20000000-0000-4000-8000-000000000004',
    '20000000-0000-4000-8000-000000000001',
    'Unity Field',
    '2026-07-12 17:30:00+00',
    3,
    2,
    2,
    'finished'
  ),
  (
    '40000000-0000-4000-8000-000000000006',
    '20000000-0000-4000-8000-000000000003',
    '20000000-0000-4000-8000-000000000002',
    'North Arena',
    '2026-07-12 20:00:00+00',
    3,
    1,
    3,
    'finished'
  )
on conflict (id) do nothing;

insert into public.match_events (id, match_id, player_id, type, minute)
values
  ('50000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000002', 'goal', 12),
  ('50000000-0000-4000-8000-000000000002', '40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000005', 'goal', 28),
  ('50000000-0000-4000-8000-000000000003', '40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000003', 'goal', 54),
  ('50000000-0000-4000-8000-000000000004', '40000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000008', 'yellow_card', 40),
  ('50000000-0000-4000-8000-000000000005', '40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000003', 'goal', 8),
  ('50000000-0000-4000-8000-000000000006', '40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000009', 'goal', 21),
  ('50000000-0000-4000-8000-000000000007', '40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000002', 'goal', 35),
  ('50000000-0000-4000-8000-000000000008', '40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000008', 'goal', 61),
  ('50000000-0000-4000-8000-000000000009', '40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000003', 'goal', 77),
  ('50000000-0000-4000-8000-00000000000a', '40000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-00000000000c', 'goal', 15),
  ('50000000-0000-4000-8000-00000000000b', '40000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-00000000000a', 'yellow_card', 32),
  ('50000000-0000-4000-8000-00000000000c', '40000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-00000000000b', 'goal', 44),
  ('50000000-0000-4000-8000-00000000000d', '40000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-00000000000c', 'goal', 58),
  ('50000000-0000-4000-8000-00000000000e', '40000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000006', 'goal', 71),
  ('50000000-0000-4000-8000-00000000000f', '40000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-00000000000c', 'goal', 83),
  ('50000000-0000-4000-8000-000000000010', '40000000-0000-4000-8000-000000000005', '30000000-0000-4000-8000-00000000000c', 'goal', 10),
  ('50000000-0000-4000-8000-000000000011', '40000000-0000-4000-8000-000000000005', '30000000-0000-4000-8000-000000000002', 'goal', 18),
  ('50000000-0000-4000-8000-000000000012', '40000000-0000-4000-8000-000000000005', '30000000-0000-4000-8000-000000000003', 'goal', 46),
  ('50000000-0000-4000-8000-000000000013', '40000000-0000-4000-8000-000000000005', '30000000-0000-4000-8000-00000000000b', 'goal', 66),
  ('50000000-0000-4000-8000-000000000014', '40000000-0000-4000-8000-000000000006', '30000000-0000-4000-8000-000000000006', 'goal', 9),
  ('50000000-0000-4000-8000-000000000015', '40000000-0000-4000-8000-000000000006', '30000000-0000-4000-8000-000000000009', 'goal', 24),
  ('50000000-0000-4000-8000-000000000016', '40000000-0000-4000-8000-000000000006', '30000000-0000-4000-8000-000000000005', 'goal', 39),
  ('50000000-0000-4000-8000-000000000017', '40000000-0000-4000-8000-000000000006', '30000000-0000-4000-8000-000000000008', 'goal', 52)
on conflict (id) do nothing;

insert into public.standings (
  team_id,
  played,
  won,
  drawn,
  lost,
  goals_for,
  goals_against,
  points
)
values
  ('20000000-0000-4000-8000-000000000001', 3, 2, 1, 0, 7, 5, 7),
  ('20000000-0000-4000-8000-000000000002', 3, 1, 0, 2, 5, 7, 3),
  ('20000000-0000-4000-8000-000000000003', 3, 0, 1, 2, 3, 6, 1),
  ('20000000-0000-4000-8000-000000000004', 3, 1, 2, 0, 6, 3, 5)
on conflict (team_id) do update set
  played = excluded.played,
  won = excluded.won,
  drawn = excluded.drawn,
  lost = excluded.lost,
  goals_for = excluded.goals_for,
  goals_against = excluded.goals_against,
  points = excluded.points,
  updated_at = now();
