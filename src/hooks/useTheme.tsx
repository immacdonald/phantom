import { SetState, Theme } from '@types';
import { useEffect, useState } from 'react';

const useTheme = (initialTheme?: Theme, serialize: boolean = true): [Theme, SetState<Theme>] => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = serialize ? (localStorage.getItem('theme') as Theme) : null;
        return savedTheme || initialTheme || 'light';
    });

    useEffect(() => {
        if (serialize) {
            localStorage.setItem('theme', theme);
        }
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return [theme, setTheme];
};

export { useTheme };
