-- FIXED DATABASE SETUP SCRIPT
-- This script avoids "DO $$" blocks to prevent parsing errors in Supabase SQL Editor.

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS holders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  dob text NOT NULL,
  email text,
  phone_number text, -- Added phone_number
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS certificates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  holder_id uuid REFERENCES holders(id),
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

-- 2. Create Unique Indexes (Required for ON CONFLICT to work)
CREATE UNIQUE INDEX IF NOT EXISTS idx_holders_email ON holders(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_holders_phone ON holders(phone_number); -- Added index
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_icqa ON certificates(icqa_number);

-- 3. Insert Holders (Using ON CONFLICT to avoid duplicates)
-- Updated with phone numbers
INSERT INTO holders (name, dob, email, phone_number) VALUES 
('KIM CHUL SOO', '1980-01-01', 'kim@example.com', '010-1234-5678'),
('LEE YOUNG HEE', '1990-05-15', 'lee@example.com', '010-9876-5432'),
('PARK JI SUNG', '1985-02-20', 'park@example.com', '010-1111-2222'),
('CHOI MIN SU', '1995-12-10', 'choi@example.com', '010-3333-4444'),
('JUNG DA BIN', '2000-07-07', 'jung@example.com', '010-5555-6666')
ON CONFLICT (email) DO UPDATE SET phone_number = EXCLUDED.phone_number;

-- 4. Insert Certificates (Linking via Subquery)
-- Kim's Cert 1
INSERT INTO certificates (holder_id, icqa_number, name, dob, ncqa_number, qualification_type, issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status)
VALUES (
  (SELECT id FROM holders WHERE email = 'kim@example.com'), 
  'ICQA-2024-001', 'KIM CHUL SOO', '1980-01-01', 'NCQA-001', 'Certified Evaluator', '2024-01-01', 'ICQA Learning Center', 'ICQA Asia Office', 'Singapore', '2026-01-01', 'ACTIVE'
) ON CONFLICT (icqa_number) DO NOTHING;

-- Kim's Cert 2
INSERT INTO certificates (holder_id, icqa_number, name, dob, ncqa_number, qualification_type, issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status)
VALUES (
  (SELECT id FROM holders WHERE email = 'kim@example.com'), 
  'ICQA-2023-050', 'KIM CHUL SOO', '1980-01-01', 'NCQA-099', 'Advanced Instructor', '2023-06-01', 'ICQA Learning Center', 'ICQA Asia Office', 'Singapore', '2028-06-01', 'ACTIVE'
) ON CONFLICT (icqa_number) DO NOTHING;

-- Lee's Cert
INSERT INTO certificates (holder_id, icqa_number, name, dob, ncqa_number, qualification_type, issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status)
VALUES (
  (SELECT id FROM holders WHERE email = 'lee@example.com'), 
  'ICQA-2024-002', 'LEE YOUNG HEE', '1990-05-15', 'NCQA-002', 'Safety Manager', '2024-02-01', 'ICQA Safety Academy', 'ICQA Pacific Office', 'Australia', '2026-02-01', 'ACTIVE'
) ON CONFLICT (icqa_number) DO NOTHING;

-- Park's Cert (Revoked)
INSERT INTO certificates (holder_id, icqa_number, name, dob, ncqa_number, qualification_type, issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status)
VALUES (
  (SELECT id FROM holders WHERE email = 'park@example.com'), 
  'ICQA-2024-003', 'PARK JI SUNG', '1985-02-20', 'NCQA-003', 'Health Specialist', '2024-03-01', 'ICQA Health Institute', 'ICQA Seoul Liaison', 'Singapore', '2026-03-01', 'REVOKED'
) ON CONFLICT (icqa_number) DO NOTHING;

-- Choi's Cert
INSERT INTO certificates (holder_id, icqa_number, name, dob, ncqa_number, qualification_type, issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status)
VALUES (
  (SELECT id FROM holders WHERE email = 'choi@example.com'), 
  'ICQA-2024-004', 'CHOI MIN SU', '1995-12-10', 'NCQA-004', 'Environmental Expert', '2024-04-01', 'ICQA Sustainability Lab', 'ICQA Global Office', 'United Kingdom', '2026-04-01', 'ACTIVE'
) ON CONFLICT (icqa_number) DO NOTHING;

-- Jung's Cert
INSERT INTO certificates (holder_id, icqa_number, name, dob, ncqa_number, qualification_type, issue_date, edu_dept, issuing_office, issuing_country, expiration_date, status)
VALUES (
  (SELECT id FROM holders WHERE email = 'jung@example.com'), 
  'ICQA-2024-005', 'JUNG DA BIN', '2000-07-07', 'NCQA-005', 'Quality Control', '2024-05-01', 'ICQA Quality Academy', 'ICQA Europe Office', 'Germany', '2025-05-01', 'ACTIVE'
) ON CONFLICT (icqa_number) DO NOTHING;
