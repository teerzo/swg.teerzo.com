import Link from 'components/common/link';
import { useRouter } from 'next/router'

// styles
import styles from './nav-button.module.scss';
import { useEffect } from 'react';

export default function NavButton({ children, disabled, href, ...props }) {

    const router = useRouter()

    useEffect(() => {
        console.log('nav-button', href, router);
    },[router]);

    return (

        <Link href={ !disabled ? href : ''}>
            <button className={`${styles.button} ${disabled ? styles.disabled : ''} ${router.pathname.indexOf(href) === 0 ? styles.selected : ''}`}>
                {children}
            </button>
        </Link>

    )
}