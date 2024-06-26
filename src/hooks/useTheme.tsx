import { useEffect, useState } from 'react';
import { SetState, Theme } from '@types';

const useTheme = (): [Theme, SetState<Theme>] => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return [theme, setTheme];
};

export { useTheme };
