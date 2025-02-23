'use client';

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, createContext } from "react";
import { type Session } from '@supabase/supabase-js'
import { jwtDecode } from 'jwt-decode'

// import { ThemeProvider } from 'acme-theme';
// import { AuthProvider } from 'acme-auth';


export const SessionContext = createContext(null);

export default function Providers({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const [session, setSession] = useState<Session | null>(null)
    const [userRole, setUserRole] = useState<string | null | undefined>(null);

    const decodeJWT = async (session: Session | null) => {
        if (session) {
            const jwt = jwtDecode(session.access_token);
            // console.log('jwt', jwt?.clinic_id, jwt?.user_role);
            if (jwt && jwt?.user_role) {
                return jwt.user_role; // custom jwt value
            }
            return null;
        }
    }

    useEffect(() => {
        // BUG HERE - SIGNED_OUT is never called when user is logged out via supabase.auth.signOut()
        // https://github.com/supabase/auth-js/pull/854


        const subscription = supabase.auth.onAuthStateChange(
            (event, session) => {
                // console.log('event', event, session);
                setTimeout(async () => {

                    const { data: { user } } = await supabase.auth.getUser();
                    // console.log('user', user);

                    if (!user) {
                        // console.log('session is invalid yeet and delete it');
                        session = null;
                        setSession(null)
                        setUserRole(null)
                    }

                    if (event === 'SIGNED_OUT') {
                        setSession(null)
                    } else if (session) {
                        setSession(session)
                    }

                    const role = await decodeJWT(session);
                    setUserRole(role);

                }, 0);


                // if (event === 'INITIAL_SESSION' && !user ) {
                //     setSession(null)
                // } 

            })

        return () => {
            if (subscription?.unsubscribe) {
                subscription?.unsubscribe()
            }
        }
    }, [])

    return (
        <SessionContext.Provider value={{ session: session, userRole: userRole }}>
            {/* <SessionContext.Provider value={session}> */}
            {children}
        </SessionContext.Provider>
    );
}