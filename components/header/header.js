

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

            {width < 700 ?
                <>
                    <div className="grow"> </div>

                    <div onClick={toggleOverlay} className="hamburger"> ||| </div>
                    <div className={`${styles.overlay} ${overlay ? styles['show'] : styles['hide']} `}>
                        <div className={styles['flex']}>
                            <Link href="/character">
                                <NavButton> Character </NavButton>
                            </Link>
                            <Link href="/gcw">
                                <NavButton> GCW </NavButton>
                            </Link>
                            <Link href="/collections">
                                <NavButton> Collections </NavButton>
                            </Link>
                            <Link href="/space" disabled={true}>
                                <NavButton> Space </NavButton>
                            </Link>
                        </div>
                    </div>
                </>
                :
                <>
                    <Link href="/character">
                        <NavButton> Character </NavButton>
                    </Link>
                    <Link href="/gcw">
                        <NavButton> GCW </NavButton>
                    </Link>
                    <Link href="/collections">
                        <NavButton> Collections </NavButton>
                    </Link>
                    <Link href="/space" disabled={true}>
                        <NavButton> Space </NavButton>
                    </Link>

                    <div className="grow"> </div>

                    {/* <div className="flex-col margin-right">
                        <label> Server: </label>
                        <select>
                            <option> Legends </option>
                        </select>
                    </div> */}

                </>
            }


        </div>
    )
}

