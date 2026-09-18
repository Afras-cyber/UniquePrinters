import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Anon Key in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const bookData = {
  title: "The Vijay Revolution: People Power & the Politics of Hope",
  price: 2900.00,
  image_url: "https://books.lk/wp-content/uploads/2026/07/nw4.jpg",
  grade: "Biography", // Required field
  color: "bg-blue-600", // Required field
  accent: "blue", // Required field
  category: "Biography",
};

async function seed() {
  console.log("Seeding book...");
  
  const { data, error } = await supabase.from('books').insert([bookData]).select();
  
  if (error) {
    console.error("❌ Failed to seed book:", error.message);
    process.exit(1);
  }
  
  console.log("✅ Successfully seeded book!");
  console.log(data);
}

seed();
