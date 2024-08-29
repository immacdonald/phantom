import { createContext, FC, ReactElement, ReactNode } from 'react';

interface StyleContextInterface {
    page?: {
        defaultHeader?: ReactNode;
        defaultFooter?: ReactNode;
    };
}

const StyleContext = createContext<StyleContextInterface | null>(null);

interface StyleContextProviderProps extends StyleContextInterface {
    children: ReactNode;
}

const StyleContextProvider: FC<StyleContextProviderProps> = ({ page, children }): ReactElement => {
    return <StyleContext.Provider value={{ page }}>{children}</StyleContext.Provider>;
};

export type { StyleContextInterface as StyleConfiguration, StyleContextInterface };
export { StyleContext, StyleContextProvider };
