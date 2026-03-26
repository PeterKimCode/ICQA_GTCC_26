# Korea Civil Qualification Association (KCQA) - GTCC

This project is a comprehensive certificate verification and issuance system for the Korea Civil Qualification Association (KCQA). It provides a seamless platform for users to verify their certifications and for administrators to manage qualifications, notices, and FAQs.

## ✨ Key Features

### 1. Public Portal
* **Certificate Search & Verification**: Users can search for their certificates using their Name and Phone Number.
* **Responsive Digital Certificates**: High-fidelity digital renderings of certificates that automatically scale to perfectly fit mobile and desktop screens.
* **Public Notices & FAQs**: Visitors can view important announcements and answers to frequently asked questions directly from the unified drop-down menu.
* **Dark Mode Support**: Full light/dark mode support that persists across the session.

### 2. Admin & Staff Dashboard
* **Role-Based Access Control**:
  * **STAFF**: Can issue new certificates. Certificates created by STAFF are initially set to a `PENDING` state and require ADMIN approval. They can only view pending certificates.
  * **ADMIN**: Has full access. Can approve `PENDING` certificates, edit existing ones, and manage system-wide settings.
* **Notice & FAQ Management (Admin Only)**: Built-in CRUD interface to create, update, and delete public notices and FAQs in real-time.
* **Smart Forms**: 
  * Auto-hyphenation formatting for Date of Birth inputs (`YYYY-MM-DD`).
  * Friendly duplicate validation checks for KCQA numbers.
* **Session Persistence**: Administrators remain logged in even after refreshing (`F5`), ensuring uninterrupted workflows.

---

## 🛠️ Tech Stack
* **Frontend**: React 18, Vite, Tailwind CSS, React Router v6
* **Database & BaaS**: Supabase (PostgreSQL, Row Level Security)
* **Icons**: Lucide React

---

## 🚀 Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase connection credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Schema (Supabase)
You must set up the necessary database tables before running the app.
1. Go to your **Supabase Project Dashboard -> SQL Editor**.
2. Run the main certificate schema script: Copy and run the contents of `supabase_migration.sql` to create the `holders` and `certificates` tables.
3. Run the new features schema script: Copy and run the contents of `notice_faq_migration.sql` to create the `notices` and `faqs` tables for the admin dashboard.

### 3. Running Locally
```bash
npm install
npm run dev
```

---

## 🗄️ Database Structure

### `holders`
Stores the identity of the certificate owner.
* `id` (UUID, Primary Key)
* `name` (Text)
* `dob` (Text, YYYY-MM-DD)
* `email` (Text)
* `phone_number` (Text, Unique)

### `certificates`
Stores the individual qualifications belonging to a holder. (1 Holder : N Certificates)
* `id` (UUID, Primary Key)
* `holder_id` (UUID, Foreign Key)
* `icqa_number` (Text, Unique Identifier)
* `qualification_type` (Text)
* `status` (Text: `ACTIVE`, `PENDING`, `REVOKED`, `EXPIRED`)
* `issue_date`, `expiration_date`, `photo_url`, etc.

### `notices`
Stores public announcements managed by Admins.
* `id` (UUID)
* `title` (Text)
* `content` (Text)
* `date` (Date)

### `faqs`
Stores Frequently Asked Questions managed by Admins.
* `id` (UUID)
* `question` (Text)
* `answer` (Text)
* `sort_order` (Integer - controls display order)

---

## 📝 Development Notes
* **Mock Authentication**: Currently, user authentication leverages local mock data (`constants.ts`) and `localStorage` state initialization to bypass Supabase Auth during prototype phases.
* **Error Handling**: Database unique constraint violations (e.g., duplicated certificate numbers) are gracefully caught and translated into user-friendly alerts.
