


'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'

type Option = { id: string, name: string, group: string, description: string, points: number, max: number, per: number, stats: number, statsText: string, checked: boolean }

export default function EntBuff() {

    const router = useRouter();
    const searchParams = useSearchParams()


    const maxPoints = 20;
    const [points, setPoints] = useState(0);
    const [message, setMessage] = useState('');

    const defaultOptions = [
        { id: 'agility', name: 'Agility', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Agility attribute', checked: false },
        { id: 'Constitution', name: 'Constitution', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Constitution attribute', checked: false },
        { id: 'Luck', name: 'Luck', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Luck attribute', checked: false },
        { id: 'Precision', name: 'Precision', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Precision attribute', checked: false },
        { id: 'Stamina', name: 'Stamina', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Stamina attribute', checked: false },
        { id: 'Strength', name: 'Strength', group: 'attributes', description: 'blah', points: 1, max: 10, per: 1, stats: 30, statsText: '+ to Strength attribute', checked: false },

        { id: 'acr', name: 'Action Cost Reduction', group: 'combat', description: 'blah', points: 5, max: 1, per: 5, stats: 0, statsText: '9% bonus in reducing all action costs', checked: false },
        { id: 'crit', name: 'Critical Hit', group: 'combat', description: 'blah', points: 5, max: 1, per: 5, stats: 0, statsText: '7% bonus to critical hit chance', checked: false },
        { id: 'chr', name: 'Critical Hit Defense', group: 'combat', description: 'blah', points: 5, max: 1, per: 5, stats: 0, statsText: '7% bonus to critical hit defense', checked: false },
        { id: 'glancing', name: 'Glancing Blow', group: 'combat', description: 'blah', points: 5, max: 1, per: 5, stats: 0, statsText: '7% bonus to glancing blow', checked: false },


        { id: 'flush', name: 'Flush With Success', group: 'misc', description: 'blah', points: 2, max: 5, per: 2, stats: 3, statsText: '% increase experience earned', checked: false },
        { id: 'camodetect', name: 'Camouflauge Detection', group: 'misc', description: 'blah', points: 1, max: 5, per: 1, stats: 30, statsText: '', checked: false },

        { id: 'elemental', name: 'Elemental', group: 'resistances', description: 'blah', points: 1, max: 5, per: 1, stats: 30, statsText: '', checked: false },
        { id: 'energy', name: 'Energy', group: 'resistances', description: 'blah', points: 1, max: 5, per: 1, stats: 30, statsText: '', checked: false },
        { id: 'kinetic', name: 'Kinetic', group: 'resistances', description: 'blah', points: 1, max: 5, per: 1, stats: 30, statsText: '', checked: false },

        { id: 'assembly', name: 'Crafting Assembly', group: 'trade', description: 'blah', points: 2, max: 10, per: 2, stats: 30, statsText: '', checked: false },
        { id: 'amazing', name: 'Amazing Success Chance', group: 'trade', description: 'blah', points: 5, max: 10, per: 5, stats: 30, statsText: '', checked: false },
        { id: 'reverse', name: 'Reverse Engineering Efficiency', group: 'trade', description: 'blah', points: 5, max: 10, per: 5, stats: 30, statsText: '', checked: false },
    ]

    const [options, setOptions] = useState<Option[]>(defaultOptions);

    useEffect(() => {
        updateQuery();
        updateMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options])

    useEffect(() => {
        loadQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function loadQuery() {

        // const qs = searchParams.
        // console.log('loadQuery', qs);
        // const qs = router.

        let _options = [...options];

        for (let i in _options) {
            let qs = searchParams.get(_options[i].id);
            if (qs) {
                const points = Number(qs);
                if (points > 0) {
                    console.log(_options[i].id, qs);
                    _options[i].checked = true;
                    _options[i].points = Number(qs);
                }
            }
        }
        _options = calculatePoints(_options);
        setOptions(_options);
    }

    function updateQuery() {
        const params = new URLSearchParams()

        // let qs = '';
        // router.push('?test=foo')

        for (let i in options) {
            if (options[i].checked && options[i].points > 0) {
                params.set(options[i].id, options[i].points.toString());
            }
        }
        console.log('qs', params.toString());
        router.push(`?${params.toString()}`);
    }

    function updateMessage() {

        let _message = 'OI BRUV I CAN I GET ';

        for (let i in options) {
            if (options[i].checked && options[i].points > 0) {
                _message += `${options[i].name} ${options[i].points},`;
                // params.set(options[i].id, options[i].points.toString());
            }
        }

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


    function handleChange(event: Event & { target: HTMLButtonElement}, ) {
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

    function handleIncrement(event: Event & { target: HTMLButtonElement}, ) {
        const target = event?.target;

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
    function handleDecrement(event: React.MouseEvent<HTMLElement>) {
        const target = event?.target;

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
        setPoints(0);
        setOptions(defaultOptions);
    }

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-row flex-grow w-full md:max-w-2xl justify-center gap-5 mb-2">
                <div className="flex flex-row alert alert-info white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span> Assuming the entertainer&apos;s expertise is fully specced for buffing at level 90</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row flex-grow w-full md:max-w-2xl justify-center gap-5 mb-2">

                <div className="flex flex-col w-full gap-1">
                    <div className="border-base-200 border-2 rounded">
                        <h3 className='bg-base-200 text-center font-bold'> Attributes </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return item?.group === 'attributes' ?
                                    (
                                        <div key={key} className='flex flex-row gap-2'>
                                            <input id={item.id} type="checkbox" onChange={handleChange} checked={item.checked} />
                                            <label htmlFor={item.id}> {item.name} </label>
                                            <div className='flex-grow'> </div>
                                            <span className='whitespace-nowrap'> {item.per} - {item.max} </span>
                                        </div>
                                    )
                                    :
                                    <> </>
                            })}
                        </div>
                    </div>

                    <div className="border-base-200 border-2 rounded">
                        <h3 className='bg-base-200 text-center font-bold'> Combat </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return item?.group === 'combat' ?
                                    (
                                        <div key={key} className='flex flex-row gap-2'>
                                            <input id={item.id} type="checkbox" onChange={handleChange} checked={item.checked} />
                                            <label htmlFor={item.id}> {item.name} </label>
                                            <div className='flex-grow'> </div>
                                            <span className='whitespace-nowrap'>{item.per} {`${item.max > 1 ? '- ' + item.max : ''}`} </span>
                                        </div>
                                    )
                                    :
                                    <> </>
                            })}
                        </div>
                    </div>
                    <div className="border-base-200 border-2 rounded">
                        <h3 className='bg-base-200 text-center font-bold'> Misc </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return item?.group === 'misc' ?
                                    (
                                        <div key={key} className='flex flex-row gap-2'>
                                            <input id={item.id} type="checkbox" onChange={handleChange} checked={item.checked} />
                                            <label htmlFor={item.id}> {item.name} </label>
                                            <div className='flex-grow'> </div>
                                            <span className='whitespace-nowrap'> {item.per} {`${item.max > 1 ? '- ' + item.max : ''}`} </span>
                                        </div>
                                    )
                                    :
                                    <> </>
                            })}
                        </div>
                    </div>

                    <div className="border-base-200 border-2 rounded">
                        <h3 className='bg-base-200 text-center font-bold'> Resistances </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return item?.group === 'resistances' ?
                                    (
                                        <div key={key} className='flex flex-row gap-2'>
                                            <input id={item.id} type="checkbox" onChange={handleChange} checked={item.checked} />
                                            <label htmlFor={item.id}> {item.name} </label>
                                            <div className='flex-grow'> </div>
                                            <span className='whitespace-nowrap'> {item.per} {`${item.max > 1 ? '- ' + item.max : ''}`} </span>
                                        </div>
                                    )
                                    :
                                    <> </>
                            })}
                        </div>
                    </div>

                    <div className="border-base-200 border-2 rounded">
                        <h3 className='bg-base-200 text-center font-bold'> Trade </h3>
                        <div className='p-2'>
                            {options.map((item, key) => {
                                return item?.group === 'trade' ?
                                    (
                                        <div key={key} className='flex flex-row gap-2'>
                                            <input id={item.id} type="checkbox" onChange={handleChange} checked={item.checked} />
                                            <label htmlFor={item.id}> {item.name} </label>
                                            <div className='flex-grow'> </div>
                                            <span className='whitespace-nowrap'> {item.per} {`${item.max > 1 ? '- ' + item.max : ''}`} </span>
                                        </div>
                                    )
                                    :
                                    <> </>
                            })}
                        </div>
                    </div>
                </div>
                {/* 
                <div className="flex flex-col w-full gap-1">
                    <div className="border-2 rounded">
                        <h3 className='bg-base-200 text-center font-bold'> Attributes </h3> */}


                <div className="flex flex-col w-full gap-1">
                    <div className="border-base-200 border-2 rounded">
                        <h3 className='bg-base-200 text-center font-bold'> Available Points </h3>
                        <div className={`flex flex-row p-2 `}>
                            <div className={`flex flex-col`}>
                                {/* <span> <b> Available Points:</b></span> */}
                                <span className={`${points > 20 ? 'text-error' : 'text-success'}`}> <b> {points} / {maxPoints} </b></span>
                                <span className={`${points > 20 ? '' : 'hidden'} text-error`}> Too many points </span>


                            </div>
                            <div className='flex-grow'> </div>
                            <button className='btn' onClick={handleReset}> Reset </button>
                        </div>
                    </div>

                    <div className='flex-grow border-base-200 border-2 p-2'>


                        {options.map((item, key) => {
                            return item.checked ? (
                                <div key={key} className="flex flex-col mb-2">
                                    <div className={`flex flex-row items-center gap-1`}>
                                        <span className={`${item.points > 0 ? '' : 'opacity-50'} w-6`}> <b> {item.points} </b></span>
                                        <span className={`${item.points > 0 ? '' : 'opacity-50'}`}> {item.name} </span>
                                        <div className='flex-grow'> </div>
                                        <button name={item.id} className={`btn min-h-0 w-8 h-8 ${item.points > 0 ? '' : 'opacity-20'} `} onClick={handleDecrement}> - </button>

                                        <button name={item.id} className={`btn min-h-0 w-8 h-8 ${item.points < item.max ? '' : 'opacity-20'}`} onClick={handleIncrement}> + </button>
                                    </div>
                                </div>
                            ) : <> </>
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
            <div className="flex flex-col w-full md:max-w-2xl gap-1">
                <div className={` border-2 rounded ${points > maxPoints ? 'border-error' : 'border-base-200'}`}>
                    <h3 className={` text-center font-bold ${points > maxPoints ? 'text-error' : 'bg-base-200'}`}> Summary </h3>
                    <div className={`flex flex-col p-2`}>
                        {options.map((item, key) => {
                            return item.checked && item.points > 0 ? (
                                <div key={key} className="flex flex-col mb-2">
                                    <div className={`flex flex-row items-center justify-between gap-1`}>
                                        {/* <span> <b> {item.points} </b></span> */}
                                        <span>  <b> {item.name} </b></span>
                                        <span> {item.stats > 0 ? item.stats * item.points : ''} {item.statsText} </span>
                                    </div>
                                </div>
                            ) : <> </>
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



            <div className="flex flex-col w-full md:max-w-2xl gap-1">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text"> <h3> Message for ent </h3></span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" value={message} onChange={() => {}}/>
                </div>
            </div>

        </div >
    )
}