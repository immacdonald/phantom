import { useContext } from 'react';
import { ResponsiveContext, ResponsiveContextInterface } from './ResponsiveContext';

const useResponsiveContext = (): ResponsiveContextInterface => {
    const context = useContext(ResponsiveContext);

    if (context === undefined) {
        throw new Error('useResponsiveContext was used outside of its Provider');
    } else if (!context) {
        throw new Error('useResponsiveContext is null');
    }

    return context;
};

export { useResponsiveContext };
