

"use client";

import { createContext, useContext, useEffect, useState } from "react";


// import supabase from "../../supabase";

// export const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(false);

//     const onAuthStateChange = async () => {
//         try {
//             const { data: { user } } = await supabase.auth.getUser();
//             if( user ) {
//                 setUser(user);
//             }
//         }
//         catch(error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         onAuthStateChange();
//     },[])

//     return <AuthContext.Provider value={{user}}> {children} </AuthContext.Provider>
// }

// export const useAuthContext = () => {
//     const { user, logOut } = useContext(AuthContext);   
//     return { user, logOut};
// }