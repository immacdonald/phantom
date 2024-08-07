import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Split.module.scss';

interface SplitProps {
    main: 'left' | 'right';
    verticalCenter?: boolean;
    children: ReactNode[];
}

const Split: FC<SplitProps> = ({ main, verticalCenter = false, children }) => {
    if (children.length != 2) {
        console.warn('Cannot render Split component with more or less than 2 children');
        return false;
    }

    const className = clsx(style.split, {
        [style.left]: main == 'left',
        [style.right]: main == 'right',
        [style.verticalCenter]: verticalCenter
    });

    return <div className={className}>{children}</div>;
};

export { Split };
