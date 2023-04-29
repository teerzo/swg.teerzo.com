import Header from 'components/header'
import Footer from 'components/Footer'

import PageButton from 'components/common/page-button';

import { useState, useEffect } from 'react';

import styles from './expertise.module.scss';

import imgJedi from 'public/buttons/bg-jedi.png';
import imgBountyHunter from 'public/buttons/bg-bountyhunter.png';
import imgSmuggler from 'public/buttons/bg-smuggler.png';

import imgOfficer from 'public/buttons/bg-officer.png';
import imgCommando from 'public/buttons/bg-commando.png';
import imgSpy from 'public/buttons/bg-spy.png';

import imgTrader from 'public/buttons/bg-trader.png';
import imgMedic from 'public/buttons/bg-medic.png';
import imgEntertainer from 'public/buttons/bg-entertainer.png';


export default function Expertise() {

    return (
        <div className="container">
            <Header />
            <main className="character">
                <div className={styles.grid}>
                    <PageButton href="./expertise/jedi" disabled={true} image={imgJedi}> Jedi </PageButton>
                    <PageButton href="./expertise/bountyhunter" disabled={true} image={imgBountyHunter}> Bounty Hunter </PageButton>
                    <PageButton href="./expertise/smuggler" disabled={true} image={imgSmuggler}> Smuggler </PageButton>

                    <PageButton href="./expertise/officer" image={imgOfficer}> Officer </PageButton>
                    <PageButton href="./expertise/commando" disabled={true} image={imgCommando}> Commando </PageButton>
                    <PageButton href="./expertise/spy" disabled={true} image={imgSpy}> Spy </PageButton>

                    <PageButton href="./expertise/trader" disabled={true} image={imgTrader}> Trader </PageButton>
                    <PageButton href="./expertise/medic" disabled={true} image={imgMedic}> Medic </PageButton>
                    <PageButton href="./expertise/entertainer" disabled={true} image={imgEntertainer}> Entertainer </PageButton>

                </div>
            </main >
            <Footer />
        </div >
    )
}
