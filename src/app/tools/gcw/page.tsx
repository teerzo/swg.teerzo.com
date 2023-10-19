
"use client"

import { useEffect, useState, ReactEventHandler } from "react"
import { FaRebel, FaEmpire, FaDesktop } from "react-icons/fa";
import Image from 'next/image'
import cx from "classnames";

// Imp
import rankImpGeneral from '../../../../public/images/gcw/rank-imp-general.png';
import rankImpColonel from '../../../../public/images/gcw/rank-imp-colonel.png';
import rankImpLieuColonel from '../../../../public/images/gcw/rank-imp-lieutenant-colonel.png';
import rankImpMajor from '../../../../public/images/gcw/rank-imp-major.png';
import rankImpCaptain from '../../../../public/images/gcw/rank-imp-captain.png';
import rankImpLieutenant from '../../../../public/images/gcw/rank-imp-lieutenant.png';

import rankImpSergeantMajor from '../../../../public/images/gcw/rank-imp-sergeant-major.png';
import rankImpMasterSergeant from '../../../../public/images/gcw/rank-imp-master-sergeant.png';
import rankImpSergeant from '../../../../public/images/gcw/rank-imp-sergeant.png';
import rankImpCorporal from '../../../../public/images/gcw/rank-imp-corporal.png';
import rankImpLanceCorporal from '../../../../public/images/gcw/rank-imp-lance-corporal.png';
import rankImpPrivate from '../../../../public/images/gcw/rank-imp-private.png';

// Rebel
import rankRebGeneral from '../../../../public/images/gcw/rank-reb-general.png';
import rankRebColonel from '../../../../public/images/gcw/rank-reb-colonel.png';
import rankRebCommander from '../../../../public/images/gcw/rank-reb-commander.png';
import rankRebMajor from '../../../../public/images/gcw/rank-reb-major.png';
import rankRebCaptain from '../../../../public/images/gcw/rank-reb-captain.png';
import rankRebLieutenant from '../../../../public/images/gcw/rank-reb-lieutenant.png';

import rankRebSergeantMajor from '../../../../public/images/gcw/rank-reb-sergeant-major.png';
import rankRebSeniorSergeant from '../../../../public/images/gcw/rank-reb-senior-sergeant.png';
import rankRebSergeant from '../../../../public/images/gcw/rank-reb-sergeant.png';
import rankRebHighTrooper from '../../../../public/images/gcw/rank-reb-high-trooper.png';
import rankRebTrooper from '../../../../public/images/gcw/rank-reb-trooper.png';
import rankRebPrivate from '../../../../public/images/gcw/rank-reb-private.png';


