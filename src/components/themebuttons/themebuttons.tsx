
"use client"

import { useEffect, useState } from 'react';
import { FaRebel, FaEmpire, FaDesktop } from "react-icons/fa";
import { themeChange } from 'theme-change'
import cx from "classnames";

import useTheme from '../../hooks/useTheme';


interface themeProps {
    theme: string
    handleThemeChange: (newTheme: string) => void
}

export default function ThemeButtons({ theme, handleThemeChange }: themeProps) {

    useEffect(() => {
        themeChange(false);

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            console.log('handleThemeChange', handleThemeChange);

            handleThemeChange(savedTheme);
        }
        else {
            handleThemeChange('rebel');
        }

        return () => {
            themeChange(false);
        };
    }, []);

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

    const systemClass = cx(
        'btn',
        'theme-btn',
        'theme-btn-system',
        theme === 'system' ? 'text-secondary' : ''
    )

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('handleChange', event.target);
        handleThemeChange(event.target.id);
    }

    return (
        <>
            <div className="btn-group">

                <label htmlFor="rebel" className={rebelClass}>
                    <FaRebel className="icon" />
                    <input id="rebel" type="radio" name="theme-options" onChange={handleChange} data-set-theme="rebel" data-act-class="ACTIVECLASS" className="hidden" />
                </label>

                <label htmlFor="imperial" className={imperialClass}>
                    <FaEmpire className="icon" />
                    <input id="imperial" type="radio" name="theme-options" onChange={handleChange} data-set-theme="imperial" data-act-class="ACTIVECLASS" className="hidden" />
                </label>

                {/* <label htmlFor="system" className={systemClass}>
                    <FaDesktop className="icon" />
                    <input id="system" type="radio" name="theme-options" onChange={handleChange} data-set-theme="" data-act-class="ACTIVECLASS" className="hidden" />
                </label> */}

                {/* <label htmlFor="rebel" className={rebelClass}>
                    <FaRebel className="icon" />
                    <input id="rebel" type="radio" name="theme-options" onChange={handleChange} data-set-theme="light" data-act-class="ACTIVECLASS" className="hidden" />
                </label>

                <label htmlFor="imperial" className={imperialClass}>
                    <FaEmpire className="icon" />
                    <input id="imperial" type="radio" name="theme-options" onChange={handleChange} data-set-theme="dark" data-act-class="ACTIVECLASS" className="hidden" />
                </label> */}
            </div>
        </>
    )
}