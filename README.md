# Korea Civil Qualification Association (KCQA) - GTCC

This project is a certificate verification and issuance system for the Korea Civil Qualification Association. It allows users to verify certificates and admins to issue/manage them.

## Key Features

### 1. Public Certificate Verification
*   **Search by Name + Email**: Users can find their certificates by entering their full name and email address.
*   **Multi-Certificate Support**: If a user holds multiple qualifications, they can view all of them in a carousel interface.
*   **1:N Relationship**: One "Holder" (User) can have N "Certificates".
*   **Digital Certificate View**: Provides a high-fidelity digital rendering of the certificate with anti-forgery features (animated background, watermark).

### 2. Admin Dashboard (Staff Access)
*   **Log in**: Staff members can log in to manage certificates.
*   **Issue Certificate**:
    *   Create new certificates for existing or new users.
    *   **Auto-Linking**: Entering Name + DOB checks for an existing user.
    *   **Email Support**: Optional email field to distinguish users with the same Name + DOB.
*   **Manage Certificates**: Search, edit, revoke, or print certificates.

## Tech Stack
*   **Frontend**: React, Vite, Tailwind CSS
*   **Backend**: Supabase (Database & Auth)
*   **Icons**: Lucide React

## Setup Instructions

### 1. Environment Variables (Supabase Dashboard)
Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Schema
You must set up the Supabase database tables (`holders`, `certificates`) before running the app.
1.  Go to your Supabase Project Dashboard -> SQL Editor.
2.  Copy the content of `supabase_migration.sql` from this project.
3.  Run the query. This will create tables, indexes, and dummy data.

### 3. Run Locally
```bash
npm install
npm run dev
```

## Database Structure

### `holders` Table
Stores user identity information.
*   `id`: UUID (Primary Key)
*   `name`: Text
*   `dob`: Text (YYYY-MM-DD)
*   `email`: Text (Optional, unique constraint with Name/DOB conceptually)

### `certificates` Table
Stores qualification details.
*   `id`: UUID (Primary Key)
*   `holder_id`: UUID (Foreign Key -> holders.id)
*   `icqa_number`: Text (Unique Certificate No.)
*   `qualification_type`: Text
*   `status`: Text (ACTIVE, REVOKED, EXPIRED)
*   ... other certificate details (issue date, expiry, etc.)

## Development Notes
*   **Authentication**: Currently uses a mock/local authentication context (`AuthContext.tsx`) for demonstration.
*   **Theme**: Supports Light/Dark mode with persistence.
