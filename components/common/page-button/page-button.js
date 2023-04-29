import Link from 'components/common/link';
import Image from 'next/image';

// styles
import styles from './page-button.module.scss';

export default function PageButton({ children, disabled, href, image, ...props }) {

    return (


        <Link href={href} disabled={disabled}>
            <button className={`${styles.button} ${disabled ? styles.disabled : ''} `}>
                <div
                    // id={props.id}
                    // onClick={onLeftClick}
                    // onLeftClick={onLeftClick}
                // onContextMenu={onRightClick}

                    // alt={name}

                    style={{
                        backgroundImage: `url(${image?.src})`,

                        // opacity: count > 0 ? 1.0 : 0.3,
                        // maxWidth: '100%',
                        // height: 'auto',
                    }}
                >
                </div>

                <span> {children} </span>
            </button>
        </Link>
    )
}


