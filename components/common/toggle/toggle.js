
import { useId } from 'react';



export default function Toggle({ children, value, ...props }) {
    const checkboxId = useId()

    function handleChange(event) {

        if( props.onChange) {
            props.onChange(event);
        }
    }

    return (
        <div>
            <input id={checkboxId} checked={value} onChange={handleChange} type="checkbox" />
            <label htmlFor={checkboxId}> {children} </label>
        </div>
    )
}