

// Local
import Link from 'components/common/link';
import NavButton from 'components/common/nav-button';

// Styles
import styles from './header.module.scss';

// Images
// import imgTeerzo from 'public/teerzo.png';


export default function Header() {
    return (
        <div className={styles.header}>

            {/* <Image ? */}
            <h3> SWG Teerzo </h3>

            <Link href="/">
                <NavButton> Home </NavButton>
            </Link>

            {/* <div className={styles.border}> </div> */}

            <Link href="/gcw">
                <NavButton> GCW </NavButton>
            </Link>
            <Link href="/expertise">
                <NavButton> Expertise </NavButton>
            </Link>
        </div>
    )
}

