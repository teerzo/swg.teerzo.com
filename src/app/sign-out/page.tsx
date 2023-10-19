// 'use client'

import { auth } from '@/app/auth/auth';
import { LoginButton } from '@/components/login-button/login-button'
import { LoginForm } from '@/components/login-form/login-form'
// import { Separator } from '@/components/ui/separator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation'

import { toast } from 'react-hot-toast';

import SignOut from './sign-out';

export default async function SignInPage() {
    // const router = useRouter();
    const supabase = createClientComponentClient()
    const cookieStore = cookies()
    const session = await auth({ cookieStore })

    return (
        <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center py-10">
            <div className="w-full max-w-sm">
                <SignOut session={session} />
            </div>
        </div>
    )
}