
import { useId } from 'react';


import styles from './switch.module.scss';

export default function Switch({ children, ...props }) {
    const checkboxId = useId()

    return (
        // <div>
        //     <input id={checkboxId} type="checkbox" />
        //     <label htmlFor={checkboxId}> {children} </label>
        // </div>

        <div className={styles.wrapper}>
            <label className={styles['switch']} htmlFor={checkboxId}>
                <input id={checkboxId} type="checkbox" />
                <div className={styles['slider']}></div>
            </label>
        </div>
    )
}