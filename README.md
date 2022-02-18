# SQLite / Prisma / Next.js Login App
Login demo using Prisma, SQLite and Next.js with Tailwind for styling. Uses `iron-session` to manage session cookies for authentication.

Currently two basic pages:
- Login / Register page, accessible to all
- Dashboard page, accessible only to logged-in users

## Setup
1. Clone
2. `npm i`
3. Copy `.env.example` file to a `.env` file and replace the variables as needed
4. Run `npx prisma migrate dev --name init` to create the SQLite file and seed it with one user.
5. Run `npm run dev` to start the app

## TODOs
- Switch to managed DB (e.g. Heroku Postgres)
- Find way around Next.js issues with serialising Date objects
- Develop layout component to include login / nav bar
- Log user in after registration
- Form validation