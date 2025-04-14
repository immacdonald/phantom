import type { CommonComponentProps } from '@types';
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface UnstyledButtonProps extends CommonComponentProps<HTMLButtonElement> {
    /** The content inside the button, typically an icon or text element. */
    children: ReactNode;
}

/** A button component with no default styles, allowing full customization. */
const UnstyledButton = forwardRef<HTMLButtonElement, UnstyledButtonProps>(({ className, children, ...props }, ref) => {
    const buttonClasses = clsx(styles.clear, className);

    return (
        <button className={buttonClasses} type="button" ref={ref} {...props}>
            {children}
        </button>
    );
}) as ForwardRefExoticComponent<UnstyledButtonProps & RefAttributes<HTMLButtonElement>>;

export { UnstyledButton };
