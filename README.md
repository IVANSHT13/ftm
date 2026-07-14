# Pro League

Pro League is a football tournament management web app built as a multi-page application with plain HTML, vanilla JavaScript, CSS, Bootstrap, and Supabase.

## What it does
- Visitors can browse the public tournament pages: Home, Teams, Live Scores, Schedule, and Statistics.
- Users can sign in or register with Supabase Auth.
- Logged-in users can create teams and upload a logo plus a team photo.
- The app stores teams, players, matches, match events, and standings in Supabase.
- Role-based access control and RLS protect the competition data.

## Architecture
- Front end: Vite, vanilla JS, HTML, CSS, Bootstrap 5.
- Back end: Supabase Auth, PostgreSQL, Storage, and RLS policies.
- Routing: lightweight client-side router with separate page modules.
- Storage: team logos and photos are stored in the `team-assets` bucket.

## Database
Main tables:
- `users`
- `teams`
- `players`
- `matches`
- `match_events`
- `standings`

See the full documentation and schema summary:
- [Project documentation](docs/project-documentation.md)
- [Required DB schema](docs/required-db-schema.md)

## Local development
1. Install dependencies:

   ```bash
   npm install
   ```

2. Add a `.env.local` file in the project root:

   ```bash
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-or-publishable-key
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

5. Preview the production build:

   ```bash
   npm run preview
   ```

## Key folders
- `src/` - application source code
- `src/pages/` - page modules for each screen
- `src/components/` - shared header and footer components
- `src/services/` - Supabase auth and data access helpers
- `supabase/migrations/` - SQL migrations for schema, seed data, and storage policies
- `docs/` - project documentation
