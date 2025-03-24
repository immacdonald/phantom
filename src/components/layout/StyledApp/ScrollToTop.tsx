import type { FC } from 'react';
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return false;
};

export { ScrollToTop };
