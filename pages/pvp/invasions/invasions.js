// Packages
import { useState, useEffect } from 'react';
import Image from 'next/image';
// Local
import Header from 'components/header'
import Footer from 'components/Footer'

// Styles
import styles from './invasions.module.scss';

// Images
import imgKeren from 'public/keren.png';
import imgBestine from 'public/bestine.png';
import imgDearic from 'public/dearic.png';
import imgSpace from 'public/space.png';
import Toggle from 'components/common/toggle';


export default function Invasions({ ...props }) {

	const [displayUTC, setUTC] = useState('');
	const [displayLocal, setLocal] = useState('');

	const [offset, setOffset] = useState(new Date().getUTCHours());

	const [date, setDate] = useState(new Date());

	const [invasions, setInvasions] = useState([]);

	const [flashpoint, setFlashpoint] = useState(0);

	// const [current, setCurrent] = useState(null);
	// const [upcoming, setUpcoming] = useState(null);
	// const [following, setFollowing] = useState(null);

	const [hideGround, setGround] = useState(false);
	const [hideSpace, setSpace] = useState(false);

	const list = [
		{ name: 'Naboo Space', type: 'space', time: 0, offset: 0 },
		{ name: 'Dearic', type: 'ground', time: 0, offset: 1 },
		{ name: 'Lok Space', type: 'space', time: 0, offset: 2 },
		{ name: 'Keren', type: 'ground', time: 0, offset: 3 },
		{ name: 'Tatooine Space', type: 'space', time: 0, offset: 4 },
		{ name: 'Bestine', type: 'ground', time: 0, offset: 5 },
		{ name: 'Dantooine Space', type: 'space', time: 0, offset: 6 },
		{ name: 'Dearic', type: 'ground', time: 0, offset: 7 },
		{ name: 'Corellia Space', type: 'space', time: 0, offset: 8 },
		{ name: 'Keren', type: 'ground', time: 0, offset: 9 },
		{ name: 'Lok Space', type: 'space', time: 0, offset: 10 },
		{ name: 'Bestine', type: 'ground', time: 0, offset: 11 },
		{ name: 'Naboo Space', type: 'space', time: 0, offset: 12 },
		{ name: 'Dearic', type: 'ground', time: 0, offset: 13 },
		{ name: 'Dantooine Space', type: 'space', time: 0, offset: 14 },
		{ name: 'Keren', type: 'ground', time: 0, offset: 15 },
		{ name: 'Corellia Space', type: 'space', time: 0, offset: 16 },
		{ name: 'Bestine', type: 'ground', time: 0, offset: 17 },
		{ name: 'Tatooine Space', type: 'space', time: 0, offset: 18 },
		{ name: 'Dearic', type: 'ground', time: 0, offset: 19 },
		{ name: 'Lok Space', type: 'space', time: 0, offset: 20 },
		{ name: 'Keren', type: 'ground', time: 0, offset: 21 },
		{ name: 'Dantooine Space', type: 'space', time: 0, offset: 22 },
		{ name: 'Bestine', type: 'ground', time: 0, offset: 23 },
	]

	const invasionData = [
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

		const interval = setInterval(() => {
			update({ hideSpace, hideGround });
		}, 1000);
		return () => clearInterval(interval)
	}, [hideGround, hideSpace]);

	function onGroundChange(event) {

		setGround(!hideGround);
	}
	function onSpaceChange(event) {

		setSpace(!hideSpace);
	}

	function getInvasionDetails(name) {
		for (let i = 0; i < invasionData.length; i++) {
			if (invasionData[i].name === name) {
				return invasionData[i];
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


	function update({ hideSpace, hideGround }) {
		const _date = new Date();
		console.log('date', _date);

		let utc = _date.toUTCString();
		let local = _date.toString();

		setDate(_date);
		setUTC(utc);
		setLocal(local);

		// check invasions against utc time 
		// const offset = _date.getUTCHours();
		// console.log('offset', offset);

		const mins = _date.getUTCMinutes();

		let _current = null;
		let _upcomining = null;
		let _following = [];

		let index = 0;
		for (let i = 0; i < list.length; i++) {
			if (offset === list[i].offset) {
				index = i;
			}
		}

		let sorted = list.slice(index);
		sorted = sorted.concat(list.slice(0, index));

		let filtered = [];

		for (let i = 0; i < sorted.length; i++) {
			if (hideSpace && sorted[i].type === 'space') {

			}
			else if (hideGround && sorted[i].type === 'ground') {

			}
			else {
				filtered.push(sorted[i]);
			}
		}

		for (let i = 0; i < filtered.length; i++) {
			let item = {
				...filtered[i],
				...getInvasionDetails(filtered[i].name)
			}

			if (offset === item.offset) {
				item.time = 60 - mins;
			}
			else if (offset > item.offset) {
				item.time = (item.offset + 24 - offset) * 60 - mins;
			}
			else {
				item.time = (item.offset - offset) * 60 - mins;
			}

			filtered[i] = item;
		}

		setInvasions(filtered);

		const flash = mins;

		setFlashpoint(flash);
	}

	return (

		<div className="container">

			<Header />
			<main className={styles.main}>
				<div className={styles.invasions}>
					<p> {displayUTC ? displayUTC : '---, -- --- ---- --:--:-- ---'}</p>

					<h1> Flashpoint </h1>
					<h4> {flashpoint < 45 ? `Time Remaining: ${45 - flashpoint} mins` : `Starting in: ${15-flashpoint%45} mins`} </h4>

					<h1> Invasions </h1>

					<div className="flex">
						<Toggle value={hideGround} onChange={onGroundChange}> Hide Ground </Toggle>
						<Toggle value={hideSpace} onChange={onSpaceChange}> Hide Space </Toggle>
					</div>
					<div className={styles.grid}>
						{invasions[0] ?
							<div className={styles.current}>
								<Image
									alt={invasions[0].name}
									src={invasions[0].image}
									width={300}
									height={200}
									style={{
										maxWidth: '100%',
										height: 'auto',
									}}
								/>
								{offset === invasions[0].offset ?
									<div className={styles.details}>
										<h4> Current Invasion: </h4>
										<h2> {invasions[0].name} </h2>

										<div className={styles['grow']}> </div>
										<h4> Time remaining: </h4>
										<h2> {getTime(invasions[0].time)} </h2>
										<p> {invasions[0].offset} GMT </p>
									</div>
									:
									<div className={styles.details}>
										<h4> Upcoming Invasion: </h4>
										<h2> {invasions[0].name} </h2>
										<div className={styles['grow']}> </div>
										<h4> Starting in: </h4>
										<h2> {getTime(invasions[0].time)} </h2>
										<p> {invasions[0].offset} GMT </p>
									</div>
								}
							</div>
							: null
						}
						{invasions[1] ?
							<div className={styles.upcoming}>
								<Image
									alt={invasions[1].name}
									src={invasions[1].image}
									width={300}
									height={200}
									style={{
										maxWidth: '100%',
										height: 'auto',
									}}
								/>
								{offset > invasions[1].offset ?
									<div className={styles.details}>
										<h4> Current Invasion: </h4>
										<h2> {invasions[1].name} </h2>

										<div className={styles['grow']}> </div>
										<h4> Time remaining: </h4>
										<h2> {getTime(invasions[1].time)} </h2>
										<p> {invasions[1].offset} GMT </p>
									</div>
									:
									<div className={styles.details}>
										<h4> Upcoming Invasion: </h4>
										<h2> {invasions[1].name} </h2>
										<div className={styles['grow']}> </div>
										<h4> Starting in: </h4>
										<h2> {getTime(invasions[1].time)} </h2>
										<p> {invasions[1].offset} GMT </p>
									</div>
								}
							</div>
							: null
						}



						{/* <div className={styles.current}>
							{invasions?.map((item, key) => {
								return (key < 1 ?
									<>
										<Image
											alt={invasions[0].name}
											src={invasions[0].image}
											width={300}
											height={200}
											style={{
												maxWidth: '100%',
												height: 'auto',
											}}
										/>
										<div className={styles.details}>
											<h4> Current Invasion: </h4>
											<h2> {invasions[0].name} </h2>

											<div className={styles['grow']}> </div>
											<h4> Time remaining: </h4>
											<h2> {getTime(invasions[0].time)} </h2>
											<p> {invasions[0].offset} GMT </p>
										</div>
									</>
									:
									null
								)
							})}



							{offset === invasions[0].offset ?
								<>
									<Image
										alt={invasions[0].name}
										src={invasions[0].image}
										width={300}
										height={200}
										style={{
											maxWidth: '100%',
											height: 'auto',
										}}
									/>
									<div className={styles.details}>
										<h4> Current Invasion: </h4>
										<h2> {invasions[0].name} </h2>

										<div className={styles['grow']}> </div>
										<h4> Time remaining: </h4>
										<h2> {getTime(invasions[0].time)} </h2>
										<p> {invasions[0].offset} GMT </p>
									</div>
								</>

								: null
							}
						</div> */}

						{/* <div className={styles.upcoming}>
							{invasions[1] && offset >= invasions[0].offset + 1 ?
								<>
									<div className={styles.details}>
										<h4> Upcoming Invasion: </h4>
										<h2> {invasions[1].name} </h2>
										<div className={styles['grow']}> </div>
										<h4> Starting in: </h4>
										<h2> {getTime(invasions[1].time)} </h2>
										<p> {invasions[1].offset} GMT </p>
									</div>
									<Image
										alt={invasions[1].name}
										src={invasions[1].image}
										width={300}
										height={200}
										style={{
											maxWidth: '100%',
											height: 'auto',
										}}
									/>
								</>

								: null
							}
						</div> */}
					</div>

					<div className="">
						<h4> Following Invasions: </h4>
						<div className={styles.following}>
							{invasions?.map((item, key) => {
								return (key > 1 ?
									<div className={styles.invasion}>
										<Image
											alt={item?.name}
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
									</div>
									: null)
							})}
						</div>
					</div>
				</div>
			</main >

			<Footer />
		</div >
	)
}