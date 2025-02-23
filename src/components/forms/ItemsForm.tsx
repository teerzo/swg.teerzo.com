'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
// import { type User } from '@supabase/supabase-js'
import { Database, Tables, Enums } from "@/types/supabase.ts";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';

import { useRouter, redirect } from 'next/navigation';

// Form components
// import DatePicker from '@/components/shared/DatePicker'
// import InputToggle from '@/components/shared/InputToggle';
// import SelectHCP from '@/components/shared/SelectHcp';
// import InputFilePicker from '@/components/shared/InputFilePicker';

const table_singular = 'Item';
const TABLE_NAME = 'items';
const redirect_route = '/items';
type Items = Tables<'items'>


export default function ManufacturersForm({ id }: { id: string | null }) {
    const router = useRouter();

    const supabase = createClient()
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    // const [address, setAddress] = useState<string | null>(null);
    // const [logo_url, setLogoUrl] = useState<string | null>(null);

    const [item, setData] = useState<Items | null>(null);

    const getData = useCallback(async () => {
        if (!id) {
            setLoading(false);
            return null;
        }

        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from(TABLE_NAME)
                .select('*')
                .eq('id', id)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                console.log(`fetching ${TABLE_NAME}`, data);
                setName(data?.name);
                setDescription(data?.description);
                setAddress(data?.address);
            }
        } catch (error) {
            alert(`Error fetching ${TABLE_NAME} data!`)
        } finally {
            setLoading(false)
        }
    }, [id, supabase])

    useEffect(() => {
        getData();
    }, [id, getData])

    async function updateData({
        name,
        description,
        address,
    }: {
        name: string | null,
        description: string | null,
        address: string | null,
    }) {
        try {
            setLoading(true);
            if (!id) {
                throw Error(`${TABLE_NAME} id not found`);
            }

            const { error } = await supabase.from(TABLE_NAME).upsert({
                id: id,
                name,
                description,
                address,
                // updated_at: new Date().toISOString(),
            })
            if (error) throw error

            alert(`${TABLE_NAME} ${id} updated`)

            return true;
        } catch (error) {
            console.log(`${TABLE_NAME} ${id} error updating`, error);
            alert(`${TABLE_NAME} ${id} error updating`)
        } finally {
            setLoading(false)
        }
    }

    async function addData({
        name,
        description,
        address,
    }: {
        name: string | null,
        description: string | null,
        address: string | null,
    }) {
        try {
            setLoading(true);

            const { error } = await supabase.from(TABLE_NAME).insert({
                name,
                description,
                // updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert(`${TABLE_NAME} new row added`)
            return true;
            // redirect(redirect_route);
        } catch (error) {
            alert(`${TABLE_NAME} error adding new row`)
        } finally {
            setLoading(false)
        }
    }

    function handleSubmit() {
        if (id) {
            updateData({
                name,
                description,
                address,
            })
        } else {
            addData({
                name,
                description,
                address,
            })
        }
    }

    return (
        <div className="flex justify-center p-5">
            <form className='w-full border rounded bg-white p-5'>
                <div className="w-full space-y-4">
                    <div className="border-b border-gray-900/10 pb-5">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">{id !== null ? 'Edit' : 'New'} {table_singular} <span className="text-xs"> ({id}) </span></h2>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                {table_singular} name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={name || ''}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    id="description"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={description || ''}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={address || ''}
                                    onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* <div className="sm:col-span-3">
                            <InputFilePicker />
                        </div> */}

                        <div className="sm:col-span-3">
                            <label htmlFor="logo" className="block text-sm font-medium leading-6 text-gray-900">
                                Banner
                            </label>
                            <div className="col-span-full flex items-center gap-x-8">
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                />
                                <div>
                                    <button
                                        type="button"
                                        className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 shadow-sm hover:bg-white/20"
                                    >
                                        Change avatar
                                    </button>
                                    <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 mb-20">
                    <Link href={`${redirect_route}/${id}`}>
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                    </Link>

                    <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Loading ...' : 'Save'}
                    </button>
                </div>
            </form >
        </div>
    )
}
