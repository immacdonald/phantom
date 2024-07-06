import type { ComponentCSSProps, FlexAlign, ResponsiveType } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { useResponsiveContext } from '@contexts';
import style from './Row.module.scss';

interface RowProps extends ComponentCSSProps {
    children?: ReactNode;
    align?: ResponsiveType<FlexAlign>;
    verticalAlign?: ResponsiveType<FlexAlign>;
    gap?: ResponsiveType<CSSProperties['gap']>;
    relative?: boolean;
}

const Row: FC<RowProps> = ({ children, align, verticalAlign, gap, relative = false, className, cssProperties }) => {
    const { parse } = useResponsiveContext();

    const rowClasses = clsx(style.row, className);

    return (
        <div
            className={rowClasses}
            style={{
                justifyContent: parse<FlexAlign>(align),
                alignItems: parse<FlexAlign>(verticalAlign),
                gap: parse<CSSProperties['gap']>(gap),
                position: relative ? 'relative' : undefined,
                ...cssProperties
            }}
        >
            {children}
        </div>
    );
};

export { Row };
