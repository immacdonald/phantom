import React from 'react';
import style from './Button.module.scss';

type ClearButtonProps = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ClearButton: React.FC<ClearButtonProps> = ({ children, ...rest }) => {
    return (
        <button className={style.clear} type="button" {...rest}>
            {children}
        </button>
    );
};

export { ClearButton };
