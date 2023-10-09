
"use client"

import { useEffect, useState } from 'react';
import ThemeButtons from '../themebuttons/themebuttons';
import { FaRebel, FaEmpire, FaUserAlt, FaSkullCrossbones, FaSpider, FaUserAstronaut } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from '../../theme-provider';

type Themes = "rebel" | "light" | "imperial" | "dark";

import { cookies } from 'next/headers';
import { Session } from '@supabase/supabase-js';


export default function Navbar({ session }: { session: Session | null }) {
    const { theme, setTheme } = useTheme();

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost text-sm lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li className='mb-2'>
                            <Link href="/tools" className='text-lg'> Tools </Link>
                        </li>

                        {/* <span> {session?.user ? <> Logged in </> : <> Logged out </>} </span> */}

                        {/* <li>
                            <a>PvP</a>
                            <ul className="p-2">
                            <li> <Link href="/pvp/timers" > Invasion Timers </Link> </li>
                            <li> <Link href="/pvp/gcw" > GCW Calculator </Link> </li>
                            </ul>
                        </li> */}
                        {/* <li>
                            <a className="disabled">PvE</a>
                            <ul className="p-2">
                            </ul>
                        </li> */}

                        {/* <li>
                            <span>
                               
                            </span>
                        </li> */}
                        <ThemeButtons />
                    </ul>

                </div>
                <Link href="/" className="text-primary">
                    <div className="btn btn-ghost text-md lg:text-lg">
                        {theme === 'rebel' || theme === 'light' ?
                            <FaRebel className="text-3xl text-secondary icon" />
                            : <> </>
                        }
                        {theme === 'imperial' || theme === 'dark' ?
                            <FaEmpire className="text-3xl text-secondary icon" />
                            : <> </>
                        }
                        SWG Tools
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">

                <Link href="/tools">
                    <div className="btn m-1"> Tools </div>
                </Link>
                {/* <span> {session?.user ? <> Logged in </> : <> Logged out </>} </span> */}

                {/* <div className="btn m-1">
                    <Link href="/characters"> Characters? </Link>
                </div> */}

                {/* <div className="dropdown">
                    <label tabIndex={0} className="btn m-1"> <FaUserAstronaut className="h-5 w-5" /> Character  </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li>
                            <Link href="/character/expertise" className="disabled" > Expertise Calculator </Link>
                        </li>
                        <li>
                            <Link href="/character/buff" className="disabled" > Buffs & Consumables </Link>
                        </li>
                    </ul>
                </div> */}

                {/* <div className="dropdown">
                    <label tabIndex={0} className="btn m-1"> <FaSkullCrossbones className="h-5 w-5" /> PvP  </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li>
                            <Link href="/pvp/timers" className="disabled" > Invasion Timers </Link>
                        </li>
                        <li>
                            <Link href="/pvp/gcw" className="" > Gcw Calculator </Link>
                        </li>
                    </ul>
                </div> */}

                {/* <div className="dropdown " >
                    <label tabIndex={0} className="btn m-1 disabled:opacity-75"> <FaSpider className="h-5 w-5" /> PvE  </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li>
                            <Link href="/pve" className="disabled" > Group comp </Link>
                        </li>
                        <li>
                            <Link href="/pve" className="disabled" > Heroic map </Link>
                        </li>
                    </ul>
                </div> */}
            </div>


            <div className="navbar-end hidden lg:flex">

                {session?.user ?
                    <div className="dropdown dropdown-end mr-2">
                        <label tabIndex={0} className="btn btn-circle avatar">
                            <div className="w-10 rounded-full icon">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </label>

                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ">
                            <li>
                                <a className="justify-between opacity-20">
                                    Profile
                                    {/* <span className="badge">New</span> */}
                                </a>
                            </li>
                            <li><a className='opacity-20'>Settings</a></li>
                            <li><a className="" >Logout</a></li>
                        </ul>

                    </div>
                    :
                    <div className="">
                        <Link href="/sign-in">
                            <button className="btn mr-2"> Sign in </button>
                        </Link>
                        <label tabIndex={0} className="btn btn-circle mr-5">

                            <div className="flex flex-col justify-center items-center w-10 rounded-full text-center">
                                <FaUserAlt />

                            </div>
                        </label>
                    </div>
                }

                <ThemeButtons />

            </div>
            <div className="navbar-end lg:hidden">
                {session?.user ?
                    <div className="dropdown dropdown-end mr-2">
                        <label tabIndex={0} className="btn btn-circle avatar">
                            <div className="w-10 rounded-full icon">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </label>

                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ">
                            <li>
                                <a className="justify-between opacity-20">
                                    Profile
                                    {/* <span className="badge">New</span> */}
                                </a>
                            </li>
                            <li><a className='opacity-20'>Settings</a></li>
                            <li><a className="" >Logout</a></li>
                        </ul>

                    </div>
                    :
                    <div className="">
                        <Link href="/sign-in">
                            <button className="btn mr-2"> Sign in </button>
                        </Link>
                        <label tabIndex={0} className="btn btn-circle mr-5">

                            <div className="flex flex-col justify-center items-center w-10 rounded-full text-center">
                                <FaUserAlt />

                            </div>
                        </label>
                    </div>
                }

                {/* <div className="dropdown dropdown-end mr-2">
                    <label tabIndex={0} className="btn btn-circle avatar">
                        <div className="w-10 rounded-full icon">
                            <FaUserAlt />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div> */}

            </div>


        </div >

    )
}
