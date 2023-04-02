// Packages
import { useState, useEffect } from 'react';
import Image from 'next/image';
// Local
import Header from 'components/Header'
import Footer from 'components/Footer'

// Styles
import styles from './timers.module.scss';

// Images
import imgKeren from 'public/keren.png';
import imgBestine from 'public/bestine.png';
import imgDearic from 'public/dearic.png';
import imgSpace from 'public/space.png';


export default function GCWTimers({ ...props }) {

	const [displayUTC, setUTC] = useState('');
	const [displayLocal, setLocal] = useState('');

	const [date, setDate] = useState(new Date());

	const [current, setCurrent] = useState(null);
	const [upcoming, setUpcoming] = useState(null);
	const [following, setFollowing] = useState(null);

	const list = [
		{ name: 'Naboo Space', time: 0, offset: 0 },
		{ name: 'Dearic', time: 0, offset: 1 },
		{ name: 'Lok Space', time: 0, offset: 2 },
		{ name: 'Keren', time: 0, offset: 3 },
		{ name: 'Tatooine Space', time: 0, offset: 4 },
		{ name: 'Bestine', time: 0, offset: 5 },
		{ name: 'Dantooine Space', time: 0, offset: 6 },
		{ name: 'Dearic', time: 0, offset: 7 },
		{ name: 'Corellia Space', time: 0, offset: 8 },
		{ name: 'Keren', time: 0, offset: 9 },
		{ name: 'Lok Space', time: 0, offset: 10 },
		{ name: 'Bestine', time: 0, offset: 11 },
		{ name: 'Naboo Space', time: 0, offset: 12 },
		{ name: 'Dearic', time: 0, offset: 13 },
		{ name: 'Dantooine Space', time: 0, offset: 14 },
		{ name: 'Keren', time: 0, offset: 15 },
		{ name: 'Corellia Space', time: 0, offset: 16 },
		{ name: 'Bestine', time: 0, offset: 17 },
		{ name: 'Tatooine Space', time: 0, offset: 18 },
		{ name: 'Dearic', time: 0, offset: 19 },
		{ name: 'Lok Space', time: 0, offset: 20 },
		{ name: 'Keren', time: 0, offset: 21 },
		{ name: 'Dantooine Space', time: 0, offset: 22 },
		{ name: 'Bestine', time: 0, offset: 23 },
	]

	const invasions = [
		// ground
		{ name: 'Dearic', image: imgDearic },
		{ name: 'Keren', image: imgKeren },
		{ name: 'Bestine', image: imgBestine, remaining: 0 },
		// space
		{ name: 'Naboo Space', image: imgSpace, remaining: 0 },
		{ name: 'Lok Space', image: imgSpace, remaining: 0 },
		{ name: 'Tatooine Space', image: imgSpace, remaining: 0 },
		{ name: 'Dantooine Space', image: imgSpace, remaining: 0 },
		{ name: 'Corellia Space', image: imgSpace, remaining: 0 },
	]


	useEffect(() => {
		setInterval(() => {
			update();
		}, 1000);
	}, []);


	function getInvasionDetails(name) {
		for (let i = 0; i < invasions.length; i++) {
			if (invasions[i].name === name) {
				return invasions[i];
			}
		}
	}

	function getTime(mins) {
		const hours = Math.floor(mins / 60);
		const minutes = mins % 60;

		if (hours <= 0) {
			return `${minutes > 0 ? ` ${minutes}m` : ''}`;
		}
		return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
	}


	function update() {
		const _date = new Date();
		console.log('date', _date);

		let utc = _date.toUTCString();
		let local = _date.toString();

		setDate(_date);
		setUTC(utc);
		setLocal(local);

		// check invasions against utc time 
		const offset = _date.getUTCHours();
		console.log('offset', offset);

		// console.log('new current', newCurrent);
		// console.log('current', current);

		const mins = _date.getUTCMinutes();

		let _current = null;
		let _upcomining = null;
		let _following = [];

		for (let i = 0; i < list.length; i++) {
			let item = { ...list[i] };

			if (list[i].offset === offset) {
				if (current === null || current.name !== list[i].name) {
					console.log('getInvasionDetails', list[i].name, list[i].offset);

					_current = getInvasionDetails(list[i].name);
					_current.time = 60 - mins;
					_current.offset = list[i].offset;
				}
			}
			else if (list[i].offset === offset + 1) {
				if (upcoming === null || upcoming.name !== list[i].name) {
					console.log('getInvasionDetails', list[i].name, list[i].offset);

					_upcomining = getInvasionDetails(list[i].name);
					_upcomining.time = 60 - mins + 60;
					_upcomining.offset = list[i].offset;
				}
			}
			else {
				const _invasion = { ...getInvasionDetails(item.name) }
				if (offset > item.offset) {
					_invasion.time = (item.offset + 24 - offset) * 60 + (60 - mins);
				}
				else {
					_invasion.time = (item.offset - offset) * 60 + (60 - mins);
				}

				_invasion.offset = item.offset;
				_following.push(_invasion);
			}


		}

		_following.sort((a, b) => { return a.time < b.time ? -1 : 1 });

		setCurrent(_current);
		setUpcoming(_upcomining);
		setFollowing(_following);
	}




	return (

		<div className="container">

			<Header />
			<main className={styles.main}>
				<div className={styles.timers}>
					{/* 
					<h5> Current time: {displayUTC}</h5>
					<h5> Current local time: {displayLocal}</h5> */}

					<h1> Invasion Timers</h1>
					<h5> {displayUTC}</h5>


					<div className={styles.grid}>
						<div className={styles.current}>
							<Image
								alt="Vercel logo"
								src={current?.image}
								width={300}
								height={200}
								style={{
									maxWidth: '100%',
									height: 'auto',
								}}
							/>
							<div className={styles.details}>
								<h4> Current Invasion: </h4>
								<h2> {current?.name} </h2>

								<h4> Time remaining: </h4>
								<h2> {getTime(current?.time)} </h2>
								<p> {current?.offset} GMT </p>
							</div>


						</div>
						<div className={styles.upcoming}>
							<div className={styles.details}>
								<h4> Upcoming Invasion: </h4>
								<h2> {upcoming?.name} </h2>

								<h4> Starting in: </h4>
								<h2> {getTime(upcoming?.time)} </h2>
								<p> {upcoming?.offset} GMT </p>
							</div>

							<Image
								alt="Vercel logo"
								src={upcoming?.image}
								width={300}
								height={200}
								style={{
									maxWidth: '100%',
									height: 'auto',
								}}
							/>
						</div>
					</div>
					<div className="">
						<h4> Following Invasions: </h4>
						<div className={styles.following}>
							{following?.map((item, key) => {
								return (
									<div className={styles.invasion}>
										<Image
											alt="Vercel logo"
											src={item?.image}
											width={150}
											height={200}
											style={{
												maxWidth: '100%',
												height: 'auto',
											}}
										/>
										<div className={styles.details}>
											<h4> {item?.name} </h4>

											<h5> Starting in: </h5>
											<h4> {getTime(item?.time)} </h4>
											<p> {item?.offset} GMT </p>
										</div>
									</div>)
							})}
						</div>
					</div>
				</div>
			</main >

			<Footer />
		</div >
	)
}