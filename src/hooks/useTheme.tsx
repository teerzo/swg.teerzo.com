

import { useEffect, useState } from 'react';

export default function useTheme() {

    const [theme, updateTheme] = useState('');

    const setTheme = (newTheme: string) => {
        console.log('setTheme', newTheme);
        updateTheme(newTheme);
    }

    useEffect(() => {
        console.log('theme', theme);
    },[theme]);

    // function setTheme(newTheme: string) {

    //     updateTheme(newTheme);
    // }

    return [theme, setTheme] as const;
}