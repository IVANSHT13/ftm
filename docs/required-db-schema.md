# Required DB Schema

This document summarizes the initial simplified Supabase database schema for the tournament app.

## Core Tables

### `users`
- Uses Supabase Auth as the source of identity.
- Fields:
  - `id` UUID, primary key, references `auth.users.id`
  - `role` enum: `admin | manager | player`
  - `full_name`
  - `created_at`
  - `updated_at`

### `teams`
- Stores registered teams.
- Fields:
  - `id` UUID, primary key
  - `name`
  - `short_name`
  - `manager_id` references `users.id`
  - `logo_url`
  - `founded_year`
  - `created_at`
  - `updated_at`

### `players`
- Stores players assigned to teams.
- Fields:
  - `id` UUID, primary key
  - `team_id` references `teams.id`
  - `user_id` references `users.id`
  - `full_name`
  - `position`
  - `jersey_number`
  - `created_at`
  - `updated_at`

### `matches`
- Stores fixtures and results.
- Fields:
  - `id` UUID, primary key
  - `home_team_id` references `teams.id`
  - `away_team_id` references `teams.id`
  - `venue`
  - `kickoff_at`
  - `matchday`
  - `home_score`
  - `away_score`
  - `status` enum: `scheduled | live | finished | postponed | cancelled`
  - `created_at`
  - `updated_at`

### `match_events`
- Stores events that happen during a match.
- Fields:
  - `id` UUID, primary key
  - `match_id` references `matches.id`
  - `player_id` references `players.id`
  - `type` enum: `goal | assist | yellow_card | red_card | substitution | own_goal | penalty_saved`
  - `minute`
  - `created_at`

### `standings`
- Stores the league table.
- Fields:
  - `id` UUID, primary key
  - `team_id` references `teams.id`
  - `played`
  - `won`
  - `drawn`
  - `lost`
  - `goals_for`
  - `goals_against`
  - `points`
  - `created_at`
  - `updated_at`

## Relationship Summary

- One user can be a manager or player.
- One team has one manager and many players.
- One match has a home team and away team.
- One match has many match events.
- One team has one standings row.

## Supabase Notes

- The schema is implemented through a Supabase migration.
- RLS is enabled on all tables.
- Auth-triggered profile creation inserts a row into `users` when a new Supabase Auth user is created.
- Managers and admins can manage their team records, while admins can manage all competition data.
