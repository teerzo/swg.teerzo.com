import Header from 'components/header'
import Footer from 'components/Footer'
import Link from 'components/common/link';

import PageButton from 'components/common/page-button';

import { useState, useEffect } from 'react';

import styles from './pvp.module.scss';

import imgGCW from 'public/gcw.png';
import imgInvasions from 'public/keren2.png';

export default function PVP() {

	return (
		<div className="container">
			<Header />
			<main className={styles.pvp}>
				<div className={styles.grid}>
					<PageButton href="/pvp/calculator" disabled={false} image={imgGCW}> GCW Calculator </PageButton>
					<PageButton href="/pvp/invasions" disabled={false} image={imgInvasions}> Invasions </PageButton>
					<PageButton href="/pvp/battlefields" disabled={true}> Battlefields </PageButton>
				</div>
			</main >
			<Footer />
		</div >
	)
}
