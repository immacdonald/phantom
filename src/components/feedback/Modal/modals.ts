let current: JSX.Element | null = null;

const setModal = (modal: JSX.Element | null): void => {
    current = modal;
    window.dispatchEvent(new CustomEvent('modal-change'));
};

const getModal = (): JSX.Element | null => {
    return current;
};

export { getModal, setModal };
