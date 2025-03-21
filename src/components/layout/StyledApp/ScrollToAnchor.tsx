import { FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor: FC = () => {
    const location = useLocation();
    const lastHash = useRef<string>('');

    // Listen to location change using useEffect with location as dependency
    // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
    useEffect(() => {
        if (location.hash) {
            lastHash.current = location.hash.slice(1);
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document.getElementById(lastHash.current)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                lastHash.current = '';
            }, 100);
        }
    }, [location]);

    return null;
};

export { ScrollToAnchor };
