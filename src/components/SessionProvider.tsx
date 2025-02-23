'use client';

import { createClient } from "../utils/supabase/client";
import { useState, useEffect, createContext } from "react";
import { type Session } from '@supabase/supabase-js'
import { jwtDecode, JwtPayload } from 'jwt-decode'

// import { Enums } from "../types/supabase";

// type Roles = Enums<'app_role'>;
// type UserRole = Roles | null | undefined;
// type ClinicId = string | null | undefined;

// interface JWTRole extends JwtPayload {
//     // user_role: Roles | null
//     // clinic_id: string | null
// }

export type SessionValue = {
    session: Session | null,
    // userRole: UserRole,
    // clinicId: ClinicId
}

export const SessionContext = createContext<SessionValue | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const [session, setSession] = useState<Session | null>(null)
    // const [userRole, setUserRole] = useState<UserRole>(null);
    // const [clinicId, setClinicId] = useState<ClinicId>(null);

    const decodeJWT = async (session: Session | null) => {
        if (session) {
            const jwt = jwtDecode<JWTRole>(session.access_token)
            // console.log('jwt', jwt);
            let decoded: JWTRole = {};
            // let decoded: JWTRole = {
            //     user_role: null,
            //     clinic_id: null,
            // }
            // if (jwt) {
            //     decoded.user_role = jwt?.user_role ? jwt.user_role : null;
            //     decoded.clinic_id = jwt?.clinic_id ? jwt.clinic_id : null;
            // }
            return decoded;
        }
    }

    useEffect(() => {
        // BUG HERE - SIGNED_OUT is never called when user is logged out via supabase.auth.signOut()
        // https://github.com/supabase/auth-js/pull/854

        const subscription = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                console.log('event', event, newSession, session);
                setTimeout(async () => {
                    console.log('event async', event, newSession, session);
                    
                    // $$$ compare session to user here
                    const { data: { user } } = await supabase.auth.getUser();
                    console.log('user', event, user);

                    // if (!user) {
                    //     // console.log('session is invalid yeet and delete it');
                    //     // session = null;
                    //     // setSession(null);
                    //     // setUserRole(null);
                    //     // setClinicId(null);
                    // }

                    // if (event === 'INITIAL_SESSION') {

                    // }
                    // else if (event === 'SIGNED_OUT') {
                    //     setSession(null)
                    // } else if (newSession) {
                    //     setSession(newSession)
                    // }

                    if (newSession !== null) {
                        // console.log('session', session);
                        const decoded = await decodeJWT(newSession);
                        // console.log('decoded', decoded);

                        // setUserRole(decoded?.user_role);
                        // setClinicId(decoded?.clinic_id);
                    }
                }, 0);

                // if (event === 'INITIAL_SESSION' && !user ) {
                //     setSession(null)
                // } 

            })

        return () => {
            // $$$ unsubscribe doesnt exist?
            // if (subscription?.unsubscribe) {
            //     subscription?.unsubscribe()
            // }
        }
    }, [supabase.auth])


    return (
        <SessionContext.Provider value={{ session: session }}>
        {/* <SessionContext.Provider value={{ session: session, userRole: userRole, clinicId: clinicId }}> */}
            {/* <SessionContext.Provider value={session}> */}
            {children}
        </SessionContext.Provider>
    );
}