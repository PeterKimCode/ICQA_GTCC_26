const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envLocal = fs.readFileSync('.env.local', 'utf-8');
const supabaseUrl = envLocal.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = envLocal.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('notices').insert({
    title: 'Test',
    date: '2026-03-26',
    content: 'Test content'
  });
  console.log('Error:', error);
}

test();
