

// Local
import Link from 'components/common/link';
import NavButton from 'components/common/nav-button';

// Styles
import styles from './header.module.scss';
import Switch from 'components/common/switch';

// Images
// import imgTeerzo from 'public/teerzo.png';


export default function Header() {
    return (
        <div className={styles.header}>

            {/* <Image ? */}
            <Link href="/">
                <h3> SWG Teerzo </h3>
            </Link>
            {/* 
            <Link href="/">
                <NavButton> Home </NavButton>
            </Link> */}
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

            <div className="flex-col margin-right">
                <label> Server: </label>
                <select>
                    <option> Legends </option>
                </select>
            </div>

            <Switch> </Switch>
        </div>
    )
}

