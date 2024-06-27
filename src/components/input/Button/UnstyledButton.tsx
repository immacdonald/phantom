import type { ComponentCSSProps } from '@types';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Button.module.scss';

interface UnstyledButtonProps extends ComponentCSSProps, ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const UnstyledButton: FC<UnstyledButtonProps> = ({ className, cssProperties, children, ...rest }) => {
    const buttonClasses = clsx(style.clear, className);

    return (
        <button className={buttonClasses} style={cssProperties} type="button" {...rest}>
            {children}
        </button>
    );
};

export { UnstyledButton };
