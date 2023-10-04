'use server'

import { auth } from "@/app/auth/auth";

import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { cache } from 'react'

import type { Database } from '@/lib/database.types'


export default async function Home() {

  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session) {
    // redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* {session ?
        <div>
          <p> Signed in </p>
          <Link href="/logout"> <button className="btn"> LOG OUT </button> </Link>
        </div>
        :
        <div>
          <p> Not signed in </p>
          <Link href="/login"> <button className="btn"> LOGIN </button> </Link>
        </div>
      } */}

      <div className="flex flex-col justify-center">
        <p> Tools </p>
        <Link href="/tools"> <button className="btn"> Tools </button> </Link>
      </div>
    </main>
  )
}
