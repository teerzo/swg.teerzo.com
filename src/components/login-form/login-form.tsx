'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LoginButton } from '@/components/login-button/login-button'

// import { Button } from '@/components/ui/button'
// import { IconSpinner } from '@/components/ui/icons'
// import { Input } from './ui/input'
// import { Label } from './ui/label'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> {
    action: 'sign-in' | 'sign-up'
}

export function LoginForm({
    className,
    action = 'sign-in',
    ...props
}: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setError] = useState('');

    const router = useRouter()
    // Create a Supabase client configured to use cookies
    const supabase = createClientComponentClient()

    const [formState, setFormState] = useState<{
        email: string
        password: string
    }>({
        email: '',
        password: ''
    })

    const signIn = async () => {
        const { email, password } = formState
        console.log('sign-in', email, password);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        return error
    }

    const signUp = async () => {
        const { email, password } = formState
        console.log('sign-up', email, password);
        const { error, data } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${location.origin}/api/auth/callback` }
        })

        if (!error && !data.session)
            console.log('Check your inbox to confirm your email address!')
        toast.success('Check your inbox to confirm your email address!')
        return error
    }

    const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        setIsLoading(true)

        const error = action === 'sign-in' ? await signIn() : await signUp()

        if (error) {
            setIsLoading(false);
            setError(error.message);
            console.log(error.message)
            toast.error(error.message)
            formState.password = '';
            return
        }

        setIsLoading(false)
        router.refresh()
    }

    return (
        <div className='bg-base-100 border-2 border-base-200 p-10' {...props}>
            {/* <Toaster /> */}

            <form onSubmit={handleOnSubmit}>

                {hasError ?
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{hasError}</span>
                    </div>
                    : ''}


                <fieldset className="flex flex-col gap-y-4 items-center">

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email:</span>
                        </label>
                        <input name="email" type="text" placeholder="Type here" className="input input-bordered w-full" value={formState.email} onChange={e => {
                            setError('')
                            setFormState(prev => ({
                                ...prev,
                                email: e.target.value
                            }))
                        }
                        } />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password:</span>
                        </label>
                        <input name="password" type="password" placeholder="Type here" className="input input-bordered w-full" value={formState.password} onChange={e => {
                            setError('')
                            setFormState(prev => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }
                        } />
                    </div>

                    {/* <div className="flex flex-col gap-y-1">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={formState.password}
                            onChange={e =>
                                setFormState(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))
                            }
                        />
                    </div> */}
                </fieldset>

                <div className='mt-4 flex flex-row justify-center'>
                    <LoginButton>  {action === 'sign-in' ? 'Sign in' : 'Sign up'} </LoginButton>
                </div>

                <div className="divider"></div>

                {/* <div className='mt-4 flex flex-row justify-center'> 
                    
                    <button> GOOGLE </button>
                </div> */}

                <div className="mt-2 flex flex-row justify-center">


                    {/* <button> Submit button i guess lmao </button> */}
                    {/* <Button disabled={isLoading}>
                        {isLoading && <IconSpinner className="mr-2 animate-spin" />}
                        {action === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    </Button> */}
                    <p className="ml-4">
                        {action === 'sign-in' ? (
                            <>
                                Don&apos;t have an account?{' '}
                                <Link href="/sign-up" className="font-medium underline">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <Link href="/sign-in" className="font-medium underline">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </form>
        </div>
    )
}