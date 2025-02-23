// 
import { createClient } from "@/utils/supabase/server";
import { useEffect } from "react";
import { headers } from "next/headers";
import { type User, Session } from '@supabase/supabase-js'

import { jwtDecode, JwtPayload } from 'jwt-decode'

interface JWTRole extends JwtPayload {
    user_role: 'admin'
}

export async function useAuth() {
    const supabase = await createClient();
    // let user = null;
    let userRole = null;

    // const [user, setUser] = useState<User | null | undefined>(null);
    // const [userRole, setUserRole] = useState<string | null | undefined>(null);

    const { data: { user } } = await supabase.auth.getUser();

    const decodeJWT = async (session: Session | null) => {
        if (session) {
            const jwt = jwtDecode<JWTRole>(session.access_token)
            console.log('jwt', jwt);
            if (jwt && jwt?.user_role) {
                return jwt.user_role; // custom jwt value
            }
            return null;
        }
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
            // console.log('useAuth user', session?.user);
            // const currentUser = session?.user;
            // user = currentUser;

            const role = await decodeJWT(session);
            userRole = role;
        }
    );

    return { user, userRole }
}