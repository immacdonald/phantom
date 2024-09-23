import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface UnstyledButtonProps extends ComponentPropsWithoutRef<'button'> {}

const UnstyledButton: FC<UnstyledButtonProps> = ({ className, children, ...rest }) => {
    const buttonClasses = clsx(styles.clear, className);

    return (
        <button className={buttonClasses} type="button" {...rest}>
            {children}
        </button>
    );
};

export { UnstyledButton };
