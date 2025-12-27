"use client"

import { useEffect, useState, useContext } from 'react';
import ThemeButtons from '../themebuttons/themebuttons';
import { FaRebel, FaEmpire, FaUserAlt, FaSkullCrossbones, FaSpider, FaUserAstronaut, FaTools, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from '../../theme-provider';
import { usePathname } from 'next/navigation';

type Themes = "rebel" | "light" | "imperial" | "dark";

import { SessionContext } from '@/components/SessionProvider';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    //   { name: 'Home', href: '/', current: false },
    { name: 'Database', href: '/database', current: false },
    { name: 'Tools', href: '/tools', current: false },
    { name: 'Events', href: '/events', current: false },
    // { name: 'Characters', href: '/characters', current: false },
    // { name: 'Ships', href: '/ships', current: false },
    // { name: 'Collections', href: '/collections', current: false },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();

    // Update navigation items based on current path
    const navigationItems = navigation.map(item => ({
        ...item,
        current: pathname === item.href
    }));

    // Function to render the appropriate icon based on the current theme
    const renderThemeIcon = () => {
        switch (theme) {
            case 'rebel':
                return <FaRebel className='text-xl text-red-500' />;
            case 'imperial':
                return <FaEmpire className='text-xl text-blue-500' />;
            case 'light':
                return <FaSun className='text-xl text-yellow-500' />;
            case 'dark':
                return <FaMoon className='text-xl text-gray-300' />;
            default:
                return <FaTools className='text-xl text-blue-500' />;
        }
    };

    return (
        <div className="absolute top-0 left-0 right-0">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <a
                                    href={"/"}
                                    // aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        'bg-gray-900 text-white',
                                        //   'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-sm font-medium',
                                    )}
                                >
                                    <div className='flex flex-row'>
                                        {renderThemeIcon()}
                                        <span className='ml-2'>
                                            SWG TOOLS
                                        </span>
                                    </div>
                                </a>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigationItems.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            <div className="hidden sm:ml-6 sm:flex sm:flex-row sm:items-center">
                                <label className='text-sm font-medium text-gray-300 mr-2'>Server:</label>
                                <select className='bg-gray-700 text-white rounded-md border border-gray-600 py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-600 transition-colors'>
                                    <option>SWG: Live</option>
                                    <option>SWG: Legends</option>
                                    <option disabled>SWG: Beyond</option>
                                    <option disabled>SWG: Restoration</option>
                                </select>
                            </div>

                            {/* Theme Switch */}
                            <div className="hidden sm:ml-4 sm:flex sm:items-center">
                                <div className="flex items-center space-x-2 bg-gray-700 rounded-md p-1">
                                    <button 
                                        onClick={() => setTheme('rebel')}
                                        className={`p-1.5 rounded-md transition-all duration-200 ${
                                            theme === 'rebel' 
                                                ? 'bg-gray-800 text-red-500 shadow-md scale-105' 
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-red-400'
                                        }`}
                                        aria-label="Rebel theme"
                                    >
                                        <FaRebel className="size-4" />
                                    </button>
                                    <button 
                                        onClick={() => setTheme('imperial')}
                                        className={`p-1.5 rounded-md transition-all duration-200 ${
                                            theme === 'imperial' 
                                                ? 'bg-gray-800 text-blue-500 shadow-md scale-105' 
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-blue-400'
                                        }`}
                                        aria-label="Imperial theme"
                                    >
                                        <FaEmpire className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                            </button> */}

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <div className="size-8 rounded-full bg-gray-700 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-gray-300">
                                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <a
                                            href="/account/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Your Profile
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="/account/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Settings
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="/logout"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Sign out
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigationItems.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>

    )
}
