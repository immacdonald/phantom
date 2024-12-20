import type { Callback } from '@types';
import { useEffect, useRef } from 'react';

const useInterval = (callback: Callback<void>, delay: number | null): void => {
    const savedCallback = useRef<Callback<void> | null>(null);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const tick = (): void => {
            if (savedCallback.current != null) {
                savedCallback.current();
            }
        };
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return (): void => clearInterval(id);
        } else {
            return undefined;
        }
    }, [delay]);
};

export { useInterval };
