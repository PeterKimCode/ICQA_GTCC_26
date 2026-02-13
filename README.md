# ICQA Certificate Manager

International Civil Qualification Association (ICQA) Certificate Management System.

## Project Overview

This is a comprehensive system for managing and verifying international civil qualifications. It features a modern, trendy landing page for the public to verify certificates and an internal system for administrators to manage certificate data.

## Features

- **Trendy Landing Page**: A premium, high-impact landing page with Light/Dark mode support.
- **Certificate Verification**: Public search tool for instantly verifying certificate authenticity.
- **Internal System Access**: Secure login for staff and administrators.
- **Certificate Management**: Tools for creating, editing, and managing certificates.
- **Print/PDF Generation**: High-resolution certificate rendering for printing and saving as PDF.

## How to Use

### Public Users
1. Access the home page (`/`).
2. Enter the **Full Name** and **ICQA Number** in the "QUALIFICATION SEARCH" section.
3. Click "Search" to verify the certificate and view the professional details.

### Staff/Admin Users
1. Click "INTERNAL ACCESS" or go to `/login`.
2. Login with your credentials.
3. Access the Dashboard to manage existing certificates or create new ones.
4. Use the "Print" function on any certificate to generate the official document.

## Data Storage (Supabase Integration)

This application has been migrated from local storage to **Supabase** for centralized data sharing across multiple users.

### Supabase Setup Instructions

1.  **Create a Project**: Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Initialize Database**:
    - Open the **SQL Editor** in your Supabase dashboard.
    - Copy and run the contents of [init_supabase.sql](file:///C:/Users/ABC/.gemini/antigravity/brain/586b7c8e-205d-4295-8e31-b774187e794c/init_supabase.sql) to create the `certificates` table and set up access policies.
3.  **Configure Environment Variables**:
    - Get your **Project URL** and **Anon Key** from Project Settings -> API.
    - Add them to your `.env.local` file:
      ```env
      VITE_SUPABASE_URL=your_project_url
      VITE_SUPABASE_ANON_KEY=your_anon_key
      ```

### Persistence
Data is now stored in a PostgreSQL database hosted by Supabase. Changes made by any admin are immediately visible to all users (public search and other admins).

## Getting Started

### Prerequisites
- Node.js (v18+)

### Installation & Run
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Setup environment**:
   Set your `GEMINI_API_KEY` in `.env.local`.
3. **Start development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## Development History

- **1st Commit**: Initial system setup with core certificate management.
- **2nd Commit**: Implementation of the trendy landing page, Light/Dark mode, and asset migration to the `public` folder for proper loading.
