import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

const useIsVisible = (ref: RefObject<HTMLElement>): boolean => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

        if (ref.current) {
            observer.observe(ref.current);
        }

        return (): void => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
};

export { useIsVisible };
