import type { CommonComponentProps } from '@types';
import type { FC } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Switch.module.scss';

interface SwitchProps extends CommonComponentProps<HTMLInputElement> {}

/** A toggle switch component that acts as a styled checkbox. */
const Switch: FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>(({ className, style, ...props }, ref) => {
    return (
        <div className={clsx(styles.switch, className)} style={style}>
            <input type="checkbox" data-switch ref={ref} role="switch" {...props} />
            <span />
        </div>
    );
});

export { Switch };
