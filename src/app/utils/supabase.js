import { createClient } from '@supabase/supabase-js'
// import { configDotenv } from 'dotenv'

export default createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)