export default function Page() {

    const [remaining, setRemaining] = useState({
        days: 40,
        hours: 12,
        minutes: 10,
        seconds: 30,
    })
    const [time, setTime] = useState(new Date().getTime());
    const factions = [
        'rebel',
        "imperial",
    ]

    const ranks = [
        {
            id: 0, nameImp: "Private", nameReb: "Private", imageReb: rankRebPrivate, imageImp: rankImpPrivate,
            minRating: 0, maxRating: 4999, earnCap: 10000, decayBal: 0, maxDecay: 0, decayFloor: 0
        },
        {
            id: 1, nameImp: "Lance Corporal", nameReb: "Trooper", imageReb: rankRebTrooper, imageImp: rankImpLanceCorporal,
            minRating: 5000, maxRating: 9999, earnCap: 6750, decayBal: 0, maxDecay: 0, decayFloor: 0
        },
        {
            id: 2, nameImp: "Corporal", nameReb: "High Trooper", imageReb: rankRebHighTrooper, imageImp: rankImpCorporal,
            minRating: 10000, maxRating: 14999, earnCap: 6500, decayBal: 0, maxDecay: 0, decayFloor: 0
        },
        {
            id: 3, nameImp: "Sergeant", nameReb: "Sergeant", imageReb: rankRebSergeant, imageImp: rankImpSergeant,
            minRating: 15000, maxRating: 19999, earnCap: 5750, decayBal: 0, maxDecay: 0, decayFloor: 0
        },
        {
            id: 4, nameImp: "Master Sergeant", nameReb: "Senior Sergeant", imageReb: rankRebSeniorSergeant, imageImp: rankImpMasterSergeant,
            minRating: 20000, maxRating: 24999, earnCap: 5500, decayBal: 0, maxDecay: 0, decayFloor: 0
        },
        {
            id: 5, nameImp: "Sergeant Major", nameReb: "Sergeant Major", imageReb: rankRebSergeantMajor, imageImp: rankImpSergeantMajor,
            minRating: 25000, maxRating: 29999, earnCap: 5250, decayBal: 0, maxDecay: 0, decayFloor: 0
        },

        {
            id: 6, nameImp: "Lieutenant", nameReb: "Lieutenant", imageReb: rankRebLieutenant, imageImp: rankImpLieutenant,
            minRating: 30000, maxRating: 34999, earnCap: 5000, decayBal: 2728, maxDecay: 2000, decayFloor: 29999
        },
        {
            id: 7, nameImp: "Captain", nameReb: "Captain", imageReb: rankRebCaptain, imageImp: rankImpCaptain,
            minRating: 35000, maxRating: 39999, earnCap: 4750, decayBal: 2745, maxDecay: 2000, decayFloor: 0
        },
        {
            id: 8, nameImp: "Major", nameReb: "Major", imageReb: rankRebMajor, imageImp: rankImpMajor,
            minRating: 40000, maxRating: 44999, earnCap: 4500, decayBal: 2770, maxDecay: 2000, decayFloor: 0
        },
        {
            id: 9, nameImp: "Lieutenant Colonel", nameReb: "Commander", imageReb: rankRebCommander, imageImp: rankImpLieuColonel,
            minRating: 45000, maxRating: 49999, earnCap: 4250, decayBal: 2794, maxDecay: 2000, decayFloor: 0
        },
        {
            id: 10, nameImp: "Colonel", nameReb: "Colonel", imageReb: rankRebColonel, imageImp: rankImpColonel,
            minRating: 50000, maxRating: 54999, earnCap: 4000, decayBal: 2824, maxDecay: 2000, decayFloor: 0
        },
        {
            id: 11, nameImp: "General", nameReb: "General", imageReb: rankRebGeneral, imageImp: rankImpGeneral,
            minRating: 55000, maxRating: 59999, earnCap: 3750, decayBal: 2858, maxDecay: 2000, decayFloor: 0
        },
    ]

    const [selected, setSelected] = useState({
        faction: 'rebel',
        rank: 0,
        points: '',
        percentage: '',
    });

    const [future, setFuture] = useState({
        rank: 0,
        percentage: '',
    })


    useEffect(() => {
        calculateRank();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])


    useEffect(() => {
        const _date = getNextDayOfTheWeek('friday');
        if (_date) {
            _date.setHours(_date.getHours() + 5);
            console.log('_date', _date);
            setTime(_date.getTime());
        }
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            // console.log('ticking')
            calculateRemaining();
        }, 1000)

        return () => clearInterval(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time])

    function calculateRemaining() {
        const now = new Date().getTime();
        const distance = time - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);


        // console.log('set remaining', days, hours, minutes, seconds);
        setRemaining({ days, hours, minutes, seconds });
    }

    function getNextDayOfTheWeek(dayName: string, excludeToday = true, refDate = new Date()) {
        const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
            .indexOf(dayName.slice(0, 3).toLowerCase());
        if (dayOfWeek < 0) return;
        refDate.setHours(0, 0, 0, 0);
        refDate.setDate(refDate.getDate() + +!!excludeToday +
            (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
        return refDate;
    }

    function handleFactionChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('handleChange', event.target.value);
        // handleThemeChange(event.target.id);
        setSelected({ ...selected, faction: event.target.value });
    }

    function handleRankChange(event: React.ChangeEvent<HTMLSelectElement>) {
        console.log('handleRankChange', event.target);
        const value = Number(event.target.value);
        setSelected({ ...selected, rank: value });
    }

    function handlePointsChange(event: React.ChangeEvent<HTMLInputElement>) {
        // console.log('handlePointsChange', e.target.value);
        setSelected({ ...selected, points: event.target.value });
    }

    function handlePercentageChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('handlePointsChange', event.target.value);

        let value = Number(event.target.value);
        if (value > 100) {
            value = 100;
        }

        setSelected({ ...selected, percentage: value.toString() });
    }


    function calculateRank() {
        console.log('calculateRank', selected);
        if (selected.rank >= 0 && selected.percentage !== '') {
            const rank = ranks[selected.rank];
            const percentage = Number(selected.percentage);
            const points = selected.points !== '' ? Number(selected.points) : 0;



            let numerator = (points * rank.earnCap);
            //console.log("numerator " + numerator);
            let denominator = (points + rank.earnCap);
            //console.log("denominator " + denominator);
            let totalEarnedRating = numerator / denominator;
            if (numerator % denominator) {
                ++totalEarnedRating;
            }
            //console.log("pre-secondary total earned: " + totalEarnedRating);

            let pointToOffsetDecay = 0;
            if (rank.decayBal > 0) {
                pointToOffsetDecay = ((rank.earnCap * (rank.decayBal - 1)) / (rank.earnCap - (rank.decayBal + 1))) + 1;
            }

            console.log('pointToOffsetDecay', pointToOffsetDecay);

            if ((rank.decayBal > 0) && (totalEarnedRating >= rank.decayBal) && (pointToOffsetDecay > 0) && (points > pointToOffsetDecay)) {
                //console.log("secondary total earned calculation");
                numerator = (points - pointToOffsetDecay) * (rank.earnCap - rank.decayBal + 1000);
                //console.log("numerator " + numerator);
                denominator = (points - pointToOffsetDecay) + (rank.earnCap - rank.decayBal + 1000);
                //console.log("denominator " + denominator);
                totalEarnedRating = numerator / denominator;
                //console.log("totalEarned pre-decay: " + totalEarnedRating);
                if (numerator % denominator)
                    ++totalEarnedRating;

                totalEarnedRating += rank.decayBal;
                //console.log("totalEarned post-decay: " + totalEarnedRating);
            }

            console.log('totalEarnedRating', totalEarnedRating);

            //console.log("total earned: " + totalEarnedRating);
            totalEarnedRating = totalEarnedRating - rank.decayBal;
            //console.log("total earned after decay: " + totalEarnedRating);

            var cappedAdjustment = (rank.maxDecay * -1 < totalEarnedRating) ? totalEarnedRating : rank.maxDecay * -1;
            //console.log("capped adjustment " + cappedAdjustment);

            var selectedRating = rank.minRating + ((percentage / 100) * 5000);
            //console.log("selected rating " + selectedRating);

            var finalRatingAdjustment = cappedAdjustment;
            if ((rank.decayFloor > 0) && (finalRatingAdjustment < 0) && ((selectedRating + finalRatingAdjustment) < rank.decayFloor)) {
                finalRatingAdjustment = rank.decayFloor - selectedRating;
                //console.log("final rating adjustment " + finalRatingAdjustment);
            }

            var newRating = selectedRating + finalRatingAdjustment;
            console.log("new rating " + newRating);

            var newRatingTitle = Math.round(newRating / 5000);
            console.log("new r title " + ranks[newRatingTitle].nameImp);

            var newselectedRatingPercent = 0;
            //console.log("change amount " + newRatingTitle + ", " + inTitleValue);
            var changeAmount = (newRatingTitle - selected.rank);
            // if(changeAmount > 0) {
            // 	changeAmount = "+" + changeAmount;
            // }
            var upOrDown = " (" + changeAmount + ")";
            newselectedRatingPercent = ((5000 - (ranks[newRatingTitle].maxRating - newRating)) / 5000 * 100);
            if (selected.rank == newRatingTitle) {
                upOrDown = " (same)"
            }
            // newselectedRatingPercent = Math.round(newselectedRatingPercent, 2);
            newselectedRatingPercent = Math.round(newselectedRatingPercent);

            let _future = { ...future };

            _future.rank = newRatingTitle; // ranks[newRatingTitle].combinedTitle + upOrDown;
            _future.percentage = newselectedRatingPercent.toString();


            console.log('setFuture', _future);

            setFuture(_future);

            // outTitle.innerHTML=
            // outPercent.innerHTML=newselectedRatingPercent + "%";

            // if(newselectedRatingPercent > 0) {
            // 	outWidth.width=320*(newselectedRatingPercent/100);
            // 	outWidth.style.backgroundColor="#be8";
            // } else {
            // 	outWidth.style.backgroundColor="";
            // }
        }
        else {
            let _future = { ...future };

            _future.rank = selected.rank; // ranks[newRatingTitle].combinedTitle + upOrDown;
            _future.percentage = selected.percentage ? selected.percentage.toString() : '';


            console.log('setFuture', _future);

            setFuture(_future);

        }
    }

    const rebelClass = cx('btn', 'rebel', 'text-xl', selected.faction === 'rebel' ? 'selected' : '')
    const imperialClass = cx('btn', 'imperial', 'text-xl', selected.faction === 'imperial' ? 'selected' : '')

    return (
        <div className="w-full">
            <div className="flex flex-row justify-center text-center mb-5">
                <div className="flex flex-col prose w-full items-center	 text-center">
                    <h3 className="">  GCW Week ends in: </h3>
                    <div className="flex gap-5">
                        <div>
                            <span className="countdown font-mono text-4xl">
                                <span style={{ "--value": remaining.days } as React.CSSProperties}> </span>
                            </span>
                            days
                        </div>
                        <div>
                            <span className="countdown font-mono text-4xl">
                                <span style={{ "--value": remaining.hours } as React.CSSProperties}> </span>
                            </span>
                            hours
                        </div>
                        <div>
                            <span className="countdown font-mono text-4xl">
                                <span style={{ "--value": remaining.minutes } as React.CSSProperties}> </span>
                            </span>
                            min
                        </div>
                        <div>
                            <span className="countdown font-mono text-4xl">
                                <span style={{ "--value": remaining.seconds } as React.CSSProperties}> </span>
                            </span>
                            sec
                        </div>
                    </div>


                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col prose w-full">
                    <h3 className=""> Current: </h3>

                    <div className="flex flex-row">

                        <div className="form-control max-w-xs w-full mr-2">
                            <label className="label">
                                <span className="label-text"> Faction </span>
                            </label>
                            <div className="btn-group w-full">
                                <label htmlFor="faction-rebel" className={rebelClass}>
                                    <FaRebel className="icon" />
                                    <input id="faction-rebel" type="radio" name="faction" value="rebel" checked={selected.faction === "rebel"} onChange={handleFactionChange} className="hidden" />
                                </label>

                                <label htmlFor="faction-imperial" className={imperialClass}>
                                    <FaEmpire className="icon" />
                                    <input id="faction-imperial" type="radio" name="faction" value="imperial" checked={selected.faction === "imperial"} onChange={handleFactionChange} className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div className="form-control max-w-xs w-full">
                            <label className="label">
                                <span className="label-text"> Rank </span>
                            </label>
                            <select className="select select-bordered" value={selected.rank} onChange={handleRankChange}>
                                <option disabled >Pick one</option>
                                {ranks.map((item, key) => {
                                    return (
                                        <option value={item.id} key={key}> {selected.faction === 'imperial' ? item.nameImp : item.nameReb} </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="form-control max-w-xs w-full mr-2">
                            <label className="label">
                                <span className="label-text"> Points </span>
                            </label>
                            <input type="number" placeholder="0" min={0} className="input input-bordered w-full max-w-xs" onChange={handlePointsChange} />
                        </div>
                        <div className="form-control max-w-xs w-full">
                            <label className="label">
                                <span className="label-text"> Rank %  </span>
                            </label>
                            <input type="text" placeholder="0 - 99%" value={selected.percentage} max={99} className="input input-bordered w-full max-w-xs" onChange={handlePercentageChange} />
                        </div>
                    </div>

                    {/* <div className="debug">
                        <p> Faction: {selected.faction} </p>
                        <p> Rank: {selected.rank} </p>
                        <p> Points: {selected.points} </p>
                        <p> Percentage: {selected.percentage} </p>
                    </div> */}

                    {/* </div>
                    <div className="flex flex-col w-96 prose"> */}
                    <h3> Ranks </h3>

                    {ranks.map((item, key) => {

                        return (
                            // <div key={key} className="flex flex-row items-center p-1 bg-black mb-2 rounded">

                            <div key={key} tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200  mb-2">
                                <input type="checkbox" />
                                <div className="flex flex-row items-center collapse-title text-xl font-medium p-0 pl-3 pr-10">


                                    {/* <div className="flex flex-row items-center collapse-title text-xl font-medium"> */}





                                    {/* <Image
                                    src={rankImp}
                                    alt="Picture of the author"
                                    width={40}
                                    height={40}
                                    placeholder="blur"
                                    className="m-0"
                                /> */}

                                    {/* <label className="grow label pl-5 " >
                                    {selected.rank >= item.id ?
                                        <span className="label-text text-secondary "> {selected.faction === 'imperial' ? item.name : item.rebel} </span>
                                        :
                                        <span className="label-text"> {selected.faction === 'imperial' ? item.name : item.rebel} </span>
                                    }
                                </label> */}

                                    {/* <progress className="progress progress-primary w-56 progress-secondary disabled" value={selected.percentage} max="100"></progress> */}



                                    {future.rank > item.id ?
                                        // {selected.rank - 1 === item.id ?
                                        // Previous ranks
                                        <>
                                            <Image
                                                src={selected.faction === "imperial" ? item.imageImp : item.imageReb}
                                                alt="Picture of the author"
                                                width={40}
                                                height={40}
                                                placeholder="blur"
                                                className="m-0"
                                            />

                                            <label className="min-w-140 grow label pl-2" >
                                                <span className="label-text"> {selected.faction === 'imperial' ? item.nameImp : item.nameReb} </span>
                                            </label>
                                            <span className="text-right	text-sm min-w-40 mr-2"> 100%</span>
                                            <progress className={`progress progress-secondary ${selected.faction === 'imperial' ? 'progress-imperial' : 'progress-rebel'}`} value={100} max="100"></progress>
                                        </>
                                        : <> </>
                                    }
                                    {future.rank === item.id ?
                                        // selected
                                        <>
                                            <Image
                                                src={selected.faction === "imperial" ? item.imageImp : item.imageReb}
                                                alt="Picture of the author"
                                                width={40}
                                                height={40}
                                                placeholder="blur"
                                                className="m-0"
                                            />


                                            <label className="min-w-140 grow label pl-2" >
                                                <span className="label-text"> {selected.faction === 'imperial' ? item.nameImp : item.nameReb} </span>
                                            </label>
                                            <span className="text-right	text-sm min-w-40 mr-2"> {future.percentage}%</span>
                                            <progress className={`progress progress-secondary ${selected.faction === 'imperial' ? 'progress-imperial' : 'progress-rebel'}`} value={future.percentage} max="100"></progress>
                                        </>
                                        : <> </>
                                    }
                                    {future.rank < item.id ?
                                        // {selected.rank + 1 === item.id ?
                                        // Further ranks
                                        <>
                                            <Image
                                                src={selected.faction === "imperial" ? item.imageImp : item.imageReb}
                                                alt="Picture of the author"
                                                width={40}
                                                height={40}
                                                placeholder="blur"
                                                className="m-0 disabled"
                                            />
                                            <label className="min-w-140 grow label pl-2 disabled" >
                                                <span className="label-text"> {selected.faction === 'imperial' ? item.nameImp : item.nameReb} </span>
                                            </label>
                                            {/* 
                                            <label className="grow label pl-5 disabled" >
                                                {selected.rank >= item.id ?
                                                    <span className="label-text text-secondary "> {selected.faction === 'imperial' ? item.nameImp : item.nameReb} </span>
                                                    :
                                                    <span className="label-text"> {selected.faction === 'imperial' ? item.nameImp : item.nameReb} </span>
                                                }
                                            </label> */}
                                            <span className="text-right	text-sm min-w-40 mr-2"> 0%</span>
                                            <progress className="progress progress-secondary" value={0} max="100"></progress>
                                        </>
                                        : <> </>
                                    }

                                </div>
                                <div className="collapse-content">
                                    <p>hello there</p>
                                </div>
                            </div>

                        )
                    })}

                    {/* <div className="p-1">
                        <label className="label p-0">
                            <span className="label-text"> Private </span>
                        </label>
                        <progress className="progress progress-primary w-56" value={0} max="100"></progress>
                    </div> */}

                    {/* <div className="p-1">
                        <label className="label p-0">
                            <span className="label-text"> Lance Corporal / Trooper </span>
                        </label>
                        <progress className="progress progress-primary w-56" value={0} max="100"></progress>
                    </div> */}

                    {/* 
                <div className="">
                    <label> Lance Corporal / Trooper </label>
                    <input />
                </div>

                <div className="">
                    <label> Corporal / High Trooper </label>
                    <input />
                </div>

                <div className="">
                    <label> Sergeant </label>
                    <input />
                </div>

                <div className="">
                    <label> Master Sergeant / Senior Sergeant </label>
                    <input />
                </div>

                <div className="">
                    <label> Sergeant Major </label>
                    <input />
                </div>

                <div className="">
                    <label> Lieutnant </label>
                    <input />
                </div>

                <div className="">
                    <label> Captain </label>
                    <input />
                </div>

                <div className="">
                    <label> Major </label>
                    <input />
                </div>

                <div className="">
                    <label> Lieutenant Colonel / Commander </label>
                    <input />
                </div>

                <div className="">
                    <label> Colonel </label>
                    <input />
                </div>

                <div className="">
                    <label> General </label>
                    <input />
                </div> */}
                </div>
            </div >
        </div >
    )
}