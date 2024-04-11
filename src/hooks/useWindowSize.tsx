import { useEffect, useState } from 'react';

// Define a type for the screenSize state
type WindowSize = {
    width: number;
    height: number;
};

const useWindowSize = () => {
    // Use the ScreenSize type for the state
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

export { useWindowSize };
