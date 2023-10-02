import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'
import Link from 'next/link'

import { redirect } from "next/navigation";


export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col">

      {session ?
        <div>
          <p> Signed in </p>
          <Link href="/logout"> <button className="btn"> LOG OUT </button> </Link>
        </div>
        :
        <div>
          <p> Not signed in </p>
          <Link href="/login"> <button className="btn"> LOGIN </button> </Link>
        </div>
      }




    </main>
  )
}
