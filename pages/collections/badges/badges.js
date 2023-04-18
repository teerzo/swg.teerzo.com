
// Packages
import { useState, useEffect, useId } from 'react';
import Image from 'next/image';

// Local
import Header from 'components/header'
import Footer from 'components/Footer'
import Link from 'components/common/link';
import PageButton from 'components/common/page-button';

// Styles
import styles from './badges.module.scss';

// images
import imgLiveEventMedal from 'public/live-event-medal.png';
import imgLegendsYearFour from 'public/legends-year-four.png';
import imgLegendsYearFive from 'public/legends-year-five.png';


export default function Badges() {

    const [total, setTotal] = useState(0);

    const allBadges = [
        {

            type: 'base',
            title: 'Content Badges',
            groups: [
                {

                    type: 'sub',
                    title: 'Accolades',
                    badges: [
                        { name: 'live-event-medal', title: 'Accolade: Live Event Medal', description: '', image: imgLiveEventMedal, },
                        { name: 'legends-year-four', title: 'Accolade: Celebrated Legends Year Four Anniversary', description: '', image: imgLegendsYearFour },
                        { name: 'legends-year-five', title: 'Accolade: Celebrated Legends Year Fifth Anniversary', description: '', image: imgLegendsYearFive },
                        { name: 'legends-year-six', title: 'Accolade: Celebrated Legends Year Sixth Anniversary', description: '', image: imgLegendsYearFive },
                        { name: 'legends-year-seven', title: 'Accolade: Celebrated Legends Year Seventh Anniversary', description: '', image: imgLegendsYearFive },
                        { name: 'senate-nine', title: 'Accolade: Voted in the Nineth Galactic Senate', description: '', image: imgLiveEventMedal, },
                        { name: 'senate-ten', title: 'Accolade: Voted in the Nineth Galactic Senate', description: '', image: imgLiveEventMedal, },
                        { name: 'senate-eleven', title: 'Accolade: Voted in the Nineth Galactic Senate', description: '', image: imgLiveEventMedal, },
                        { name: 'senate-twelve', title: 'Accolade: Voted in the Nineth Galactic Senate', description: '', image: imgLiveEventMedal, },
                        { name: 'senate-thirteen', title: 'Accolade: Voted in the Nineth Galactic Senate', description: '', image: imgLiveEventMedal, },
                        { name: 'senate-fourteen', title: 'Accolade: Voted in the Nineth Galactic Senate', description: '', image: imgLiveEventMedal, },
                        { name: 'senate-fourteen', title: 'Accolade: Voted in the Nineth Galactic Senate', description: '', image: imgLiveEventMedal, },
                        
                    ]

                },
                {
                    type: 'sub',
                    title: 'Demolished Buildings',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                {
                    type: 'sub',
                    title: 'Miscellaneous Events',
                    badges: [
                        { name: 'wrecking-crew-junior', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },
                        { name: 'wrecking-crew-extra', title: 'Junior wrecking Crew Worker', description: '', image: imgLiveEventMedal, },

                    ]
                },
                
                
            ]

        }
    ]




    return (
        <div className="container">
            <Header />
            <main className={styles.main}>
                <div className={styles.banner}>
                    <h1> Badges </h1>
                    <h3> Total: {total} </h3>
                </div>

                <div className={styles.all}>
                    {allBadges.map((base, baseK) => {
                        return (
                            <div key={baseK} className={styles.base}>
                                <p> {base.title} </p>
                                {base.groups.map((sub, subK) => {
                                    return (
                                        <div className={styles.sub}>
                                            <p> {sub.title} </p>
                                            <div className={styles.badges}>
                                                {sub.badges.map((badge, badgeK) => {
                                                    return (
                                                        <Badge badge={badge} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}



                    {/* <div className={styles.base}>
                        <p> Exploration Badges </p>

                        <div className={styles.sub}>
                            <p> Jedi Exploration Badge Collection </p>
                            {badges.content.groups}
                        </div>
                    </div>


                    <div className={styles.base}>
                        <p> Content Badges </p>

                        <div className={styles.sub}>
                            <p> Accolades </p>

                        </div>
                    </div> */}

                </div>

            </main>
            <Footer />
        </div>
    )
}


function Badge({ badge, ...props }) {

    const badgeId = useId()

    const [show, setShow] = useState(false);

    const handleOnMouseOver = (event) => {
        const element_id = event.target.id;
        // console.log(element_id);
        setShow(true);
    };

    
    const handleOnMouseLeave = (event) => {
        const element_id = event.target.id;
        // console.log(element_id);
        setShow(false);
    };

    return (
        <div id={badgeId} className={styles.badge} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
            <Image
                alt={badge.description}
                src={badge?.image}
                width={100}
                height={100}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />

            {show ?
                <div className={styles.hover}>
                    <p> {badge.title} </p>
                    <br/>
                    <p> {badge.description ? badge.description : 'No description provided'} </p>
                </div>
                :
                <> </>}
        </div>
    )
}