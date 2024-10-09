import { Theme } from '@types';
import clsx from 'clsx';
import { createContext, FC, ReactElement, ReactNode, useCallback } from 'react';

interface ComponentDefaultConfig {
    defaultClassName?: string;
}

interface StyleContextInterface {
    config?: {
        initialTheme?: Theme;
        // Feedback
        banner?: {
            enabled: boolean;
        } & ComponentDefaultConfig;
        loading?: ComponentDefaultConfig;
        modal?: {
            enabled: boolean;
            controller?: ComponentDefaultConfig;
        } & ComponentDefaultConfig;
        // General

        // Layout
        page?: {
            defaultHeader?: ReactNode;
            defaultFooter?: ReactNode;
            defaultTitle?: string;
        } & ComponentDefaultConfig;
        row?: ComponentDefaultConfig;
    };
    computeClasses: (style: string, component: string, className?: string) => string;
}

const StyleContext = createContext<StyleContextInterface | null>(null);

interface StyleConfiguration extends Omit<StyleContextInterface, 'computeClasses'> {};

interface StyleContextProviderProps extends StyleConfiguration {
    children: ReactNode;
}

const StyleContextProvider: FC<StyleContextProviderProps> = ({ config, children }): ReactElement => {
    const computeClasses = useCallback(
        (style: string, component: string, className?: string) => {
            return clsx(style, ((config || {}) as Record<string, ComponentDefaultConfig>)[component]?.defaultClassName, className);
        },
        [config]
    );

    return <StyleContext.Provider value={{ config, computeClasses }}>{children}</StyleContext.Provider>;
};

export type { StyleConfiguration, StyleContextInterface };
export { StyleContext, StyleContextProvider };
