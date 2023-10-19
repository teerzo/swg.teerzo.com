'use client'

import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';

export type Themes = "rebel" | "light" | "imperial" | "dark" | null;
type ThemeState = {
    theme: Themes;
    setTheme(theme: Themes): void;
}

const initialState: ThemeState = {
    theme: 'light',
    setTheme: () => null
}

// const ThemeContext = createContext<ThemeState>();
export const ThemeContext = createContext<ThemeState>(initialState);

export const useTheme = (): ThemeState => {
    // return useContext(ThemeContext);

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("Not in Parent component")
    }

    return context;
}

// export default useTheme;



type Props = {
    children: React.ReactNode,
}

export const ThemeProvider = ({ children }: Props) => {
    const key = 'swg-tools-theme';
    // const _theme = window.localStorage.getItem(key)
    // const [theme, setNewTheme] = useState<Themes>(_theme ? _theme as Themes : 'light' );
    const [theme, setNewTheme] = useState<Themes>(null);

    useEffect(() => {
        const _theme = window.localStorage.getItem(key);

        // console.log('get theme', _theme);
        if (_theme) {
            setTheme(_theme as Themes);
        }
        // const _theme = window.localStorage.getItem(key)

    }, [])

    useEffect(() => {
        // console.log('theme', theme);
        if( theme ) {
            window.localStorage.setItem(key, theme);
        }


    }, [theme])

    function setTheme(theme: Themes) {
        // console.log('setTheme', theme);
        if (theme) {
            // console.log('setting theme', theme);

            setNewTheme(theme);
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={"main"} data-theme={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}
