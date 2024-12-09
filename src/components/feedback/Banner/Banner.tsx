import type { CommonComponentProps } from '@types';
import { FC, forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { popNotification } from './notifications';
import style from './Banner.module.scss';

interface BannerProps extends CommonComponentProps {
    notificationLength?: number;
    concurrentNotificationDelay?: number;
}

const Banner: FC<BannerProps> = forwardRef<HTMLDivElement, BannerProps>(({ notificationLength = 5000, concurrentNotificationDelay = 750, className, ...props }, ref) => {
    const [state, setState] = useState<boolean>(false);
    const [previousState, setPreviousState] = useState<boolean>(false);

    const [type, setType] = useState<'error' | 'success'>('error');
    const [message, setMessage] = useState<string>('');

    const [notificationChange, setNotificationChange] = useState<boolean>(false);

    useEffect(() => {
        // On a notification push set a useEffect trigger
        const handleNotificationPush = (): void => {
            setNotificationChange(true);
        };

        window.addEventListener('notification-change', handleNotificationPush);

        return (): void => {
            window.removeEventListener('notification-change', handleNotificationPush);
        };
    }, []);

    useEffect(() => {
        if (!state) {
            const notification = popNotification();
            const display = !!notification;

            if (display) {
                const sameNotification = message == notification.message && type == notification.type && type == 'error';
                // If there is a previous active notification and it is not the same then add a delay
                const notificationDelay = previousState && !sameNotification ? concurrentNotificationDelay : 0;

                setTimeout(() => {
                    setType(notification.type);
                    setMessage(notification.message);

                    if (!state) {
                        // Check state again after the initial delay
                        setState(true);
                        setPreviousState(true);

                        // Remove the notification after enough time has elapsed
                        setTimeout(() => {
                            setState(false);
                        }, notificationLength);
                    }
                }, notificationDelay);
            } else {
                setState(false);
                setPreviousState(false);
            }
        }
        setNotificationChange(false);
    }, [state, notificationChange]);

    return createPortal(
        <div className={clsx(style.banner, className)} data-mode={type} data-state={state ? 'on' : 'off'} ref={ref} {...props}>
            <span className={style.message}>{message}</span>
        </div>,
        document.getElementById('root')!
    );
});

export { Banner };
export type { BannerProps };
