import { Callback } from '@types';

const useNoScroll = (): Callback<boolean> => {
    const setScroll = (noscroll: boolean): void => {
        if (noscroll) {
            document.documentElement.setAttribute('data-noscroll', '');
        } else {
            document.documentElement.removeAttribute('data-noscroll');
        }
    };
    return setScroll;
};

export { useNoScroll };
