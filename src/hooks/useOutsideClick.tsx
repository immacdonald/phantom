import type { Callback } from '@types';
import { RefObject, useEffect } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: Callback<void>) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            let targetElement = event.target as HTMLElement;

            // Traverse up the DOM tree
            while (targetElement) {
                if (targetElement.getAttribute('data-portal-visible') === 'true') {
                    // Found a portal element that can be assumed to be the component
                    return;
                }
                // Move up to the next parent element
                targetElement = targetElement.parentElement as HTMLElement;
            }

            // No portal element found, handle as outside click
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        const handleEscapeKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKeyDown, false);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKeyDown, false);
        };
    });
};

export { useOutsideClick };
