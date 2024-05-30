import React from 'react';
import style from './Button.module.scss';

type UnstyledButtonProps = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const UnstyledButton: React.FC<UnstyledButtonProps> = ({ children, ...rest }) => {
    return (
        <button className={style.clear} type="button" {...rest}>
            {children}
        </button>
    );
};

export { UnstyledButton };
