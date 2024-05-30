import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import style from './ModalController.module.scss';
import { getModal } from './modals';

const ModalController: React.FC = () => {
    const [modal, setModal] = useState<JSX.Element | null>(null);

    useEffect(() => {
        // On a modal change set a useEffect trigger
        const handleModalChange = () => {
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
