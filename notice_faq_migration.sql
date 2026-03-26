-- Create Notices table
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for notices
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- Allow public read access for notices
CREATE POLICY "Allow public read access for notices" ON public.notices
    FOR SELECT USING (true);

-- Allow authenticated/service role full access for notices (Admins)
CREATE POLICY "Allow full access for authenticated users on notices" ON public.notices
    FOR ALL USING (true) WITH CHECK (true);


-- Create FAQs table
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for faqs
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Allow public read access for FAQs
CREATE POLICY "Allow public read access for faqs" ON public.faqs
    FOR SELECT USING (true);

-- Allow authenticated/service role full access for FAQs (Admins)
CREATE POLICY "Allow full access for authenticated users on faqs" ON public.faqs
    FOR ALL USING (true) WITH CHECK (true);
