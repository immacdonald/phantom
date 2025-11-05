import type { SetState, Theme } from '@types';
import { useEffect, useState } from 'react';

const useTheme = (initialTheme: Theme = 'light', serialize: boolean = true): [Theme, SetState<Theme>] => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (!serialize) return initialTheme;
        try {
            const saved = localStorage.getItem('theme');
            return (saved as Theme) || initialTheme;
        } catch {
            return initialTheme;
        }
    });

    useEffect(() => {
        try {
            if (serialize) {
                localStorage.setItem('theme', theme);
            }
        } catch {
            // No local serialization
        }
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return [theme, setTheme];
};

export { useTheme };
