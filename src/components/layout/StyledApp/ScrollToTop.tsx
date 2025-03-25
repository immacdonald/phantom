import type { FC } from 'react';
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return false;
};

export { ScrollToTop };
