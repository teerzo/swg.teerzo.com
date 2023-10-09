'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FaRebel, FaEmpire, FaUserAlt, FaSkullCrossbones, FaSpider, FaUserAstronaut } from "react-icons/fa";

// import { cn } from '@/lib/utils'
// import { Button, type ButtonProps } from '@/components/ui/button'
// import { IconGitHub, IconSpinner } from '@/components/ui/icons'

// interface LoginButtonProps extends ButtonProps {
interface LoginButtonProps {
  showGithubIcon?: boolean
  text?: string,
  children: React.ReactNode
}

export function LoginButton({
  text = 'Login with GitHub',
  showGithubIcon = true,
  children,
  // className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  return (
    <button className='btn'>
      {isLoading ?
        <div className="flex flex-col justify-center items-center w-10 rounded-full text-center">
          <FaUserAlt />
        </div>
        :
        <> {children}</>
      }
    </button>
    // <Button
    //   variant="outline"
    //   onClick={async () => {
    //     setIsLoading(true)
    //     await supabase.auth.signInWithOAuth({
    //       provider: 'github',
    //       options: { redirectTo: `${location.origin}/api/auth/callback` }
    //     })
    //   }}
    //   disabled={isLoading}
    //   className={cn(className)}
    //   {...props}
    // >
    //   {isLoading ? (
    //     <IconSpinner className="mr-2 animate-spin" />
    //   ) : showGithubIcon ? (
    //     <IconGitHub className="mr-2" />
    //   ) : null}
    //   {text}
    // </Button>
  )
}