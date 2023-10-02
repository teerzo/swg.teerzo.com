


import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'

import LoginForm from './login-form'


export default async function Login() {

    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    return (
        <div className="flex flex-col w-full items-center">

            <h1>Login</h1>
            {session ?
                <div> Signed in </div>
                :
                <div> Not signed in </div>
            }

            <div className="w-96 bg-100">
                <LoginForm session={session} />
            </div>
        </div>
    )
}