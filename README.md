# ICQA GTCC

ICQA GTCC is an English-first certificate verification and issuance platform for the International Civil Qualification Association (ICQA). It includes a public lookup flow, printable certificate views, and an internal admin dashboard for certificate, notice, and FAQ management.

## Stack

- React + Vite + TypeScript
- Supabase for database/storage access
- Local mock admin login for the current prototype

## What Supabase Is Used For

Supabase is the data backend for:

- `holders`
- `certificates`
- `notices`
- `faqs`

This project currently does **not** use Supabase Auth. The admin login in the app is mock/local-state based.

## Supabase Setup

### 1. Create a Supabase project

Create a new project in Supabase and wait until it finishes provisioning.

### 2. Get project credentials

From Supabase:

1. Open `Project Settings`
2. Open `API`
3. Copy:
   - `Project URL`
   - `anon public` key

### 3. Add local environment variables

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the SQL setup

In Supabase:

1. Open `SQL Editor`
2. Open the local file [supabase_setup.sql](/c:/Users/ABC/Documents/Codex/Test/supabase_setup.sql)
3. Paste the full contents into the SQL Editor
4. Run it once

That single file creates:

- all required tables
- indexes
- notice/FAQ RLS policies
- sample holders
- sample certificates
- sample notices
- sample FAQs

## Tables Created

- `public.holders`
- `public.certificates`
- `public.notices`
- `public.faqs`

## Notes About Policies

- `notices` and `faqs` have RLS enabled with public read access
- the current setup keeps broad write access behavior for notices/faqs because the app is still using mock admin login instead of Supabase Auth
- `holders` and `certificates` are created as the operational data tables used by the frontend

If you later switch to real Supabase Auth, you should tighten policies before production use.

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Demo Admin Accounts

- `admin@icqa.org` / `password`
- `staff@icqa.org` / `password`

## Public Verification Demo Data

Sample seeded holder lookups include:

- `KIM CHUL SOO` / `01012345678`
- `LEE YOUNG HEE` / `01098765432`

## Project Notes

- Certificate holder search uses full name + phone number
- Certificate numbers are stored in the `icqa_number` database column and mapped to `kcqaNumber` in the current frontend type shape for compatibility with the existing codebase
- The app expects Supabase tables to exist before the UI is used
