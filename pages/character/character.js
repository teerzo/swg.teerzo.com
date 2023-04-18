import Header from 'components/header'
import Footer from 'components/Footer'
import Link from 'components/common/link';

import PageButton from 'components/common/page-button';

import { useState, useEffect } from 'react';

export default function Character() {

    return (
        <div className="container">
            <Header />
            <main className="character">
                <h1> Character </h1>

                <div className="flex row">
                    <Link href="/character/view">
                        <PageButton disabled={true}>
                            My Characters
						</PageButton>
                    </Link>
                    <Link href="/character/expertise">
                        <PageButton >
                            Expertise Calculator
						</PageButton>
                    </Link>
                    <Link href="">
                        <PageButton disabled={true}>
                            Buffs and Consumables
						</PageButton>
                    </Link>

                </div>
            </main >
            <Footer />
        </div >
    )
}
