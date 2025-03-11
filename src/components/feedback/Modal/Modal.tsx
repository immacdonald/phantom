import { Callback, CommonComponentProps } from '@types';
import { FC, forwardRef, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Button, Heading, Icon } from '@components';
import { setModal } from './modals';
import style from './Modal.module.scss';

interface ModalProps extends CommonComponentProps<HTMLDivElement> {
    /** An optional icon displayed next to the header. */
    icon?: ReactElement;

    /** The title of the modal. */
    header: string;

    /** The text for the accept button. */
    accept?: string | null;

    /** The text for the reject button. */
    reject?: string | null;

    /** Swaps the colors of the accept and reject buttons. */
    swapColors?: boolean;

    /** Callback function triggered when the accept button is clicked. */
    onAccept?: Callback<void>;

    /** Closes the modal automatically when the accept button is clicked. */
    closeOnAccept?: boolean;

    /** Callback function triggered when the reject button is clicked. */
    onReject?: Callback<void>;

    /** Associates the accept button with a form by its id. */
    form?: string;

    /** The content inside the modal body. */
    children: ReactNode;
}

/** A flexible modal component with an optional header, icon, buttons, and customizable actions. */
const Modal: FC<ModalProps> = forwardRef<HTMLDivElement, ModalProps>(
    ({ icon, header, accept = 'Okay', reject = 'Cancel', swapColors = false, onAccept, closeOnAccept = true, onReject, form, children, className, ...props }, ref) => {
        return (
            <div className={clsx(style.modal, className)} ref={ref} {...props}>
                <div className={style.container}>
                    <div className={style.content}>
                        <div className={style.header}>
                            {icon && <Icon icon={icon} />}
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
                                    onReject?.();
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
                                    onAccept?.();
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
