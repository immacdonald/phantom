import { CommonComponentProps } from '@types';
import { FC, forwardRef, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface UnstyledButtonProps extends CommonComponentProps<HTMLButtonElement> {
    children: ReactElement;
}

const UnstyledButton: FC<UnstyledButtonProps> = forwardRef<HTMLButtonElement, UnstyledButtonProps>(({ className, children, ...props }, ref) => {
    const buttonClasses = clsx(styles.clear, className);

    return (
        <button className={buttonClasses} ref={ref} {...props}>
            {children}
        </button>
    );
});

export { UnstyledButton };
