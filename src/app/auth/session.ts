'use server'

import { cookies } from 'next/headers';
import { cache } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const cookieStore = cookies()
export const createServerSupabaseClient = cache(() =>
    createServerComponentClient({ cookies: () => cookieStore })
)

export async function getSession() {
    const supabase = createServerSupabaseClient()
    try {
        const {
            data: { session }
        } = await supabase.auth.getSession()
        return session
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}