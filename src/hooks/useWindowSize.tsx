import type { Dimensions } from '@types';
import { useEffect, useState } from 'react';

const useWindowSize = (): Dimensions => {
    // Use the ScreenSize type for the state
    const [windowSize, setWindowSize] = useState<Dimensions>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = (): void => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return (): void => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

export { useWindowSize };
