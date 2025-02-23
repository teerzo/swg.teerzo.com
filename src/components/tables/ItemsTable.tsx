'use client';

import { useState } from "react"
import Link from 'next/link';
import Image from "next/image";
import { Squares2X2Icon, ListBulletIcon, PlusIcon } from '@heroicons/react/20/solid'
import classNames from "classnames";

export default function ItemsTable() {

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');


    const [items, setItems] = useState([
        { id: 1, name: 'Helmet', type: 'armor', slot: 'head' },
        { id: 2, name: 'Rifle', type: 'weapon', slot: 'rifle' },
        { id: 3, name: 'Other', type: 'misc', slot: 'test' }
    ]);

    const categories = [
        { text: 'All', value: '' },
        { text: 'Weapons', value: 'weapons' },
        { text: 'Armor', value: 'armor' },
        { text: 'Misc', value: 'misc' },
    ]

    const subWeapons = [
        { text: 'Rifles', value: "weapons.rifle" },
        { text: 'Carbines', value: "weapons.carbine" },
    ]

    const subArmors = [
        { text: 'Head', value: 'head'},
        { text: 'Chest', value: 'chest'},
    ]

    const onSearchChange = (value) => {
        if (value !== '' && value !== null) {
            setSearch(value);
        }
    }

    const reset = () => {
        setSearch('');
        setCategory('');
    }

    return (
        <div className="flex w-full">
            <TableFilters />
            <Table items={items} search={search} onSearchChange={onSearchChange} reset={reset} />
        </div>
    )
}


function TableFilters() {



    return (
        <div className="border border-r-0 p-2 ">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Category</span>
                </div>
                <select className="select select-sm select-bordered pr-32">
                    <option> All </option>
                    <option>Weapons</option>
                    <option>Armor</option>
                    <option>Misc</option>
                </select>
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Weapon Type</span>
                </div>
                <select className="select select-sm select-bordered">
                    <option> All </option>
                    <option> Ranged</option>
                    <option> Melee </option>
                    <option> Misc </option>
                </select>
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Armor Slot</span>
                </div>
                <select className="select select-sm select-bordered">
                    <option> All </option>
                    <option> Head</option>
                    <option> Chest </option>
                    <option> Misc </option>
                </select>
            </label>

        </div>
    )
}

function Table({ items, search, onSearchChange, reset }: { items: [], search: string, onSearchChange: any, reset: any }) {

    const [isList, setList] = useState(false);


    return (
        <div className="w-full border">
            <div className="flex flex-row justify-center items-center border-b gap-2 p-2">
                <button className="btn" onClick={() => { setList(true) }}>
                    <ListBulletIcon className={classNames('size-6', { 'text-secondary': isList })} />
                </button>
                <button className="btn" onClick={() => { setList(false) }}>
                    <Squares2X2Icon className={classNames('size-6', { 'text-secondary': !isList })} />
                </button>

                <label className="w-full input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" value={search} onChange={(event) => { onSearchChange(event?.target?.value) }} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
                <button className="btn" onClick={reset}>Reset</button>
                <Link href="/items/add">
                    <button className="btn">
                        <PlusIcon className="size-6 " />
                    </button>
                </Link>
            </div>


            <div className="overflow-x-auto ">
                {isList ?

                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className=""> </th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.length > 0 ?
                                items.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="w-16 p-2"> <Image width={50} height={50} src="/images/helmet.png" alt={'A pretty helmet'} /> </td>
                                            <td> {item?.name} </td>
                                            <td> {item?.type} </td>
                                            <td> {item?.slot} </td>
                                        </tr>
                                    )
                                })
                                : null
                            }
                        </tbody>
                    </table>
                    :
                    <div className="flex flex-row gap-5 p-2">
                        {items && items.length > 0 ?
                            items.map((item, key) => {
                                return (
                                    <Link key={key} href={`/items/${item.id}`}>
                                        <div className="border p-5">
                                            <div className="flex flex-col">

                                                <Image width={150} height={150} src="/images/helmet.png" alt={'A pretty helmet'} />
                                                <span> {item.name} </span>
                                                <span> {item.type} </span>
                                                <span> {item.slot} </span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                            : null
                        }
                    </div>
                }
            </div>
        </div >
    )
}