import Header from 'components/header'
import Footer from 'components/Footer'
import Link from 'components/common/link';

import PageButton from 'components/common/page-button';

import { useState, useEffect } from 'react';

export default function GCW() {

	return (
		<div className="container">
			<Header />
			<main className="gcw">
				<h1> GCW </h1>

				<div className="flex row">
					<Link href="/gcw/calculator">
						<PageButton type="big">
							GCW Calculator
						</PageButton>
					</Link>
					<Link href="/gcw/timers">
						<PageButton type="big">
							Invasion timers
						</PageButton>
					</Link>
					<Link href="">
						<PageButton disabled={true}>
							Battlefields
						</PageButton>
					</Link>
	
				</div>
			</main >
			<Footer />
		</div >
	)
}
