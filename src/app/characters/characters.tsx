

'use client';

import { cookies } from 'next/headers'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types'
// import { useTheme } from '../../theme-provider';
import { useEffect } from 'react';


export default function Characters({ characters }: any) {

    return (
        <div>
            <div className="overflow-x-auto " >
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Profession</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters ? <> </> : <> No characters available </>}
                        {characters.map((item:any, key:any) => {
                            return (
                                <tr key={item.key} >
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            {/* <div className="avatar border-2">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    {item.image ?
                                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                        </svg>
                                                    }
                                                </div>
                                            </div> */}
                                            <div>
                                                <div className="font-bold">{item.name} </div>
                                                <div className="text-sm opacity-50"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{item.profession} </div>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
