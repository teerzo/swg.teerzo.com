

// styles
import styles from './nav-button.module.scss';

export default function NavButton({ children, disabled, ...props}) {

    return (
        <button className={`${styles.button} ${styles[disabled]} `}> 
            {children}
        </button>
    )
}