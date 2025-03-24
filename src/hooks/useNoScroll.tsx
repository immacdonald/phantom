import type { Callback } from '@types';

const useNoScroll = (): Callback<boolean> => {
    return (noscroll: boolean): void => {
        if (noscroll) {
            console.log(document.documentElement.scrollHeight > document.documentElement.clientHeight, window.innerWidth > document.documentElement.clientWidth);
            if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
                if (window.innerWidth > document.documentElement.clientWidth) {
                    // Only add scroll padding when the page is rendered on a platform that has scrollbar space
                    document.documentElement.setAttribute('data-scroll-padding', '');
                }
            }
            document.documentElement.setAttribute('data-noscroll', '');
        } else {
            document.documentElement.removeAttribute('data-noscroll');
            document.documentElement.removeAttribute('data-scroll-padding');
        }
    };
};

export { useNoScroll };
