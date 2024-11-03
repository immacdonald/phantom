import type { Breakpoints, Callback, Dimensions, ResponsiveObject, ResponsiveType, Theme } from '@types';
import { createContext, FC, ReactElement, ReactNode } from 'react';
import { useTheme, useWindowSize } from '@hooks';
import { designTokens } from '../styles/tokens';

const breakpoints: Record<Breakpoints, string> = {
    xs: designTokens.screen.xs,
    sm: designTokens.screen.sm,
    md: designTokens.screen.md,
    lg: designTokens.screen.lg,
    xl: designTokens.screen.xl
};

function isResponsiveObject<T>(obj: ResponsiveType<T>): boolean {
    if (typeof obj != 'object') {
        return false;
    }

    return ['base', ...Object.keys(breakpoints)].some((key: string) => key in (obj as ResponsiveObject<T>));
}

const pxToInt = (property: string): number => {
    const pixels = property.split('px')[0];
    return +pixels;
};

const getCurrentBreakpoint = (width: number): Breakpoints | null => {
    for (const [breakpoint, token] of Object.entries(breakpoints)) {
        if (width <= pxToInt(token)) {
            return breakpoint as Breakpoints;
        }
    }

    return null;
};

interface ResponsiveContextInterface {
    windowSize: Dimensions;
    theme: Theme;
    setTheme: Callback<Theme>;
    toggleTheme: Callback<void>;
    atBreakpoint: (breakpoint: Breakpoints) => boolean;
    parse: <T>(responsiveType: ResponsiveType<T> | undefined) => T | undefined;
    isMobile: boolean;
    isResponsiveContextLoaded: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextInterface | null>(null);

interface ResponsiveContextProviderProps {
    minimizeCookies?: boolean;
    initialTheme?: Theme;
    children: ReactNode;
}

const ResponsiveContextProvider: FC<ResponsiveContextProviderProps> = ({ minimizeCookies, initialTheme, children }): ReactElement => {
    const windowSize = useWindowSize();
    const [theme, setTheme] = useTheme(initialTheme, !minimizeCookies);

    const toggleTheme = (): void => {
        setTheme(theme == 'light' ? 'dark' : 'light');
    };

    const atBreakpoint = (breakpoint: Breakpoints): boolean => {
        const currentBreakpoint: Breakpoints | null = getCurrentBreakpoint(windowSize.width);
        if (currentBreakpoint) {
            if (Object.keys(breakpoints).indexOf(currentBreakpoint) <= Object.keys(breakpoints).indexOf(breakpoint)) {
                return true;
            }
        }

        return false;
    };

    const parse = <T,>(responsiveType: ResponsiveType<T> | undefined): T | undefined => {
        if (responsiveType == undefined) {
            return undefined;
        }
        // If responsiveType is just a static value return it
        if (!isResponsiveObject(responsiveType)) {
            return responsiveType as T;
        }

        const responsiveObject = responsiveType as ResponsiveObject<T>;

        // If it's a ResponsiveObject find the value for the breakpoint
        const breakpoint: Breakpoints | null = getCurrentBreakpoint(windowSize.width);
        if (breakpoint) {
            const breakpointTokens: Breakpoints[] = Object.keys(breakpoints) as Breakpoints[];
            for (const key of breakpointTokens) {
                if (breakpointTokens.indexOf(breakpoint) <= breakpointTokens.indexOf(key) && key in responsiveObject) {
                    return responsiveObject[key];
                }
            }
        }

        return responsiveObject.base;
    };

    const isMobile = windowSize.width < pxToInt(designTokens.screen.sm);

    return <ResponsiveContext.Provider value={{ parse, atBreakpoint, isMobile, windowSize, theme, setTheme, toggleTheme, isResponsiveContextLoaded: true }}>{children}</ResponsiveContext.Provider>;
};

export { ResponsiveContext, ResponsiveContextProvider };
export type { ResponsiveContextInterface };
