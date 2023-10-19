
"use client"

import { FaRebel, FaEmpire } from "react-icons/fa";
import cx from "classnames";

import { useTheme } from '../../theme-provider';

type Themes = "rebel" | "light" | "imperial" | "dark";

export default function ThemeButtons() {
    const { theme, setTheme } = useTheme();

    const rebelClass = cx(
        'btn',
        'theme-btn',
        'theme-btn-rebel',
        theme === 'rebel' ? 'text-secondary' : ''
    )

    const imperialClass = cx(
        'btn',
        'theme-btn',
        'theme-btn-imperial',
        theme === 'imperial' ? 'text-secondary' : ''
    )

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('handleChange', event.target.id);
        const newTheme = event.target.id;
        setTheme(newTheme as Themes);
    }

    return (
        <>
            <div className="btn-group">
                <label htmlFor="light" className={rebelClass}>
                    <FaRebel className="icon" />
                    <input id="light" type="radio" name="theme-options" onChange={handleChange} data-set-theme="light" data-act-class="ACTIVECLASS" className="hidden" />
                </label>

                <label htmlFor="dark" className={imperialClass}>
                    <FaEmpire className="icon" />
                    <input id="dark" type="radio" name="theme-options" onChange={handleChange} data-set-theme="dark" data-act-class="ACTIVECLASS" className="hidden" />
                </label>
            </div>
        </>
    )
}