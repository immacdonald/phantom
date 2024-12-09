import { CommonComponentProps } from '@types';
import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { getModal } from './modals';
import style from './ModalController.module.scss';

const ModalController: FC<CommonComponentProps> = ({ className, ...props }) => {
    const [modal, setModal] = useState<JSX.Element | null>(null);

    useEffect(() => {
        // On a modal change set a useEffect trigger
        const handleModalChange = (): void => {
            setModal(getModal());
        };

        window.addEventListener('modal-change', handleModalChange);

        return (): void => {
            window.removeEventListener('modal-change', handleModalChange);
        };
    }, []);

    useEffect(() => {
        if (modal) {
            document.documentElement.setAttribute('data-noscroll', '');
        } else {
            document.documentElement.removeAttribute('data-noscroll');
        }
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
