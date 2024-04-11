let current: JSX.Element | null = null;

export const setModal = (modal: JSX.Element | null): void => {
    current = modal;
    window.dispatchEvent(new CustomEvent('modal-change'));
};

export const getModal = (): JSX.Element | null => {
    return current;
};
