import React, { ReactNode } from 'react';
import style from './Test.module.scss';

interface TestProps {
    children?: ReactNode;
}

const Test: React.FC<TestProps> = ({ children }) => {
    return (
        <div className={style.testStyle}>
            {children}
        </div>
    );
};

export { Test }