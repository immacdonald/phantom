import { FC, ReactNode } from 'react';
import { Button, Icon } from '@components';
import { setModal } from './modals';
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

const Modal: FC<ModalProps> = ({
    icon = null,
    header,
    accept = 'Okay',
    reject = 'Cancel',
    swapColors = false,
    onAccept = (): void => {},
    closeOnAccept = true,
    onReject = (): void => {},
    form,
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
                            context={swapColors ? undefined : 'critical'}
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
                            context={swapColors ? 'critical' : undefined}
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
