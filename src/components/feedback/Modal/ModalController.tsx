import { CommonComponentProps } from '@types';
import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useStyleContext } from '@contexts';
import { getModal } from './modals';
import style from './ModalController.module.scss';

const ModalController: FC<CommonComponentProps> = ({ className, ...rest }) => {
    const { config } = useStyleContext();
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

    useEffect(() => {
        if(modal) {
            document.documentElement.setAttribute('data-noscroll', '');
        } else {
            document.documentElement.removeAttribute('data-noscroll');
        }
    }, [modal])

    const controllerClasses = clsx(
        style.modals,
        {
            [style.active]: !!modal
        },
        config?.modal?.controller?.defaultClassName,
        className
    );

    return (
        <div className={controllerClasses} onScroll={(event) => {event.preventDefault()}} {...rest}>
            {modal}
        </div>
    );
};

export { ModalController };
