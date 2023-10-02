

'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Session } from '@supabase/auth-helpers-nextjs'

import { redirect } from "next/navigation";


export default function LoginForm({ session }: { session: Session | null }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        // redirect("/login");
        router.push('/');
        router.refresh()
    }

    // for the `session` to be available on first SSR render, it must be
    // fetched in a Server Component and passed down as a prop
    return session ? (
        <button className="btn" onClick={handleSignOut}>Sign out</button>
    ) : (
        <div className="w-full">
             <button className="btn" onClick={handleSignOut}> Sign Out </button>
        </div>
    )
}