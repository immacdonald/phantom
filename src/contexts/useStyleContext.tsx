import { useContext } from 'react';
import { StyleContext, StyleContextInterface } from './StyleContext';

const useStyleContext = (): StyleContextInterface => {
    const context = useContext(StyleContext);

    if (context === undefined) {
        throw new Error('useStyleContext was used outside of its Provider');
    } else if (!context) {
        //throw new Error('useStyleContext is null');
        console.warn('useStyleContext is null');
        return {
            config: undefined,
            computeClasses: () => ''
        };
    }

    return context;
};

export { useStyleContext };
