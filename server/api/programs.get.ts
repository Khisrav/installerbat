import { getSupabaseClient } from "~/utils/getSupabaseClient"

export default defineEventHandler(async (event) => {
    const supabase = getSupabaseClient()

    if (!supabase) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Supabase client not initialized',
        })
    }

    const { data: programs, error } = await supabase
        .from('programs')
        .select('*')
    
    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error fetching programs',
            message: error.message,
        })
    }

    return programs
})
