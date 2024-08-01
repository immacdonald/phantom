import type { ComponentProps } from '@types';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Button.module.scss';

interface UnstyledButtonProps extends ComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const UnstyledButton: FC<UnstyledButtonProps> = ({ className, cssProperties, children, id, ...rest }) => {
    const buttonClasses = clsx(style.clear, className);

    return (
        <button className={buttonClasses} style={cssProperties} type="button" id={id} {...rest}>
            {children}
        </button>
    );
};

export { UnstyledButton };
