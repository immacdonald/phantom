import { useEffect, useState } from 'react';

const useScrollDistance = (): number => {
    const [distance, setDistance] = useState<number>(0);

    useEffect(() => {
        const handleScroll = (): void => {
            setDistance(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return (): void => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return distance;
};

export { useScrollDistance };
