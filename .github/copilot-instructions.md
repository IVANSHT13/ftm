# Capstone Project: Software Technologies with AI - Copilot Instructions

## 🚨 Critical Constraint: Strict Tech Stack
- **Frontend:** Use ONLY plain HTML, vanilla JavaScript (ES6+), CSS, and Bootstrap. 
- **ABSOLUTELY NO TypeScript, React, Vue, Angular, or other UI frameworks.** Keep it purely modular vanilla JS.
- **Backend:** Supabase (Database, Auth, and Storage) accessed strictly via the Supabase JS REST API Client.
- **Build Tools:** Node.js, npm, and Vite.

## 🏗️ Architecture & Navigation Guidelines
- **Multi-Page App (MPA):** Do NOT build a Single Page Application (SPA) with dynamic popups. Every single app screen must have its own separate physical HTML/JS file.
- **Modular Design:** Split the application into self-contained components. Separate files must be used for:
  - **UI Pages:** Handles the DOM and user interactions.
  - **Services:** Handles API calls, specifically communication with Supabase.
  - **Utils:** Reusable helper functions.
- **No Monoliths:** Keep files small, readable, and highly modular. Avoid putting UI rendering and backend business logic in the same file.

## 🔐 Authentication, Authorization & Security
- **Supabase Auth:** Implement user flows for Sign Up, Login, and Logout using Supabase Auth with JWT tokens.
- **Role-Based Access Control (RBAC):** Differentiate between normal users and admin users. Use a `user_roles` table paired with Supabase Row-Level Security (RLS) policies.
- **Admin Features:** Always ensure that admin panels or administrative functions check for admin permissions both in the client logic and via RLS on the server-side.

## 💾 Database & File Storage Rules
- **Schema Expectations:** The app must utilize at least 4 relational database tables (e.g., users, profiles, items, logs). Ensure proper indexing and normalization.
- **Migrations:** Do not suggest raw dashboard edits for database schema changes. Always write and document Supabase SQL migrations.
- **Supabase Storage:** Code must include server-side file upload and download mechanics (e.g., handling profile picture uploads or documents) utilizing Supabase Storage buckets.

## 🎨 User Interface (UI) Expectations
- Minimum of 5 fully responsive app screens layout using Bootstrap.
- Prioritize professional visual cues, transitions, icons, and loading states to optimize the user experience on both mobile and desktop views.

## 🤖 AI Development Agent Workflow
- Write complete, clean, modular code. Avoid placeholders or `// TODO` comments.
- Keep components small to accommodate an iterative development loop: Prompt -> Implement -> Test -> Refine -> Commit.