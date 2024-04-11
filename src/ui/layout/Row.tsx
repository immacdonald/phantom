import React, { ReactNode } from 'react';
import style from './Row.module.scss';
import { ResponsiveType } from '../../types';
import { useResponsiveContext } from '../../contexts';

interface RowProps {
    children?: ReactNode;
    align?: ResponsiveType<'center' | 'left' | 'right'>;
}

const Row: React.FC<RowProps> = ({ children, align = 'center' }) => {    
    const { parse } = useResponsiveContext();

    return (
        <div className={style.row} style={{ justifyContent: parse<'center' | 'left' | 'right'>(align) }}>
            {children}
        </div>
    );
};

export { Row };
