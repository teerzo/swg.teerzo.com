'use client'

import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';

export type Themes = "rebel" | "light" | "imperial" | "dark" | null;
type ThemeState = {
    theme: Themes;
    setTheme(theme: Themes): void;
}

const initialState: ThemeState = {
    theme: 'imperial', // Default to imperial theme
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
    const [theme, setNewTheme] = useState<Themes>('imperial'); // Default to imperial theme
    const [initialized, setInitialized] = useState(false);

    // Initialize theme from localStorage only once
    useEffect(() => {
        if (initialized) return;
        
        try {
            const savedTheme = localStorage.getItem(key);
            if (savedTheme) {
                setNewTheme(savedTheme as Themes);
            }
            setInitialized(true);
        } catch (error) {
            console.error('Error initializing theme:', error);
            setInitialized(true);
        }
    }, [initialized]);

    // Save theme to localStorage when it changes
    useEffect(() => {
        if (!initialized) return;
        
        try {
            if (theme) {
                localStorage.setItem(key, theme);
            }
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    }, [theme, initialized]);

    function setTheme(newTheme: Themes) {
        // console.log('setTheme', theme);
        if (newTheme) {
            // console.log('setting theme', newTheme);

            setNewTheme(newTheme);
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
