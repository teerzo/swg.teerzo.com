

import { auth } from "@/app/auth/auth";
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { redirect } from "next/navigation";
import Characters from './characters';

import { getCharacters } from "../actions";

export default async function Page() {
    const cookieStore = cookies()
    const session = await auth({ cookieStore })

    const characters = await getCharacters();




    return (
        <div>
            <h1> Characters </h1>

            <Characters characters={characters} />
        </div>
    )
}