import React, { ReactNode } from 'react';
import style from './Column.module.scss';

interface ColumnProps {
    children?: ReactNode;
}

const Column: React.FC<ColumnProps> = ({ children }) => {
    return <div className={style.column}>{children}</div>;
};

export { Column };
