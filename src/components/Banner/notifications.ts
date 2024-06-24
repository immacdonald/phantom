export interface Notification {
    type: 'success' | 'error';
    name?: string;
    message: string;
    data?: string;
}

const notifications: Notification[] = [];

// Push success notifications
const pushSuccess = (message: string, name?: string, data?: string): void => {
    pushNotification({ type: 'success', name, message, data });
};

// Push error notifications
const pushError = (message: string, name?: string, data?: string): void => {
    pushNotification({ type: 'error', name, message, data });
};

// Internal function for pushing full Notification objects
const pushNotification = (notification: Notification): void => {
    window.dispatchEvent(new CustomEvent('notification-change'));
    notifications.push(notification);
};

const popNotification = (): Notification | null => {
    return notifications.pop() || null;
};

export { popNotification, pushError, pushSuccess }
