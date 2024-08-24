import { Position } from '@types';
import { useEffect, useState } from 'react';

const useMousePosition = (): Position => {
    const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent): void => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return (): void => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};

export { useMousePosition };
