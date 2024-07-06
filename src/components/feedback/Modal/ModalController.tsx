import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { getModal } from './modals';
import style from './ModalController.module.scss';

const ModalController: FC = () => {
    const [modal, setModal] = useState<JSX.Element | null>(null);

    useEffect(() => {
        // On a modal change set a useEffect trigger
        const handleModalChange = (): void => {
            setModal(getModal());
        };

        window.addEventListener('modal-change', handleModalChange);

        return () => {
            window.removeEventListener('modal-change', handleModalChange);
        };
    }, []);

    const controllerClasses = clsx(style.modals, {
        [style.active]: !!modal
    });

    return <div className={controllerClasses}>{modal}</div>;
};

export { ModalController };
