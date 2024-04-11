import React, { ReactNode } from 'react';
import { setModal } from './modals';
import { Icon } from '../Icon';
import { Button } from '../';
import style from './Modal.module.scss';

interface ModalProps {
    icon?: ReactNode;
    header: string;
    accept?: string | null;
    reject?: string | null;
    swapColors?: boolean;
    onAccept?: () => void;
    closeOnAccept?: boolean;
    onReject?: () => void;
    form?: string;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    icon = null,
    header,
    accept = 'Okay',
    reject = 'Cancel',
    swapColors = false,
    onAccept = () => {},
    closeOnAccept = true,
    onReject = () => {},
    form = undefined,
    children
}) => {
    return (
        <div className={style.modal}>
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.header}>
                        {icon ? <Icon icon={icon} /> : false}
                        <h3>{header}</h3>
                    </div>
                    <div className={style.message}>{children}</div>
                </div>
                <div className={style.buttonGroup}>
                    {reject && (
                        <Button
                            label={reject}
                            visual="outline"
                            mode={swapColors ? undefined : 'error'}
                            onClick={() => {
                                onReject();
                                setModal(null);
                            }}
                        />
                    )}
                    {accept && (
                        <Button
                            label={accept}
                            visual="filled"
                            mode={swapColors ? 'error' : undefined}
                            full={!reject}
                            type="submit"
                            form={form}
                            onClick={() => {
                                onAccept();
                                if (closeOnAccept) {
                                    setModal(null);
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export { Modal };
