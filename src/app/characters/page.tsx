

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { redirect } from "next/navigation";
import Characters from './characters';

export default async function Page() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    const { data: characters } = await supabase.from("characters").select();



    return (
        <div>
            <h1> Characters </h1>

            <Characters characters={characters} />
        </div>
    )
}