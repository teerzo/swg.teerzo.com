import Header from 'components/header'
import Footer from 'components/Footer'
import Link from 'components/common/link';

import PageButton from 'components/common/page-button';

import { useState, useEffect } from 'react';

export default function Expertise() {

    return (
        <div className="container">
            <Header />
            <main className="character">
                <h1> Expertise </h1>

                <div className="flex row">
                    <Link href="./expertise/jedi">
                        <PageButton disabled={true}>
                            Jedi
						</PageButton>
                    </Link>
                    <Link href="./expertise/bountyhunter">
                        <PageButton disabled={true}>
                            Bounty Hunter
						</PageButton>
                    </Link>
                    <Link href="./expertise/smuggler">
                        <PageButton disabled={true}>
                            Smuggler
						</PageButton>
                    </Link>
                </div>

                <div className="flex row">
                    <Link href="./expertise/officer">
                        <PageButton>
                            Officer
						</PageButton>
                    </Link>
                    <Link href="./expertise/commando">
                        <PageButton disabled={true}>
                            Commando
						</PageButton>
                    </Link>
                    <Link href="./expertise/spy">
                        <PageButton disabled={true}>
                            Spy
						</PageButton>
                    </Link>
                </div>
                <div className="flex row">
                    <Link href="./expertise/trader">
                        <PageButton disabled={true}>
                            Trader
						</PageButton>
                    </Link>
                    <Link href="./expertise/medic">
                        <PageButton disabled={true}>
                            Medic
						</PageButton>
                    </Link>
                    <Link href="./expertise/entertainer">
                        <PageButton disabled={true}>
                            Entertainer
						</PageButton>
                    </Link>
                </div>
            </main >
            <Footer />
        </div >
    )
}
