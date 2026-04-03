-- ICQA GTCC Supabase Setup
-- Run this entire file once in the Supabase SQL Editor.
-- It creates all required tables, indexes, RLS policies, and sample seed data.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ------------------------------------------------------------------
-- 1. Core Tables
-- ------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.holders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  dob text NOT NULL,
  email text,
  phone_number text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.certificates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  holder_id uuid REFERENCES public.holders(id) ON DELETE SET NULL,
  icqa_number text NOT NULL,
  name text,
  dob text,
  ncqa_number text,
  qualification_type text,
  issue_date text,
  edu_dept text,
  issuing_office text,
  issuing_country text,
  expiration_date text,
  photo_url text,
  status text DEFAULT 'ACTIVE',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.notices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------
-- 2. Indexes and Constraints
-- ------------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS idx_holders_email ON public.holders(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_holders_phone ON public.holders(phone_number);
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_icqa ON public.certificates(icqa_number);

CREATE INDEX IF NOT EXISTS idx_certificates_holder_id ON public.certificates(holder_id);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON public.certificates(status);
CREATE INDEX IF NOT EXISTS idx_faqs_sort_order ON public.faqs(sort_order);

-- ------------------------------------------------------------------
-- 3. Row Level Security
-- ------------------------------------------------------------------

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access for notices" ON public.notices;
CREATE POLICY "Allow public read access for notices"
ON public.notices
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow full access for authenticated users on notices" ON public.notices;
CREATE POLICY "Allow full access for authenticated users on notices"
ON public.notices
FOR ALL
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read access for faqs" ON public.faqs;
CREATE POLICY "Allow public read access for faqs"
ON public.faqs
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow full access for authenticated users on faqs" ON public.faqs;
CREATE POLICY "Allow full access for authenticated users on faqs"
ON public.faqs
FOR ALL
USING (true)
WITH CHECK (true);

-- ------------------------------------------------------------------
-- 4. Seed Holders
-- ------------------------------------------------------------------

INSERT INTO public.holders (name, dob, email, phone_number) VALUES
('KIM CHUL SOO', '1980-01-01', 'kim@example.com', '01012345678'),
('LEE YOUNG HEE', '1990-05-15', 'lee@example.com', '01098765432'),
('PARK JI SUNG', '1985-02-20', 'park@example.com', '01011112222'),
('CHOI MIN SU', '1995-12-10', 'choi@example.com', '01033334444'),
('JUNG DA BIN', '2000-07-07', 'jung@example.com', '01055556666')
ON CONFLICT (email) DO UPDATE SET
  phone_number = EXCLUDED.phone_number,
  updated_at = timezone('utc'::text, now());

-- ------------------------------------------------------------------
-- 5. Seed Certificates
-- ------------------------------------------------------------------

INSERT INTO public.certificates (
  holder_id, icqa_number, name, dob, ncqa_number, qualification_type,
  issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status
)
VALUES (
  (SELECT id FROM public.holders WHERE email = 'kim@example.com'),
  'ICQA-2024-001', 'KIM CHUL SOO', '1980-01-01', 'NCQA-001',
  'Certified Evaluator', '2024-01-01', 'ICQA Learning Center',
  'ICQA Asia Office', 'Singapore', '2026-01-01', 'ACTIVE'
)
ON CONFLICT (icqa_number) DO NOTHING;

INSERT INTO public.certificates (
  holder_id, icqa_number, name, dob, ncqa_number, qualification_type,
  issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status
)
VALUES (
  (SELECT id FROM public.holders WHERE email = 'kim@example.com'),
  'ICQA-2023-050', 'KIM CHUL SOO', '1980-01-01', 'NCQA-099',
  'Advanced Instructor', '2023-06-01', 'ICQA Learning Center',
  'ICQA Asia Office', 'Singapore', '2028-06-01', 'ACTIVE'
)
ON CONFLICT (icqa_number) DO NOTHING;

INSERT INTO public.certificates (
  holder_id, icqa_number, name, dob, ncqa_number, qualification_type,
  issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status
)
VALUES (
  (SELECT id FROM public.holders WHERE email = 'lee@example.com'),
  'ICQA-2024-002', 'LEE YOUNG HEE', '1990-05-15', 'NCQA-002',
  'Safety Manager', '2024-02-01', 'ICQA Safety Academy',
  'ICQA Pacific Office', 'Australia', '2026-02-01', 'ACTIVE'
)
ON CONFLICT (icqa_number) DO NOTHING;

INSERT INTO public.certificates (
  holder_id, icqa_number, name, dob, ncqa_number, qualification_type,
  issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status
)
VALUES (
  (SELECT id FROM public.holders WHERE email = 'park@example.com'),
  'ICQA-2024-003', 'PARK JI SUNG', '1985-02-20', 'NCQA-003',
  'Health Specialist', '2024-03-01', 'ICQA Health Institute',
  'ICQA Seoul Liaison', 'Singapore', '2026-03-01', 'REVOKED'
)
ON CONFLICT (icqa_number) DO NOTHING;

INSERT INTO public.certificates (
  holder_id, icqa_number, name, dob, ncqa_number, qualification_type,
  issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status
)
VALUES (
  (SELECT id FROM public.holders WHERE email = 'choi@example.com'),
  'ICQA-2024-004', 'CHOI MIN SU', '1995-12-10', 'NCQA-004',
  'Environmental Expert', '2024-04-01', 'ICQA Sustainability Lab',
  'ICQA Global Office', 'United Kingdom', '2026-04-01', 'ACTIVE'
)
ON CONFLICT (icqa_number) DO NOTHING;

INSERT INTO public.certificates (
  holder_id, icqa_number, name, dob, ncqa_number, qualification_type,
  issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status
)
VALUES (
  (SELECT id FROM public.holders WHERE email = 'jung@example.com'),
  'ICQA-2024-005', 'JUNG DA BIN', '2000-07-07', 'NCQA-005',
  'Quality Control', '2024-05-01', 'ICQA Quality Academy',
  'ICQA Europe Office', 'Germany', '2025-05-01', 'ACTIVE'
)
ON CONFLICT (icqa_number) DO NOTHING;

-- ------------------------------------------------------------------
-- 6. Seed Notices
-- ------------------------------------------------------------------

INSERT INTO public.notices (title, date, content)
VALUES
(
  'ICQA Platform Launch',
  '2026-04-01',
  'The ICQA certificate verification platform is now available for public lookup and administrator operations.'
),
(
  'Credential Review Guidance',
  '2026-04-02',
  'Please ensure holder name, date of birth, and phone number are entered consistently before issuing a new record.'
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------------
-- 7. Seed FAQs
-- ------------------------------------------------------------------

INSERT INTO public.faqs (question, answer, sort_order)
VALUES
(
  'How do I verify an ICQA certificate?',
  'Open the public verification page and search using the holder full name and registered phone number.',
  10
),
(
  'Can staff issue certificates directly?',
  'Yes. Staff can create new certificates, and those entries can remain pending until approved by an administrator.',
  20
),
(
  'Does this project use Supabase Auth?',
  'No. The current version uses local mock login for the admin UI and Supabase as the data backend.',
  30
)
ON CONFLICT DO NOTHING;
