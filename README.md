# International Civil Qualification Association (ICQA) - GTCC

This project is a certificate verification and issuance platform for the International Civil Qualification Association (ICQA). It supports public credential lookup, printable certificates, and admin workflows for managing qualifications, notices, and FAQs.

## Key Features

### Public Portal
- Certificate lookup by full name and phone number
- Digital certificate rendering optimized for desktop and mobile
- Public notices and FAQs
- English-first public experience with optional translation support

### Admin Dashboard
- Role-based access for staff and administrators
- Certificate issuance, review, and approval workflows
- Notice and FAQ management
- Profile and password management for internal users

## Setup

### Environment Variables
Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Run Locally

```bash
npm install
npm run dev
```

## Database Notes

- `holders` stores certificate holder identity records
- `certificates` stores issued qualifications
- `notices` stores public announcements
- `faqs` stores public frequently asked questions

## Development Notes

- Authentication currently uses local mock users for prototype and demo use
- Supabase remains the system of record for holders, certificates, notices, and FAQs
