
import { useRouter } from 'next/router'

import styles from './link.module.scss';

export default function Link({ children, href, disabled}) {
    const router = useRouter()
    return (
        <a className={`${styles.link} ${disabled? styles.disabled : ''} `}
            href="#"
            onClick={(e) => {
                e.preventDefault()
                // typically you want to use `next/link` for this usecase
                // but this example shows how you can also access the router
                // and use it manually
                if( !disabled) {
                    console.log('link', disabled, href);
                    router.push(href)
                }
            }}
        >
            {children}
        </a>
    )
}