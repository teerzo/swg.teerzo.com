'use client'

import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';

type Themes = "rebel" | "light" | "imperial" | "dark";
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
    const [theme, setNewTheme] = useState<Themes>('light');

    useEffect(() => {
        console.log('theme', theme);
    }, [theme])

    function setTheme(theme: Themes) {
        console.log('setTheme', theme);
        if (theme) {
            console.log('setting theme', theme);

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
