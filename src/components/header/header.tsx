
'use server';

import { auth } from '@/app/auth/auth';
import { cookies } from 'next/headers';
import Navbar from '@/components/navbar/navbar';

export default async function Header() {
    const cookieStore = cookies()
    const session = await auth({ cookieStore })

    return (
        <div>
            <Navbar session={session} />
        </div>
    )
}