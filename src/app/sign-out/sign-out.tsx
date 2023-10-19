'use client'

import { useEffect } from 'react';

import { auth } from '@/app/auth/auth';
import { LoginButton } from '@/components/login-button/login-button'
import { LoginForm } from '@/components/login-form/login-form'
// import { Separator } from '@/components/ui/separator'
import { cookies } from 'next/headers'
import { useRouter, redirect } from 'next/navigation'
import { toast } from 'react-hot-toast';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


import type { Session } from '@supabase/auth-helpers-nextjs'

export default function SignOut({ session }: { session: Session | null }) {
    const router = useRouter();
    const supabase = createClientComponentClient()
    // Sign out and redirect back to home
    // if (session?.user) {
    //     // toast.success('Sign out successfull')
    //     // router.refresh(); 
    // }

    useEffect(() => {
        console.log('session', session);
        handleSignOut();


        // if (!session) {
        //     toast.success('Sign out successfull')
        //     redirect('/')
        // }
    }, [session]);

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push('/');
    }


    return (
        <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center py-10">
            <div className="w-full max-w-sm">
                <p> Signing out </p>
            </div>
        </div>
    )
}