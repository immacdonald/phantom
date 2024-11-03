import { CommonComponentProps } from '@types';
import { FC, forwardRef, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Button, Heading, Icon } from '@components';
import { setModal } from './modals';
import style from './Modal.module.scss';

interface ModalProps extends CommonComponentProps<HTMLDivElement> {
    icon?: ReactElement;
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

const Modal: FC<ModalProps> = forwardRef<HTMLDivElement, ModalProps>(
    (
        {
            icon = null,
            header,
            accept = 'Okay',
            reject = 'Cancel',
            swapColors = false,
            onAccept = (): void => {},
            closeOnAccept = true,
            onReject = (): void => {},
            form,
            children,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div className={clsx(style.modal, className)} ref={ref} {...props}>
                <div className={style.container}>
                    <div className={style.content}>
                        <div className={style.header}>
                            {icon ? <Icon icon={icon} /> : false}
                            <Heading>{header}</Heading>
                        </div>
                        <div className={style.message}>{children}</div>
                    </div>
                    <div className={style.buttonGroup}>
                        {reject && (
                            <Button
                                variant="outline"
                                context={swapColors ? undefined : 'critical'}
                                onClick={() => {
                                    onReject();
                                    setModal(null);
                                }}
                            >
                                {reject}
                            </Button>
                        )}
                        {accept && (
                            <Button
                                type="primary"
                                context={swapColors ? 'critical' : undefined}
                                full={!reject}
                                htmlType="submit"
                                form={form}
                                onClick={() => {
                                    onAccept();
                                    if (closeOnAccept) {
                                        setModal(null);
                                    }
                                }}
                            >
                                {accept}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export { Modal };
