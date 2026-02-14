-- Migration: Add phone_number to holders table
-- Run this in your Supabase SQL Editor

ALTER TABLE holders ADD COLUMN IF NOT EXISTS phone_number text;

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_holders_phone ON holders(phone_number);

-- Optional: Add a unique constraint if one phone number should only belong to one holder
-- CREATE UNIQUE INDEX IF NOT EXISTS idx_holders_phone_unique ON holders(phone_number);
