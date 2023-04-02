

// styles
import styles from './page-button.module.scss';

export default function PageButton({ children, disabled, ...props}) {

    return (
        <button className={`${styles.button} ${disabled? styles.disabled : ''} `}> 
            {children}
        </button>
    )
}