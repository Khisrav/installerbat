import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const getSupabaseClient = (): SupabaseClient => {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase URL or Key in environment variables')
    }

    return createClient(supabaseUrl, supabaseKey)
}