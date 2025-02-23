'use server'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Toaster } from "react-hot-toast";

import { createClient } from "@/utils/supabase/server";


export default async function Home() {

  const supabase = createClient();
  // const { data: { user } } = await supabase.auth.getUser();


  return (
    <main className="flex flex-1 justify-center w-full p-5">
      <div className="">
        <Link href="/tools"> <button className="btn"> Tools </button> </Link>
      </div>
    </main>
  )
}
