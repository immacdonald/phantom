import type { Callback } from '@types';
import { useEffect } from 'react';

const useBackButton = (callback: Callback<void>): boolean => {
    const handleEvent = (): void => {
        callback();
    };

    useEffect(() => {
        window.addEventListener('popstate', handleEvent);
        return (): void => window.removeEventListener('popstate', handleEvent);
    });

    return true;
};

export { useBackButton };
