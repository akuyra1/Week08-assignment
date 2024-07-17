export default function dbConnection() {
    const connectionString = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const annonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    return supabase;
}