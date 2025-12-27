'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link';

type Option = { id: string, name: string, group: string, description: string, points: number, max: number, per: number, stats: number, statsText: string, checked: boolean }

const defaultOptions = [
    { id: 'agility', name: 'Agility', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Agility attribute', checked: false },
    { id: 'Constitution', name: 'Constitution', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Constitution attribute', checked: false },
    { id: 'Luck', name: 'Luck', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Luck attribute', checked: false },
    { id: 'Precision', name: 'Precision', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Precision attribute', checked: false },
    { id: 'Stamina', name: 'Stamina', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Stamina attribute', checked: false },
    { id: 'Strength', name: 'Strength', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Strength attribute', checked: false },

    { id: 'acr', name: 'Action Cost Reduction', group: 'combat', description: 'blah', points: 5, max: 1, per: 5, stats: 0, statsText: '9% reduction to all action costs', checked: false },
    { id: 'crit', name: 'Critical Hit', group: 'combat', description: 'blah', points: 5, max: 1, per: 5, stats: 0, statsText: '7% bonus to critical hit chance', checked: false },
    { id: 'chr', name: 'Critical Hit Defense', group: 'combat', description: 'blah', points: 5, max: 1, per: 5, stats: 0, statsText: '7% bonus to critical hit defense', checked: false },
    { id: 'glancing', name: 'Glancing Blow', group: 'combat', description: 'blah', points: 5, max: 1, per: 5, stats: 0, statsText: '7% bonus to glancing blow chance', checked: false },

    { id: 'flush', name: 'Flush With Success', group: 'misc', description: 'blah', points: 2, max: 10, per: 2, stats: 1.5, statsText: '% increase experience earned', checked: false },
    { id: 'harvest', name: 'Harvest Faire', group: 'misc', description: 'blah', points: 2, max: 10, per: 2, stats: 0.5, statsText: '% increase to resources gathered with harvesters', checked: false },
    { id: 'healer', name: 'Healer', group: 'misc', description: 'blah', points: 2, max: 10, per: 2, stats: 1.5, statsText: '% increase the strength of your healing abilities', checked: false },
    { id: 'resil', name: 'Resilience', group: 'misc', description: 'blah', points: 2, max: 10, per: 2, stats: 1, statsText: '% damage reduction of damage over time effects', checked: false },
    { id: 'flow', name: 'Go With The Flow', group: 'misc', description: 'blah', points: 2, max: 10, per: 2, stats: 2.5, statsText: '% increase to all movement rates', checked: false },
    { id: 'chance', name: 'Second Chance', group: 'misc', description: 'blah', points: 2, max: 10, per: 2, stats: 3, statsText: '% chance to automatically heal when struck in combat', checked: false },
    { id: 'camodetect', name: 'Camouflauge Detection', group: 'misc', description: 'blah', points: 1, max: 5, per: 1, stats: 20, statsText: '+ increase in Camouflage Detection', checked: false },

    { id: 'elemental', name: 'Elemental', group: 'resistances', description: 'blah', points: 1, max: 5, per: 1, stats: 750, statsText: '+ Elemental protection', checked: false },
    { id: 'energy', name: 'Energy', group: 'resistances', description: 'blah', points: 1, max: 5, per: 1, stats: 750, statsText: '+ Kinetic protection', checked: false },
    { id: 'kinetic', name: 'Kinetic', group: 'resistances', description: 'blah', points: 1, max: 5, per: 1, stats: 750, statsText: '+ Energy protection', checked: false },

    { id: 'assembly', name: 'Crafting Assembly', group: 'trade', description: 'blah', points: 2, max: 10, per: 2, stats: 1, statsText: '+ increase to Assembly and Experience gains for all crafting', checked: false },
    { id: 'amazing', name: 'Amazing Success Chance', group: 'trade', description: 'blah', points: 5, max: 10, per: 5, stats: 0.4, statsText: '% bonus to Amazing Success crafting results', checked: false },
    { id: 'sampling', name: 'Hand Sampling', group: 'trade', description: 'blah', points: 2, max: 10, per: 2, stats: 2, statsText: '% increase to resources gathered via hand sampling', checked: false },
    { id: 'reverse', name: 'Reverse Engineering Efficiency', group: 'trade', description: 'blah', points: 5, max: 10, per: 5, stats: 4, statsText: '+ increase in Reverse Engineering Efficiency', checked: false },
]




export default function EntBuff() {

    const [loaded, setLoaded] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()


    const maxPoints = 20;
    const [points, setPoints] = useState(0);
    const [message, setMessage] = useState('');

    const [name, setName] = useState('');

    const [options, setOptions] = useState<Option[]>(defaultOptions);

    const [saved, setSaved] = useState<any[]>([
        {
            name: 'Test1',
            url: '010203040506000000000000000000000000000000000000',
        },
        {
            name: 'Test2',
            url: '010000000000000000000000000000000000000000000000'
        }
    ]);

    useEffect(() => {
        console.log('update options', loaded, options);
        if (loaded) {
            if (options.length > 0) {
                updateQuery();
                updateMessage();
            }
            else {
                setOptions(defaultOptions);
                updateQuery();
                updateMessage();
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options])

    useEffect(() => {
        console.log('load router', pathname, searchParams);
        // handleReset();
        // loadQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams])

    useEffect(() => {
        console.log('load', pathname, searchParams);
        loadQuery();
        setLoaded(true);
    }, [])

    function loadSaved(item: string) {
        handleReset();
        console.log('location', window.location);
        window.location.href = `${window.location.origin}/tools/ent-buff?code=${item}`;
    }

    function getSaved() {
        let _saved = localStorage.getItem('swg.teerzo.com-entbuff');
        if (_saved) {
            return JSON.parse(_saved);
        }
        return [];
    }

    function saveLocal(item: any) {
        let _saved = getSaved();
        _saved.push(item);
        localStorage.setItem('swg.teerzo.com-entbuff', JSON.stringify(saved));
    }

    function loadQuery() {
        let _options = [...options];

        let code = searchParams.get('code');
        console.log('code', code);
        for (let i = 0; i < options.length; i++) {
            const index = (i * 2);
            const slice = code?.substring(index, index + 2);
            const points = Number(slice);

            console.log('slice', index, slice, points);

            if (points > 0) {
                _options[i].checked = true;
                _options[i].points = points;
            }
        }
        _options = calculatePoints(_options);


        setOptions(_options);
    }

    function updateQuery() {
        console.log('updateQuery', options);
        const params = new URLSearchParams()

        let code = '';
        for (let i in options) {
            if (options[i].checked && options[i].points > 0) {
                code += options[i].points < 10 ? '0' + options[i].points : options[i].points;
                // params.set(options[i].id, options[i].points.toString());
            }
            else {
                code += '00';
            }
        }
        // console.log('qs', params.toString());
        console.log('code', code);
        params.set('code', code);
        router.push(`/?${params.toString()}`);

        window.history.pushState({}, '', `?${params.toString()}`);
    }

    function clearQuery() {
        console.log('clearQuery');
        // debugger;
        const params = new URLSearchParams()

        let code = '';
        for (let i in options) {
            code += '00';
        }
        console.log('clear code', code);
        params.set('code', code);
        router.push(`/?${params.toString()}`);
        // router.push(`/?${params.toString()}`, undefined, { shallow: true });
        window.history.pushState({}, '', `?${params.toString()}`);
    }

    function updateMessage() {
        console.log('updateMessage start', message);
        let _message = '';
        for (let i in options) {
            if (options[i].checked && options[i].points > 0) {
                _message += `${options[i].name} ${options[i].points},`;
            }
        }
        console.log('updateMessage end', message);
        setMessage(_message);
    }

    function calculatePoints(newOptions: Option[]) {
        console.log('calculatePoints');

        let _options = [...newOptions];
        let _points = 0;
        for (let i = 0; i < _options.length; i++) {
            if (_options[i].checked) {
                _points += _options[i].points;
            }
        }

        setPoints(_points);
        return _options;
    }

    function getOption(id: string) {

        for (let i in options) {
            if (options[i].id === id) {
                return options[i];
            }
        }
        return null;
    }


    function handleChange(event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement },) {
        const { target } = event

        // const target = event?.target;
        // console.log('handleChange', target?.id);

        let _options = [...options];

        for (let i = 0; i < _options.length; i++) {
            if (_options[i].id === target.id) {
                _options[i].checked = !_options[i].checked;
            }
        }

        _options = calculatePoints(_options);
        setOptions(_options);
    }

    function handleIncrement(event: React.MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement },) {
        const { target } = event

        console.log('handleIncrement', event.target);

        let _options = [...options];

        for (let i = 0; i < _options.length; i++) {
            if (_options[i].id === target.name) {
                if (_options[i].max > _options[i].points) {
                    _options[i].points += _options[i].per;
                }
            }
        }
        _options = calculatePoints(_options);
        setOptions(_options);
    }
    function handleDecrement(event: React.MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement },) {
        const { target } = event

        console.log('handleDecrement', event.target);

        let _options = [...options];

        for (let i = 0; i < _options.length; i++) {
            if (_options[i].id === target.name) {
                if (_options[i].points > 0) {
                    _options[i].points -= _options[i].per;
                }
            }
        }
        _options = calculatePoints(_options);
        setOptions(_options);
    }

    function handleReset() {
        console.log('handleReset'); 
        setLoaded(false);

        let _options = [...options];
        for (let i = 0; i < _options.length; i++) {
            _options[i].checked = false;
            // _options[i].points = 0;
        }
        setOptions(_options);
        setPoints(0);
        

        // setOptions([...defaultOptions]);
        // setOptions([]);
        clearQuery();
        setLoaded(true);
    }


    return (

        <div className="flex flex-col w-full items-center">
            <div className="flex flex-row w-full justify-center gap-1 mb-2">
                <div className="flex flex-row bg-sky-300 rounded-lg border border-sky-300 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className='text-xs md:text-sm'> Assuming the entertainer&apos;s expertise is fully specced for buffing at level 90</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row flex-grow w-full  justify-center gap-1 mb-2">
                <div className="flex flex-col w-full md:w-1/2 gap-1">
                    <Saved saved={saved} loadSaved={loadSaved} />
                </div>
                <div className="flex flex-col w-full gap-1">
                    <Points message={message} points={points} maxPoints={maxPoints} options={options} handleChange={handleChange} />
                </div>
                <div className="flex flex-col w-full md:w-1/2 gap-1">
                    <Summary name={name} message={message} points={points} maxPoints={maxPoints} options={options} handleReset={handleReset} handleDecrement={handleDecrement} handleIncrement={handleIncrement} saveLocal={saveLocal} />
                </div>
            </div>

        </div >
    )
}



function Saved({ saved, loadSaved }: { saved: any[], loadSaved: (item: string) => void }) {
    const [savedBuffs, setSavedBuffs] = useState<any[]>(saved);

    const handleDelete = (index: number) => {
        const newSavedBuffs = [...savedBuffs];
        newSavedBuffs.splice(index, 1);
        setSavedBuffs(newSavedBuffs);
        localStorage.setItem('swg.teerzo.com-entbuff', JSON.stringify(newSavedBuffs));
    };

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
    };

    return (
        <div className='flex flex-col w-full h-auto h-full'>
            <div className='w-full flex flex-col flex-grow border border-gray-300 dark:border-gray-600 rounded h-full p-2 bg-white dark:bg-gray-800'>
                <h3 className='text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200'>Saved Buffs</h3>
                {savedBuffs.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-300 py-4">No saved buffs</div>
                ) : (
                    <ul className="space-y-2">
                        {savedBuffs.map((item, index) => (
                            <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                <button 
                                    className="flex-grow text-left truncate mr-2 text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white" 
                                    onClick={() => loadSaved(item?.url)}
                                    title={item?.name}
                                >
                                    {item?.name}
                                </button>
                                <div className="flex space-x-1">
                                    <button 
                                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                                        onClick={() => handleCopy(item?.url)}
                                        title="Copy buff code"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                    </button>
                                    <button 
                                        className="p-1.5 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                                        onClick={() => handleDelete(index)}
                                        title="Delete buff"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

function Points({ message, points, maxPoints, options, handleChange }: { message: string, points: number, maxPoints: number, options: any[], handleChange: (event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement }) => void }) {

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row flex-grow'>
                {/* Removed the entertainer message div from here */}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <div className='flex flex-row gap-1 w-full'>

                    <div className="border border-gray-700 dark:border-gray-600 rounded w-full">
                        <h3 className='bg-base-200 text-center font-bold'> Attributes </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return (
                                    <div key={key} className='flex flex-row gap-2'>
                                        {item?.group === 'attributes' ?
                                            <PointCheckbox item={item} handleChange={handleChange} />
                                            :
                                            <> </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="border border-gray-700 dark:border-gray-600 rounded w-full">
                        <h3 className='bg-base-200 text-center font-bold'> Combat </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return (
                                    <div key={key} className='flex flex-row gap-2'>
                                        {item?.group === 'combat' ?
                                            <PointCheckbox item={item} handleChange={handleChange} />
                                            :
                                            <> </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="border border-gray-700 dark:border-gray-600 rounded w-full">
                        <h3 className='bg-base-200 text-center font-bold'> Resistances </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return (
                                    <div key={key} className='flex flex-row gap-2'>
                                        {item?.group === 'resistances' ?
                                            <PointCheckbox item={item} handleChange={handleChange} />
                                            :
                                            <> </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                </div>

                <div className='flex flex-row gap-1 w-full'>

                    <div className="border border-gray-700 dark:border-gray-600 rounded w-full">
                        <h3 className='bg-base-200 text-center font-bold'> Misc </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return (
                                    <div key={key} className='flex flex-row gap-2'>
                                        {item?.group === 'misc' ?
                                            <PointCheckbox item={item} handleChange={handleChange} />
                                            :
                                            <> </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>



                    <div className="border border-gray-700 dark:border-gray-600 rounded w-full">
                        <h3 className='bg-base-200 text-center font-bold'> Trade </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return (
                                    <div key={key} className='flex flex-row gap-2'>
                                        {item?.group === 'trade' ?
                                            <PointCheckbox item={item} handleChange={handleChange} />
                                            :
                                            <> </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className={`border border-gray-700 dark:border-gray-600 rounded ${points > maxPoints ? '' : ''}`}>
                    <h3 className={` text-center font-bold ${points > maxPoints ? 'text-error' : 'bg-base-200'}`}> Summary </h3>
                    <div className={`flex flex-col p-2`}>
                        {options.map((item, key) => {
                            return item.checked && item.points > 0 ? (
                                <div key={key} className="flex flex-col mb-2">
                                    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-1`}>
                                        <span className='text-sm min-w-1/3 w-1/3'>  <b> {item.name} </b></span>
                                        <span className='text-sm'> {item.stats > 0 ? item.stats * item.points : ''}{item.statsText} </span>
                                    </div>
                                </div>
                            ) : <div key={key}> </div>
                        })}
                        {points <= 0 ?
                            <div className='flex-grow text-center'>
                                <span className=''> Nothing selected </span>
                            </div>
                            :
                            <> </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function Summary({ name, message, points, maxPoints, options, handleReset, handleDecrement, handleIncrement, saveLocal }: { name: string, message: string, points: number, maxPoints: number, options: any[], handleReset: () => void, handleDecrement: (event: React.MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement }) => void, handleIncrement: (event: React.MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement }) => void, saveLocal: (item: any) => void }) {
    return (
        <div className='flex flex-col gap-1'>

            {/* <div className="w-full min-h-28 p-2 border border-gray-700 dark:border-gray-600 rounded">
                <label htmlFor="name"> Name: </label>
                <div className="flex flex-row w-full">
                    <input id="name" className="w-full input border border-gray-700 dark:border-gray-600 p-2" placeholder="name" value={name} onChange={() => { }} />
                    <button className="border border-gray-700 dark:border-gray-600 p-2" onClick={() => { navigator.clipboard.writeText(name) }}> Save </button>
                </div>
            </div> */}

           

            <div className="w-full min-h-28 p-2 border border-gray-700 dark:border-gray-600 rounded">
                <h3 className='bg-base-200 text-center font-bold'> Available Points </h3>
                <div className={`flex flex-row p-2 `}>
                    <div className={`flex flex-col`}>
                        <span className={`${points > 20 ? 'text-red-500' : 'text-green-500'}`}> <b> {points} / {maxPoints} </b></span>
                        <span className={`${points > 20 ? 'text-red-500 opacity-100' : 'opacity-0'}`}> Too many points </span>
                    </div>
                    <div className='flex-grow'> </div>
                    <button className='border border-gray-700 dark:border-gray-600 rounded p-2' onClick={handleReset}> Reset </button>
                </div>
            </div>

            <div className='flex-grow rounded border border-gray-700 dark:border-gray-600 p-2 overflow-auto'>
                {options.map((item, key) => {
                    return item.checked ? (
                        <div key={key} className="flex flex-col mb-2">
                            <div className={`flex flex-row items-center gap-1`}>
                                <span className={`${item.points > 0 ? '' : 'opacity-50'} w-6`}> <b> {item.points} </b></span>
                                <span className={`${item.points > 0 ? '' : 'opacity-50'}`}> {item.name} </span>
                                <div className='flex-grow'> </div>
                                {/* <button name={item.id} className={`btn min-h-0 w-8 h-8 ${item.points > 0 ? '' : 'opacity-20'} `} onClick={handleDecrement}> - </button> */}

                                {/* <button name={item.id} className={`border min-h-0 w-8 h-8 ${item.points < item.max ? '' : 'opacity-20'}`} onClick={handleIncrement}> + </button> */}

                                <button name={item.id} type="button"
                                    className={`w-8 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${item.points > 0 ? '' : 'opacity-20'} `}
                                    onClick={handleDecrement}>
                                    - </button>

                                <button name={item.id} type="button"
                                    className={`w-8 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${item.points < item.max ? '' : 'opacity-20'}`}
                                    onClick={handleIncrement}>
                                    + </button>
                            </div>
                        </div>
                    ) : <div key={key}> </div>
                })}
                {points <= 0 ?
                    <div className='flex-grow text-center'>
                        <span className=''> Nothing selected </span>
                    </div>
                    :
                    <> </>
                }


            </div>

             <div className="w-full min-h-28 p-2 border border-gray-700 dark:border-gray-600 rounded">
                <span className='font-bold'> Entertainer message: </span>
                <div className="flex flex-row w-full">
                    <input className="w-full input border border-gray-700 dark:border-gray-600 p-2" placeholder="Search" value={message} onChange={() => { }} />
                    <div className="indicator">
                        <button className="border border-gray-700 dark:border-gray-600 p-2" onClick={() => { navigator.clipboard.writeText(message) }}> Copy </button>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </div>
    )
}


function PointCheckbox({ item, handleChange }: { item: { id: string, name: string, checked: boolean, per: number, max: number }, handleChange: (event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement }) => void }) {
    return (
        <>
            <input id={item.id} type="checkbox" onChange={handleChange} checked={item.checked} />
            <label htmlFor={item.id} className='text-sm'> {item.name} </label>
            <div className='flex-grow'> </div>
            <span className='whitespace-nowrap'>{item?.per} {`${item.max > 1 ? '- ' + item.max : ''}`} </span>
        </>
    )
}