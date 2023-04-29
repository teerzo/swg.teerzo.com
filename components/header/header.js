

// Local
import Link from 'components/common/link';
import NavButton from 'components/common/nav-button';

// Styles
import styles from './header.module.scss';
import Switch from 'components/common/switch';

// Images
// import imgTeerzo from 'public/teerzo.png';

import useWindowSize from 'components/hooks/useWindowSize';
import { useState } from 'react';

export default function Header() {

    const { height, width } = useWindowSize();

    const [overlay, setOverlay] = useState(false);

    function toggleOverlay() {
        setOverlay(!overlay);
    }

    return (
        <div className={styles.header}>
            <Link href="/">
                <h3> SWG Teerzo </h3>
            </Link>
            {width ?
                width < 600 ?
                    <>
                        <div className="grow"> </div>

                        <div onClick={toggleOverlay} className={styles.menu}> ||| </div>
                        <div className={styles.parent}>
                            <div className={`${styles.overlay} ${overlay ? styles['show'] : styles['hide']} `}>
                                <div className={styles['flex']}>

                                    <NavButton href="/character"> Character </NavButton>
                                    <NavButton href="/pvp"> PvP </NavButton>
                                    <NavButton href="/pve" disabled={true}> PvE </NavButton>
                                    <NavButton href="/collections" disabled={true}> Collections </NavButton>
                                    <NavButton href="/space" disabled={true}> Space </NavButton>

                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>

                        <NavButton href="/character"> Character </NavButton>
                        <NavButton href="/pvp"> PvP </NavButton>
                        <NavButton href="/pve" disabled={true}> PvE </NavButton>
                        <NavButton href="/collections" disabled={true}> Collections </NavButton>
                        <NavButton href="/space" disabled={true}> Space </NavButton>

                        <div className="grow"> </div>

                        {/* <div className="flex-col margin-right">
                        <label> Server: </label>
                        <select>
                            <option> Legends </option>
                        </select>
                    </div> */}
                    </>
                :
                null
            }



        </div>
    )
}

