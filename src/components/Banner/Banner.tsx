import { FC, useEffect, useState } from 'react';
import { popNotification } from './notifications';
import style from './Banner.module.scss';

interface BannerProps {
    notificationLength?: number;
    concurrentNotificationDelay?: number;
}

const Banner: FC<BannerProps> = ({ notificationLength = 5000, concurrentNotificationDelay = 750 }) => {
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

        return () => {
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

    return (
        <div className={style.banner} data-mode={type} data-state={state ? 'on' : 'off'}>
            <span className={style.message}>{message}</span>
        </div>
    );
};

export { Banner };
