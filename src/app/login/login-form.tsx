'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Session } from '@supabase/auth-helpers-nextjs'

export default function LoginForm({ session }: { session: Session | null }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [showSignup, setSignup] = useState(false);

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <button onClick={handleSignOut}>Sign out</button>
  ) : (
    <div className="w-full">

      <div className="flex flex-col mb-5">
        <label className="label"> Email: </label>
        <input
          className="input input-bordered"

          name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>

      <div className="flex flex-col mb-5">
        <label> Password: </label>
        <input
          className="input input-bordered"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="flex flex-row justify-center">
        <button className="btn mr-2" onClick={handleSignUp}>Sign up</button>
        <button className="btn ml-2" onClick={handleSignIn}>Sign in</button>
      </div>

      

    </div>
  )
}