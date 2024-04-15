import { ReactNode, createContext } from "react";
import { useWindowSize } from '../hooks';
import { Breakpoints, Dimensions, ResponsiveObject, ResponsiveType } from "../types";

const breakpoints: Breakpoints[] = ['xs', 'sm', 'md', 'lg', 'xl'];

function isResponsiveObject<T>(obj: ResponsiveType<T>): boolean {
    if (typeof obj != 'object') {
        return false;
    }

    return ['base', ...breakpoints].some((key: string) => key in (obj as ResponsiveObject<T>));
}

/*function pxToInt(property: string): number {
    const pixels = property.split('px')[0];
    return +pixels;
}*/


function getCurrentBreakpoint(width: number): Breakpoints | null {
    //if (width < pxToInt)
    if(width) {
        //
    }
    return null;
}

interface ResponsiveContextInterface {
    windowSize: Dimensions,
    parse: <T, >(responsiveType: ResponsiveType<T>) => T,
    isMobile: boolean
}

const ResponsiveContext = createContext<ResponsiveContextInterface | null>(null);

const ResponsiveContextProvider = ({ children }: { children: ReactNode }) => {
    const windowSize = useWindowSize();

    const parse = <T,>(responsiveType: ResponsiveType<T>): T => {
        // If responsiveType is just a static value return it
        if (!isResponsiveObject(responsiveType)) {
            return responsiveType as T;
        }

        const responsiveObject = responsiveType as ResponsiveObject<T>

        // If it's a ResponsiveObject find the value for the breakpoint
        const breakpoint: Breakpoints | null = getCurrentBreakpoint(windowSize.width);
        if (breakpoint) {
            for (const key of breakpoints) {
                if (breakpoints.indexOf(breakpoint) <= breakpoints.indexOf(key) && key in responsiveObject) {
                    // @ts-expect-error even though the key is confirmed to exist
                    return responsiveObject[key];
                }
            }
        }

        return responsiveObject.base;
    }

    const isMobile = false;

    return (
        <ResponsiveContext.Provider value={{ parse, isMobile, windowSize }}>{children}</ResponsiveContext.Provider>
    )
}

export { ResponsiveContext, ResponsiveContextProvider }
export type { ResponsiveContextInterface }