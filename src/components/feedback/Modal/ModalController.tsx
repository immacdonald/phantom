import type { CommonComponentProps } from '@types';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useNoScroll } from '@hooks';
import { getModal } from './modals';
import style from './ModalController.module.scss';

interface ModalControllerProps extends CommonComponentProps {}

/** A global modal controller that listens for modal state changes and renders active modals in a portal. */
const ModalController: FC<ModalControllerProps> = ({ className, ...props }) => {
    const [modal, setModal] = useState<JSX.Element | null>(null);
    const setNoScroll = useNoScroll();

    useEffect(() => {
        // Handles modal state changes and updates the modal component
        const handleModalChange = (): void => {
            setModal(getModal());
        };

        window.addEventListener('modal-change', handleModalChange);

        return (): void => {
            window.removeEventListener('modal-change', handleModalChange);
        };
    }, []);

    useEffect(() => {
        setNoScroll(!!modal);
    }, [modal]);

    const controllerClasses = clsx(
        style.modals,
        {
            [style.active]: !!modal
        },
        className
    );

    return createPortal(
        <div
            className={controllerClasses}
            onScroll={(event) => {
                event.preventDefault();
            }}
            {...props}
        >
            {modal}
        </div>,
        document.getElementById('root')!
    );
};

export { ModalController };
