import Header from 'components/header'
import Footer from 'components/Footer'
import Link from 'components/common/link';

import PageButton from 'components/common/page-button';

// styles
import './character.scss';

import imgExpertise from 'public/buttons/bg-expertise.png';
import imgCharacters from 'public/buttons/bg-characters.png';
import imgBuffs from 'public/buttons/bg-buffs.png';

export default function Character() {

    return (
        <div className="container">
            <Header />
            <main className="character">
                <div className="grid">
                    <PageButton href="/character/view" disabled={true} image={imgCharacters}> My Characters </PageButton>
                    <PageButton href="/character/expertise" disabled={false} image={imgExpertise}> Expertise Calculator </PageButton>
                    <PageButton href="/character/buffs" disabled={true} image={imgCharacters}> Buffs and Consumables </PageButton>
                </div>
            </main >
            <Footer />
        </div >
    )
}
