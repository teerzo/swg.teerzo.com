import Header from 'components/header'
import Footer from 'components/Footer'

import { useState, useEffect } from 'react';

export default function GCW() {

	const [date, setDate] = useState(new Date);

	const [current, setCurrent] = useState({ rank: 0, percentage: 0, gcw: 0 });
	const [future, setFuture] = useState({ rank: 0, percentage: 0 });

	const ranks = [
		{ minRating: 0, maxRating: 4999, impTitle: "Private", rebTitle: "Private", combinedTitle: "Private", earnCap: 10000, decayBal: 0, maxDecay: 0, decayFloor: 0 },
		{ minRating: 5000, maxRating: 9999, impTitle: "Lance Corporal", rebTitle: "Trooper", combinedTitle: "Lance Corporal / Trooper", earnCap: 6750, decayBal: 0, maxDecay: 0, decayFloor: 0 },
		{ minRating: 10000, maxRating: 14999, impTitle: "Corporal", rebTitle: "High Trooper", combinedTitle: "Corporal / High Trooper", earnCap: 6500, decayBal: 0, maxDecay: 0, decayFloor: 0 },
		{ minRating: 15000, maxRating: 19999, impTitle: "Sergeant", rebTitle: "Sergeant", combinedTitle: "Sergeant", earnCap: 5750, decayBal: 0, maxDecay: 0, decayFloor: 0 },
		{ minRating: 20000, maxRating: 24999, impTitle: "Master Sergeant", rebTitle: "Senior Sergeant", combinedTitle: "Master Sergeant / Senior Sergeant", earnCap: 5500, decayBal: 0, maxDecay: 0, decayFloor: 0 },
		{ minRating: 25000, maxRating: 29999, impTitle: "Sergeant Major", rebTitle: "Sergeant Major", combinedTitle: "Sergeant Major", earnCap: 5250, decayBal: 0, maxDecay: 0, decayFloor: 0 },
		{ minRating: 30000, maxRating: 34999, impTitle: "Lieutnant", rebTitle: "Lieutnant", combinedTitle: "Lieutnant", earnCap: 5000, decayBal: 2728, maxDecay: 2000, decayFloor: 29999 },
		{ minRating: 35000, maxRating: 39999, impTitle: "Captain", rebTitle: "Captain", combinedTitle: "Captain", earnCap: 4750, decayBal: 2745, maxDecay: 2000, decayFloor: 0 },
		{ minRating: 40000, maxRating: 44999, impTitle: "Major", rebTitle: "Major", combinedTitle: "Major", earnCap: 4500, decayBal: 2770, maxDecay: 2000, decayFloor: 0 },
		{ minRating: 45000, maxRating: 49999, impTitle: "Lieutenant Colonel", rebTitle: "Commander", combinedTitle: "Lieutenant Colonel / Commander", earnCap: 4250, decayBal: 2794, maxDecay: 2000, decayFloor: 0 },
		{ minRating: 50000, maxRating: 54999, impTitle: "Colonel", rebTitle: "Colonel", combinedTitle: "Colonel", earnCap: 4000, decayBal: 2824, maxDecay: 2000, decayFloor: 0 },
		{ minRating: 55000, maxRating: 59999, impTitle: "General", rebTitle: "General", combinedTitle: "General", earnCap: 3750, decayBal: 2858, maxDecay: 2000, decayFloor: 0 }
	]

	useEffect(() => {

	}, []);

	useEffect(() => {
		calculateRank();
	}, [current])


	function updateDate() {
		setDate();
	}

	function handleReset(event) {
		setCurrent({ rank: 0, percentage: 0, gcw: 0 });
	}

	function handleRankChange(e) {
		// console.log('handleRankChange', e?.target?.value, typeof e?.target?.value);
		let value = Number(e?.target?.value);



		let _current = { ...current };
		_current.rank = value;

		setCurrent(_current);
	}
	function handlePercentChange(e) {
		// console.log('handlePercentChange', e?.target?.value);
		let value = e?.target?.value;

		if (value !== '') {
			value = Number(value);
		}
		console.log('value', value, typeof value);
		let _current = { ...current };
		if (value >= 100) {
			value = 99.99;
		}
		_current.percentage = value;

		setCurrent(_current);
	}
	function handleGCWChange(e) {
		// console.log('handleGCWChange', e?.target?.value);
		let value = e?.target?.value;

		if (value !== '') {
			value = Number(value);
		}

		let _current = { ...current };
		_current.gcw = value;

		setCurrent(_current);
	}

	function calculateRank() {
		console.log('calculateRank', current);
		if (current.rank >= 0 && current.percentage !== '') {
			const rank = ranks[current.rank];
			const percentage = current.percentage;
			const points = current.gcw !== '' ? current.gcw : 0;



			let numerator = (points * parseInt(rank.earnCap));
			//console.log("numerator " + numerator);
			let denominator = (points + parseInt(rank.earnCap));
			//console.log("denominator " + denominator);
			let totalEarnedRating = parseInt(numerator / denominator);
			if (numerator % denominator) {
				++totalEarnedRating;
			}
			//console.log("pre-secondary total earned: " + totalEarnedRating);

			let pointToOffsetDecay = 0;
			if (parseInt(rank.decayBal) > 0) {
				pointToOffsetDecay = parseInt(((parseInt(rank.earnCap) * (parseInt(rank.decayBal) - 1)) / (parseInt(rank.earnCap) - (parseInt(rank.decayBal) + 1))) + 1);
			}

			console.log('pointToOffsetDecay', pointToOffsetDecay);

			if ((rank.decayBal > 0) && (totalEarnedRating >= parseInt(rank.decayBal)) && (pointToOffsetDecay > 0) && (points > pointToOffsetDecay)) {
				//console.log("secondary total earned calculation");
				numerator = (points - pointToOffsetDecay) * (parseInt(rank.earnCap) - parseInt(rank.decayBal) + 1000);
				//console.log("numerator " + numerator);
				denominator = (points - pointToOffsetDecay) + (parseInt(rank.earnCap) - parseInt(rank.decayBal) + 1000);
				//console.log("denominator " + denominator);
				totalEarnedRating = parseInt(numerator / denominator);
				//console.log("totalEarned pre-decay: " + totalEarnedRating);
				if (numerator % denominator)
					++totalEarnedRating;

				totalEarnedRating += parseInt(rank.decayBal);
				//console.log("totalEarned post-decay: " + totalEarnedRating);
			}

			console.log('totalEarnedRating', totalEarnedRating);

			//console.log("total earned: " + totalEarnedRating);
			totalEarnedRating = totalEarnedRating - parseInt(rank.decayBal);
			//console.log("total earned after decay: " + totalEarnedRating);

			var cappedAdjustment = (parseInt(rank.maxDecay) * -1 < totalEarnedRating) ? totalEarnedRating : parseInt(rank.maxDecay) * -1;
			//console.log("capped adjustment " + cappedAdjustment);

			var currentRating = parseInt(rank.minRating) + ((percentage / 100) * 5000);
			//console.log("current rating " + currentRating);

			var finalRatingAdjustment = cappedAdjustment;
			if ((rank.decayFloor > 0) && (finalRatingAdjustment < 0) && ((currentRating + finalRatingAdjustment) < rank.decayFloor)) {
				finalRatingAdjustment = rank.decayFloor - currentRating;
				//console.log("final rating adjustment " + finalRatingAdjustment);
			}

			var newRating = currentRating + finalRatingAdjustment;
			console.log("new rating " + newRating);

			var newRatingTitle = parseInt(newRating / 5000);
			console.log("new r title " + ranks[newRatingTitle].impTitle);

			var newCurrentRatingPercent = 0;
			//console.log("change amount " + newRatingTitle + ", " + inTitleValue);
			var changeAmount = (newRatingTitle - current.rank);
			// if(changeAmount > 0) {
			// 	changeAmount = "+" + changeAmount;
			// }
			var upOrDown = " (" + changeAmount + ")";
			newCurrentRatingPercent = ((5000 - (ranks[newRatingTitle].maxRating - newRating)) / 5000 * 100);
			if (current.rank == newRatingTitle) {
				upOrDown = " (same)"
			}
			newCurrentRatingPercent = Math.round(newCurrentRatingPercent, 2);

			let _future = { ...future };

			_future.rank = newRatingTitle; // ranks[newRatingTitle].combinedTitle + upOrDown;
			_future.percentage = newCurrentRatingPercent;


			console.log('setFuture', _future);

			setFuture(_future);

			// outTitle.innerHTML=
			// outPercent.innerHTML=newCurrentRatingPercent + "%";

			// if(newCurrentRatingPercent > 0) {
			// 	outWidth.width=320*(newCurrentRatingPercent/100);
			// 	outWidth.style.backgroundColor="#be8";
			// } else {
			// 	outWidth.style.backgroundColor="";
			// }
		}
		else {
			let _future = { ...future };

			_future.rank = current.rank; // ranks[newRatingTitle].combinedTitle + upOrDown;
			_future.percentage = current.percentage ? current.percentage : 0;


			console.log('setFuture', _future);

			setFuture(_future);

		}
	}

	return (
		<div className="container">
			<Header />
			<main className="gcw">

				<div className="flex">

					<div className="grow"></div>
					<div className="current">
						<div className="group">
							<h3> GCW: </h3>

						</div>

						<div className="group">
							<label> Time till reset: </label>
							<input readOnly={true} value={date.toUTCString()} />

						</div>

						<div className="grow"></div>


						<div className="group">
							<label> Current Rank: </label>
							<select value={current.rank} onChange={handleRankChange} >
								{ranks ? ranks.map((item, key) => {
									return (
										<option key={key} value={key} > {item?.combinedTitle} </option>
									)
								}) : <> </>}
							</select>
						</div>


						<div className="group">
							<label> Current %: </label>
							<input max={99.99} value={current.percentage} onChange={handlePercentChange} />
						</div>

						<div className="group">
							<label> Current GCW: </label>
							<input value={current.gcw} onChange={handleGCWChange} />
						</div>

						<div className="grow"></div>

						<button onClick={handleReset}> RESET </button>

						<div className="grow"></div>

					</div>


					<div className="future">
						<div className="group">
							<h3> Ranks: </h3>
						</div>
						{ranks ? ranks.map((item, key) => {
							return (
								<div key={key} className="rank">
									<p> {item.combinedTitle} </p>
									{future.rank > key ?
										<div className="progress full" style={{ 'width': `100%` }}> 100% </div>
										:
										<> </>
									}
									{future.rank == key ?
										<div className="progress rank" style={{ 'width': `${future.percentage}%` }}> {future.percentage}% </div>
										:
										<> </>
									}
									{future.rank < key ?
										<div className="progress none" style={{ 'width': `100%` }}> 0% </div>
										:
										<> </>
									}
								</div>
							)
						}) : <> </>}
					</div>
				</div>
			</main >
			<Footer />
		</div >
	)
}



function Reset({ ...props }) {

	const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

	const [date, setDate] = useState(new Date());
	const [targetDate, setTarget] = useState('');


	useEffect(() => {
		const t = new Date();
		let target = t.setDate(t.getDate() + ((7 - t.getDay()) % 7 + 4) % 7);
		target = t.setTime(1000 * 60);

		setTarget(target);

		setInterval(() => {
			update();
		}, 1000);
	}, []);


	function update() {
		const now = date.getTime();



		// Find the distance between now and the count down date
		var distance = target - now;

		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		setTime({ days: days, hours: hours, minutes: minutes, seconds: seconds });
	}




	return (
		<>
			<p> Date: {date.toString()} </p>
			<p> Target: {targetDate.toString()} </p>
			<p> Time until reset: </p>
			<p> Days: {time.days} </p>
			<p> Hours: {time.hours} </p>
			<p> Minutes: {time.minutes} </p>
		</>
	)
}