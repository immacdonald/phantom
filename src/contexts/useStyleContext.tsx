import { useContext } from 'react';
import { StyleContext, StyleContextInterface } from './StyleContext';

const useStyleContext = (): StyleContextInterface => {
    const context = useContext(StyleContext);

    if (context === undefined) {
        throw new Error('useStyleContext was used outside of its Provider');
    } else if (!context) {
        //throw new Error('useStyleContext is null');
        return {
            page: undefined
        };
    }

    return context;
};

export { useStyleContext };
