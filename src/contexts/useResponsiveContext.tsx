import type { Theme } from '@types';
import { useContext } from 'react';
import { ResponsiveContext, ResponsiveContextInterface } from './ResponsiveContext';

const useResponsiveContext = (): ResponsiveContextInterface => {
    const context = useContext(ResponsiveContext);

    if (context === undefined) {
        throw new Error('useResponsiveContext was used outside of its Provider');
    } else if (!context) {
        throw new Error('useResponsiveContext is null');
        console.warn('useResponsiveContext is null');
        return {
            parse: () => undefined,
            atBreakpoint: () => false,
            isMobile: false,
            windowSize: { width: window.innerWidth, height: window.innerHeight },
            theme: (localStorage.getItem('theme') as Theme) || 'light',
            setTheme: (): void => {},
            toggleTheme: (): void => {},
            isResponsiveContextLoaded: false
        };
    }

    return context;
};

export { useResponsiveContext };
