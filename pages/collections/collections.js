// Packages
// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// Local
import Header from 'components/header'
import Footer from 'components/Footer'
import Link from 'components/common/link';
import PageButton from 'components/common/page-button';

export default function Collections() {

    return (
        <div className="container">
            <Header />
            <main>
                <h1> Collections </h1>

                <div className="flex row">
                    <Link href="/collections/badges">
                        <PageButton type="big">
                            Badges
						</PageButton>
                    </Link>
                    <Link href="/pvp/timers">
                        <PageButton disabled={true}>
                            Space?
						</PageButton>
                    </Link>
                    <Link href="">
                        <PageButton disabled={true}>
                            Misc?
						</PageButton>
                    </Link>
                </div>

            </main>
            <Footer />
        </div>
    )
}
