
"use client"

import { useEffect, useState } from 'react';
import ThemeButtons from '../themebuttons/themebuttons';
import { FaRebel, FaEmpire, FaUserAlt, FaSkullCrossbones, FaSpider, FaUserAstronaut } from "react-icons/fa";
import Link from "next/link";

import useTheme from '../../hooks/useTheme';

export default function Navbar() {

    const [theme, setTheme] = useTheme();

    useEffect(() => {
        console.log('navbar', theme);
    }, [theme])

    const handleThemeChange = (arg: string): void => {
        setTheme(arg);
    }

    return (
        <div className="navbar bg-base-100 shadow-xl sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li>
                            <a className="disabled"> Character</a>
                            <ul className="p-2">
                                {/* <li><a>Submenu 1</a></li> */}
                                {/* <li><a>Submenu 2</a></li> */}
                            </ul>
                        </li>
                        <li>
                            <a>PvP</a>
                            <ul className="p-2">
                                <li> <Link href="/pvp/timers" > Invasion Timers </Link> </li>
                                <li> <Link href="/pvp/gcw" > GCW Calculator </Link> </li>
                            </ul>
                        </li>
                        <li>
                            <a className="disabled">PvE</a>
                            <ul className="p-2">
                                {/* <li><a>Submenu 1</a></li> */}
                                {/* <li><a>Submenu 2</a></li> */}
                            </ul>
                        </li>
                        {/* <li><a>Item 3</a></li> */}
                    </ul>
                </div>
                <div className="btn btn-ghost text-lg">
                    {theme === 'rebel' ?
                        <FaRebel className="text-3xl text-secondary icon" />
                        : <> </>
                    }
                    {theme === 'imperial' ?
                        <FaEmpire className="text-3xl text-secondary icon" />
                        : <> </>
                    }
                    <Link href="/" className="text-primary"> SWG Tools</Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">


                <div className="dropdown">
                    <label tabIndex={0} className="btn m-1"> <FaUserAstronaut className="h-5 w-5" /> Character  </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li>
                            <Link href="/character/expertise" className="disabled" > Expertise Calculator </Link>
                        </li>
                        <li>
                            <Link href="/character/buff" className="disabled" > Buffs & Consumables </Link>
                        </li>
                    </ul>
                </div>

                <div className="dropdown">
                    <label tabIndex={0} className="btn m-1"> <FaSkullCrossbones className="h-5 w-5" /> PvP  </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li>
                            <Link href="/pvp/timers" className="disabled" > Invasion Timers </Link>
                        </li>
                        <li>
                            <Link href="/pvp/gcw" className="" > Gcw Calculator </Link>
                        </li>
                    </ul>
                </div>

                <div className="dropdown " >
                    <label tabIndex={0} className="btn m-1 disabled:opacity-75"> <FaSpider className="h-5 w-5" /> PvE  </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li>
                            <Link href="/pve" className="disabled" > Group comp </Link>
                        </li>
                        <li>
                            <Link href="/pve" className="disabled" > Heroic map </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="navbar-end">
                {/* <a className="btn mr-2">Button</a> */}

                <div className="dropdown dropdown-end mr-2">
                    <label tabIndex={0} className="btn btn-circle avatar">
                        <div className="w-10 rounded-full icon">
                            <FaUserAlt />
                            {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
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
                </div>

                <ThemeButtons theme={theme} handleThemeChange={handleThemeChange} />

            </div>
        </div>

    )
}
